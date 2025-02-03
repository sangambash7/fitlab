import Image from "next/image";
import { createClient } from "@/utils/supabase/server";
import { getSubscription } from "@/actions/stripeActions";

async function Profile() {
  const monthPriceID = "price_1QnoSKI0TWu0X0NTWMp1ROWP";
  const yearPriceID = "price_1QnoT9I0TWu0X0NTE08Ldx2R";

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
  console.log(user);

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
            <li className=" transition-padding-all duration-300 hover:ps-1 hover:underline">
              <button className="italic font-bold text-lg">My Dashboard</button>
            </li>
            <li className="transition-padding-all duration-300 hover:ps-1 hover:underline">
              <button>Orders</button>
            </li>
            <li className="transition-padding-all duration-300 hover:ps-1 hover:underline">
              <button>Subscription</button>
            </li>
          </ul>
        </div>
        <div className="flex flex-col shadow-md p-4 w-full">
          <h1 className="text-3xl">Personal information</h1>

          <form className="pt-4 w-[50%]">
            <div className="flex flex-col gap-2">
              <label htmlFor="email">Full name:</label>
              <input
                className="bg-slate-50 border"
                id="fullname"
                name="fullname"
                type="fullname"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email">Email:</label>
              <input
                className="bg-slate-50 border"
                id="email"
                name="email"
                type="email"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password">Password:</label>
              <input
                className="bg-slate-50 border"
                id="password"
                name="password"
                type="password"
                required
              />
            </div>

            <button
              className="border bg-[#1B4A8E] text-white text-lg px-2 rounded-sm mt-5"
              // formAction={}
            >
              Save
            </button>
          </form>
        </div>
      </div>
      {/* {subscription?.status === "active"
          ? "gagimarjos gmertma"
          : "ver ivarjisheb"}

        {priceID === monthPriceID && "1 თვე იგულავე"}
        {priceID === yearPriceID && "1 წელი იგულავე"} */}
    </main>
  );
}

export default Profile;
