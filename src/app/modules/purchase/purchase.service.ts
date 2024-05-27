import config from "../../config";

const stripe = require("stripe")(config.stripe_secret_key);

const makePaymentAndAddCoinToProfile = async (prod: any) => {
  console.log({ prod });
  const product = await stripe.products.create({
    name: prod.name,
  });

  let price;

  if (product) {
    price = await stripe.prices.create({
      product: `${product.id}`,
      unit_amount: prod?.price * 100,
      currency: "usd",
    });
  }
  if (price.id) {
    let session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: `${price.id}`,
          quantity: prod?.quantity,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:5173/payment-success",
      cancel_url: "http://localhost:5173/payment-failed",
      customer_email: prod?.customerEmail,
    });
    console.log({ session });

    return session;
  }
};

export const purchaseServices = {
  makePaymentAndAddCoinToProfile,
};
