import Image from "next/image";
import ProfileNavlink from "../components/profile/ProfileNavlink";

import { createClient } from "@/utils/supabase/server";
import { getSubscription } from "@/actions/stripeActions";

async function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    console.log("Cant retrieve user: ", authError);
    return null;
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("stripe_subscriptionID");

  if (error) {
    console.log("Error retrieving subscriptionID from database: ", error);
  }

  const subscription =
    profile?.length > 0
      ? await getSubscription(profile[0].stripe_subscriptionID)
      : null;

  const priceID = subscription?.items?.data[0].price.id;

  return (
    <main className="flex justify-center">
      <div className="w-[1200px] flex justify-center mt-8 gap-10">
        <div className="flex flex-col hover:bg-slate-50 py-4 px-8 rounded-md shadow-md">
          <div className="mb-4">
            <div className="text-xl">{user.user_metadata.full_name}</div>
            <div className="text-sm">{user.user_metadata.email}</div>
            {subscription?.status === "active" ? (
              <div className="flex flex-col items-center my-2">
                <Image src="/QR_Code.png" width={100} height={100} alt="Logo" />
                <div className="text-sm flex flex-col items-start">
                  FitLab Pass
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          <ul className="flex flex-col">
            <ProfileNavlink dest="/profile" label="My Dashboard" />
            <ProfileNavlink dest="/profile/orders" label="Order History" />
            <ProfileNavlink dest="/profile/fitlabPass" label="FitLab Pass" />
            <li className="transition-padding-all duration-300 hover:ps-4 hover:underline">
              <button>Log Out</button>
            </li>
          </ul>
        </div>
        <div className="flex flex-col shadow-md p-4 w-full">{children}</div>
      </div>
    </main>
  );
}

export default layout;
