"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

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
    return { error: error?.code };
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    personalID: formData.get("personal_id") as string,
    options: {
      data: {
        full_name: formData.get("fullname") as string,
      },
    },
  };

  const { data: userData, error } = await supabase.auth.signUp(data);

  if (error || !userData.user) {
    // redirect("/error");

    return { error: error?.code };
  }

  await supabase
    .from("profiles")
    .insert([{ user_id: userData.user.id, personal_id: data.personalID }]);

  revalidatePath("/", "layout");
  redirect("/");
}
