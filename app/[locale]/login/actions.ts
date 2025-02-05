"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import {
  createCustomerStripe,
  createSubscription,
} from "@/actions/stripeActions";

export async function login(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    options: {
      data: {
        full_name: formData.get("fullname") as string,
      },
    },
  };

  const { data: user, error } = await supabase.auth.signUp(data);

  if (error) {
    redirect("/error");
  }

  // არეგისტრირებს კლიენტად Stripe-ზე, წარმატებული პასუხის შემთხვევაშო stripe-ის Customer ID ემატება სუპაბეიზის იუზერის მეტადატაში.
  const stripeResponse = await createCustomerStripe(
    user.user?.user_metadata?.full_name,
    user.user?.user_metadata?.email
  ).then(async (customer) => {
    return await supabase.auth.updateUser({
      data: { stripeCustomerID: customer.id },
    });
  });

  revalidatePath("/", "layout");
  redirect("/");
}

export async function handleSignInWithGoogle(response) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithIdToken({
    provider: "google",
    token: response.credential,
  });
}
