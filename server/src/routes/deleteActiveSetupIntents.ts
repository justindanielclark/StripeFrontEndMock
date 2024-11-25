import * as dotenv from "dotenv";
dotenv.config();
import Stripe from "stripe";
import { TFastifyRouteFunction } from "../../types/TFastifyRouteFunction";

const stripeClient = new Stripe(process.env.STRIPE_SK as string, {
  typescript: true,
});

const devDeleteActiveStripeIntents: TFastifyRouteFunction<{}> = async (
  req,
  res
) => {
  const allIntents: Array<Stripe.SetupIntent> = [];
  let hasMore = true;
  let startingAfter: undefined | string = undefined;
  do {
    const response: any = await stripeClient.setupIntents.list({
      limit: 100,
      starting_after: startingAfter,
    });
    allIntents.push(...response.data);

    if (response.has_more) {
      startingAfter = response.data[response.data.length - 1].id;
    } else {
      hasMore = false;
    }
  } while (hasMore);

  const filtered = allIntents.filter(
    (intent) => intent.status !== "canceled" && intent.status !== "succeeded"
  );

  await Promise.all(
    filtered.map(async (item) => {
      console.log(`Canceling ${item.id}`);
      await stripeClient.setupIntents.cancel(item.id);
    })
  );

  res.status(200).send();
};

export default devDeleteActiveStripeIntents;
