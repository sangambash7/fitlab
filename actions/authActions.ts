"use server";

import { createClient } from "@/utils/supabase/server";

export async function getUser() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
}

export async function createSubscriptionSupabase(subscriptionID) {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    console.error("Cant retrieve user:", authError);
    return null;
  }

  const { data, error } = await supabase
    .from("profiles")
    .insert([{ user_id: user.id, stripe_subscriptionID: subscriptionID }]);

  if (error) {
    console.log("Error saving subscriptionID: ", error.message);
    return null;
  }

  return data;
}
