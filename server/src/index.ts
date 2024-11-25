// https://www.youtube.com/watch?v=Mbl-2bcr7kU
import Fastify from "fastify";
import cors from "@fastify/cors";
import getProducts from "./routes/getproducts";
import setuppaymentintent from "./routes/setuppaymentintent";
import devDeleteActiveStripeIntents from "./routes/deleteActiveSetupIntents";

const app = Fastify({ logger: true });
app.register(cors, {
  origin: ["*"],
});

app.get("/", async (req, res) => {
  res.status(200).send();
});
app.get("/dev/deleteactivestripeintents", devDeleteActiveStripeIntents);
app.get("/products", getProducts);
app.post("/setuppaymentintent", setuppaymentintent);

const start = async () => {
  try {
    await app.listen({ port: 3000 });
  } catch (error) {
    app.log.error(error);
  }
};

start();

// let customerId = "";
// const [product, price, customer] = await Promise.all([
//   stripeClient.products.retrieve(productId).catch((err) => {
//     if (err.code === "resource_missing") {
//       return null;
//     }
//     throw err;
//   }),
//   stripeClient.prices.retrieve(priceId).catch((err) => {
//     if (err.code === "resource_missing") {
//       return null;
//     }
//     throw err;
//   }),
//   stripeClient.customers
//     .search({ query: `email:\'${email}\'` })
//     .then((customers) => {
//       const c = customers.data.find((customer) => customer.email === email);
//       if (c) {
//         return c;
//       }
//       return null;
//     })
//     .catch(() => {
//       return null;
//     }),
// ]);

// if (price === null || price.unit_amount === null) {
//   return res.status(500).send({ message: "No Such Price" });
// }
// if (product === null) {
//   return res.status(500).send({ message: "No Such Product" });
// }
// if (customer === null) {
//   const result = await stripeClient.customers.create({
//     email,
//     metadata: { email, password },
//   });
//   customerId = result.id;
// } else {
//   customerId = customer.id;
// }

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
