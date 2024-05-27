import config from "../../config";
import generateUniqueId from "generate-unique-id";

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

  const transactionId = generateUniqueId({
    length: 32,
    useLetters: true,
  });
  if (price.id) {
    let session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: `${price.id}`,
          quantity: prod?.quantity,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:5173/payment-success?transactionId=${transactionId}&user=${prod?.customerEmail}&quantity=${prod?.quantity}`,
      cancel_url: "http://localhost:5173/payment-failed",
      customer_email: prod?.customerEmail,
    });

    return session;
  }
};

export const purchaseServices = {
  makePaymentAndAddCoinToProfile,
};
