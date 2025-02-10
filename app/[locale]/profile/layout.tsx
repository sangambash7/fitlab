import Image from "next/image";
import ProfileNavlink from "../components/profile/ProfileNavlink";
import Logout from "../components/Logout";
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

  const profileData = profile ?? [];

  const subscription =
    profileData.length > 0
      ? await getSubscription(profileData[0].stripe_subscriptionID)
      : null;

  return (
    <main className="flex justify-center">
      <div className="w-[1200px] flex flex-col sm:flex-row justify-center mt-0 sm:mt-8 gap-10">
        <div className="w-full flex flex-col sm:flex-row gap-9">
          <div className="md:w-[300px] flex flex-col dark:bg-slate-900 hover:bg-slate-50 py-4 px-8 rounded-md shadow-md">
            <div className="mb-4">
              <div className="flex flex-col justify-center items-center gap-8 sm:gap-0">
                <div>
                  <div className="text-xl">{user.user_metadata.full_name}</div>
                  <div className="text-sm">{user.user_metadata.email}</div>
                </div>
                {subscription?.status === "active" ? (
                  <div className="flex flex-col items-center my-2">
                    <Image
                      src="/QR_Code.png"
                      width={100}
                      height={100}
                      alt="Logo"
                    />
                    <div className="text-sm flex flex-col items-start">
                      FitLab Pass
                    </div>
                  </div>
                ) : (
                  ""
                )}
                <div className="border border-gray-100 w-full"></div>
              </div>
            </div>
            <ul className="flex flex-col items-center sm:items-start">
              <ProfileNavlink dest="/profile" label="My Dashboard" />
              {/* <ProfileNavlink dest="/profile/orders" label="Order History" /> */}
              <ProfileNavlink dest="/profile/fitlabPass" label="FitLab Pass" />
              <li className="transition-padding-all duration-300 hover:ps-4 hover:underline">
                <div>
                  <Logout />
                </div>
              </li>
            </ul>
          </div>
          <div className="flex flex-col shadow-md p-4 w-full dark:bg-slate-900">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}

export default layout;
