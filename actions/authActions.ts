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

export async function createSubscriptionSupabase() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .insert([{ stripe_isSubscribed: true }]);

  if (error) {
    console.error("Error applying subscription:", error);
    return null;
  }
}
