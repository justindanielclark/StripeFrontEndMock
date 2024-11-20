// https://www.youtube.com/watch?v=Mbl-2bcr7kU

import Fastify, {
  FastifyRequest,
  FastifyReply,
  RouteGenericInterface,
} from "fastify";
import Stripe from "stripe";

type TFastifyRouteFunction<TRouteParams extends RouteGenericInterface> = (
  request: FastifyRequest<TRouteParams>,
  reply: FastifyReply
) => Promise<void>;

const stripe = new Stripe("", {
  typescript: true,
});

const app = Fastify({ logger: true });

const postPaymentIntent: TFastifyRouteFunction<{
  Body: { amount: number; currency: string };
}> = async (req, res) => {
  const { amount, currency } = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency,
    automatic_payment_methods: {
      enabled: true,
    },
  });
  res.status(200).send({ id: paymentIntent.client_secret });
};

app.get("/", async (req, res) => {
  res.status(200).send({ dicks: "lol" });
});
app.post("/paymentintent", postPaymentIntent);
app.post("/setupcustomer", async (req, res) => {});
app.post("/setupintent", async (req, res) => {});

const start = async () => {
  try {
    await app.listen({ port: 3000 });
  } catch (error) {
    app.log.error(error);
  }
};

start();
