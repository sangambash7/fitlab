import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-01-27.acacia",
});

export async function POST(req: Request) {
  try {
    console.log("function run");
    const { productID, priceID, quantity } = await req.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      //   customer: customerID,
      //   subscription_data: {
      //     metadata: { customerID },
      //   },
      line_items: [{ price: priceID, quantity: quantity }],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/shop/${productID}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/shop/${productID}`,
    });

    console.log("sesseion", session);

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message });
  }
}
