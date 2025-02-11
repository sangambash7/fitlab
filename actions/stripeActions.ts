"use server";

import Stripe from "stripe";
import { createClient } from "@/utils/supabase/server";

export async function createCustomerStripe(fullname: string, email: string) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2025-01-27.acacia",
  });

  const customer = await stripe.customers.create({
    name: fullname,
    email: email,
  });

  if (customer) return customer;
}

export async function createSubscription(customerID: string, priceID: string) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2025-01-27.acacia",
  });

  try {
    const subscription = await stripe.subscriptions.create({
      customer: customerID,
      items: [
        {
          price: priceID,
        },
      ],
      payment_behavior: "default_incomplete",
      payment_settings: { save_default_payment_method: "on_subscription" },
      expand: ["latest_invoice.payment_intent"],
    });

    console.log("subscription from stripe ections: ", subscription);
  } catch (error) {
    console.error(error);
  }
}

export async function getBySessionID(sessionID: string) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2025-01-27.acacia",
  });

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionID);

    return session;
  } catch (error) {
    console.error(error);
  }
}

export async function getSubscription(subscriptionID: string) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2025-01-27.acacia",
  });

  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionID);

    return subscription;
  } catch (error) {
    console.error(error);
  }
}

export async function cancelSubscriptionByID() {
  const supabase = await createClient();
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2025-01-27.acacia",
  });

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("stripe_subscriptionID");

  if (error) {
    console.error("Error fetching profile:", error);
    throw new Error("Failed to fetch profile.");
  }

  const stripeSubscriptionID = profile[0]?.stripe_subscriptionID;

  try {
    const subscription = await stripe.subscriptions.cancel(
      stripeSubscriptionID
    );

    if (subscription && subscription.id) {
      window.location.reload();
    }

    return subscription.id;
  } catch (error) {
    console.error(error);
  }
}

export async function AddProductToStripe(title: string) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2025-01-27.acacia",
  });

  try {
    const createProduct = await stripe.products.create({
      name: title,
    });

    return {
      productID: createProduct.id,
      name: createProduct.name,
    };
  } catch (error) {
    console.error("Error from Stripe: ", error);
  }
}

export async function AddPrPriceToStripe(productID: string, price: number) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2025-01-27.acacia",
  });

  try {
    const createPrice = await stripe.prices.create({
      unit_amount: price,
      currency: "gel",
      product: productID,
    });

    return {
      unit_amount: createPrice.unit_amount,
      currency: createPrice.currency,
      productID: createPrice.product,
      priceID: createPrice.id,
    };
  } catch (error) {
    console.error("Error from Stripe (setting price): ", error);
  }
}
