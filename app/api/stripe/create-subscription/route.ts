import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-01-27.acacia",
});

export async function POST(req: Request) {
  try {
    console.log("function run");
    const { priceID, customerID } = await req.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      customer: customerID,
      subscription_data: {
        metadata: { customerID },
      },
      line_items: [{ price: priceID, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/pricing`,
    });

    console.log("sesseion", session);

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message });
  }
}
