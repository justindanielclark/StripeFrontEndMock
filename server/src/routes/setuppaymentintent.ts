import * as dotenv from "dotenv";
dotenv.config();
import Stripe from "stripe";
import { TFastifyRouteFunction } from "../../types/TFastifyRouteFunction";
import EncoderDecoder from "../../utils/EncoderDecoder";

const stripeClient = new Stripe(process.env.STRIPE_SK as string, {
  typescript: true,
});

const setuppaymentintent: TFastifyRouteFunction<{
  Body: {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    priceId: string;
    productId: string;
  };
}> = async (req, res) => {
  const {
    email,
    password,
    confirmPassword,
    firstName,
    lastName,
    priceId,
    productId,
  } = req.body;

  const encrypted = EncoderDecoder.encode({
    email,
    password,
    confirmPassword,
    firstName,
    lastName,
    productId,
    priceId,
  });

  const setupIntent = await stripeClient.setupIntents.create({
    usage: "off_session",
    payment_method_types: ["card", "us_bank_account"],
    metadata: {
      data: encrypted,
    },
  });

  res.status(200).send({ clientSecret: setupIntent.client_secret });
};

export default setuppaymentintent;
