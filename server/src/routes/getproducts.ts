import * as dotenv from "dotenv";
dotenv.config();
import Stripe from "stripe";
import { TFastifyRouteFunction } from "../../types/TFastifyRouteFunction";

const stripeClient = new Stripe(process.env.STRIPE_SK as string, {
  typescript: true,
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

export default getProducts;
