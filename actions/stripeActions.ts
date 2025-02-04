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

export async function createSubscription(customerID, priceID) {
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
  // console.log(
  //   "from actions passed from client component: ",
  //   stripeSubscriptionID
  // );

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("stripe_subscriptionID");
  const stripeSubscriptionID = profile[0]?.stripe_subscriptionID;
  console.log("from stripe actions", stripeSubscriptionID);
  // console.log(profile);

  try {
    const subscription = await stripe.subscriptions.cancel(
      stripeSubscriptionID
    );

    console.log("try block run: ", subscription);

    return subscription;
  } catch (error) {
    console.error(error);
  }
}
