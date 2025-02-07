// import Stripe from "stripe";
// import { NextResponse } from "next/server";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: "2025-01-27.acacia",
// });

// export async function POST(req: Request) {
//   try {
//     const { name, email } = await req.json();

//     const customer = await stripe.customers.create({
//       name,
//       email,
//     });

//     return NextResponse.json({ customer });
//   } catch (error) {
//     console.error("Stripe Customer Error:", error);
//     return NextResponse.json(
//       { error: "Failed to create customer" },
//       { status: 500 }
//     );
//   }
// }

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-01-27.acacia",
});
