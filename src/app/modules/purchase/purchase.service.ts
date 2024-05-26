const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const makePaymentAndAddCoinToProfile = async (prod: any) => {
  const product = await stripe.products.create({
    name: prod.name,
  });

  console.log({ product });
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
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
      customer_email: "demo@gmail.com",
    });
    return session;
  }
};

export const purchaseServices = {
  makePaymentAndAddCoinToProfile,
};
