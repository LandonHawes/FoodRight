const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  // get the price amount, product name, and image link from the request body
  let { price, name: productName, image } = req.body;
  if ((price == undefined) | (price == null)) {
    price = 1499;
  }
  if ((productName == undefined) | (productName == null)) {
    productName = "Foodright Entree";
  }
  if ((image == undefined) | (image == null)) {
    image = "https://i.imgur.com/EHyR2nP.png";
  }

  if (req.method === "POST") {
    try {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        shipping_options: [
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: {
                amount: 0,
                currency: "usd",
              },
              display_name: "Pickup",
              // Delivers between 5-7 business days
            },
          },
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: {
                amount: 0,
                currency: "usd",
              },
              display_name: "Delivery",
              // Delivers in exactly 1 business day
            },
          },
        ],
        line_items: [
          // {
          //   // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          //   price: "price_1LmOcIA40D8tFYmsjPwkO1Be",
          //   quantity: 1,
          // },
          {
            price_data: {
              unit_amount: price,
              currency: "usd",
              product_data: {
                name: productName,
                images: [image],
              },
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      });
      res.status(200).json({ url: session.url });
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
