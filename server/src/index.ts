// https://www.youtube.com/watch?v=Mbl-2bcr7kU
import dotEnv from "dotenv";
import Fastify, {
  FastifyRequest,
  FastifyReply,
  RouteGenericInterface,
} from "fastify";
import cors from "@fastify/cors";
import Stripe from "stripe";

dotEnv.config();

type TFastifyRouteFunction<TRouteParams extends RouteGenericInterface> = (
  request: FastifyRequest<TRouteParams>,
  reply: FastifyReply
) => Promise<void>;

const stripeClient = new Stripe(process.env.STRIPE_SK as string, {
  typescript: true,
});

const app = Fastify({ logger: true });
app.register(cors, {
  origin: ["*"],
});

const getProducts: TFastifyRouteFunction<{}> = async (req, res) => {
  const products = await stripeClient.products.list({ active: true });
  const productMap = new Map<string, Stripe.Product>();
  const productPriceMap = new Map<string, Stripe.Price>();
  products.data.forEach((product) => {
    productMap.set(product.id, product);
  });
  await Promise.all(
    products.data.map(async (product) => {
      const { default_price } = product;
      const price = await stripeClient.prices.retrieve(default_price as string);
      productPriceMap.set(product.id, price);
    })
  );

  const returnable: any[] = [];

  const productEntries = Array.from(productMap.entries());
  for (let i = 0; i < productEntries.length; i++) {
    const productId = productEntries[i][0];
    const product = productEntries[i][1];
    const price = productPriceMap.get(productId);
    if (price) {
      returnable.push({ product, price });
    }
  }
  res.status(200).send(returnable);
};

const setupCustomer: TFastifyRouteFunction<{
  Body: { email: string; password: string; priceId: string; productId: string };
}> = async (req, res) => {
  const { email, password, priceId, productId } = req.body;
  let customerId = "";
  const [product, price, customer] = await Promise.all([
    stripeClient.products.retrieve(productId).catch((err) => {
      if (err.code === "resource_missing") {
        return null;
      }
      throw err;
    }),
    stripeClient.prices.retrieve(priceId).catch((err) => {
      if (err.code === "resource_missing") {
        return null;
      }
      throw err;
    }),
    stripeClient.customers
      .search({ query: `email:\'${email}\'` })
      .then((customers) => {
        const c = customers.data.find((customer) => customer.email === email);
        if (c) {
          return c;
        }
        return null;
      })
      .catch(() => {
        return null;
      }),
  ]);

  if (price === null || price.unit_amount === null) {
    return res.status(500).send({ message: "No Such Price" });
  }
  if (product === null) {
    return res.status(500).send({ message: "No Such Product" });
  }
  if (customer === null) {
    const result = await stripeClient.customers.create({
      email,
      metadata: { email, password },
    });
    customerId = result.id;
  } else {
    customerId = customer.id;
  }

  const setupIntent = await stripeClient.setupIntents.create({
    customer: customerId,
    usage: "off_session",
  });

  // const subscription = await stripeClient.subscriptions.create({
  //   customer: customerId,
  //   items: [
  //     {
  //       price: priceId,
  //     },
  //   ],
  //   payment_behavior: "default_incomplete",
  //   payment_settings: {
  //     save_default_payment_method: "on_subscription",
  //     payment_method_types: ["card"],
  //   },
  //   collection_method: "charge_automatically",
  //   trial_period_days: 15,
  //   currency: "usd",
  // });

  res.status(200).send({
    setupIntent,
  });

  const setup = await stripeClient.setupIntents.create();
  res.status(200).send({ clientSecret: setup.client_secret });
};

app.get("/", async (req, res) => {
  const customer = await stripeClient.customers.search({
    query: `email:\'justindanielclark@gmail.com\'`,
  });
  const customerId = customer.data[0].id;
  const subscriptions = await stripeClient.subscriptions.list({
    customer: customerId,
  });
  res.status(200).send({ subscriptions });
});
app.get("/products", getProducts);
app.post("/setupcustomer", setupCustomer);

const start = async () => {
  try {
    await app.listen({ port: 3000 });
  } catch (error) {
    app.log.error(error);
  }
};

start();
