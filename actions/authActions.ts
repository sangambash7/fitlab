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
