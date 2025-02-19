import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-01-27.acacia",
});

export async function POST(req: Request) {
  try {
    const { productData } = await req.json();

    console.log("productData", productData);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      phone_number_collection: { enabled: true },
      shipping_address_collection: {
        allowed_countries: ["GE"],
      },

      line_items: productData,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/shop/cart?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/shop/cart`,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message });
  }
}
