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
    <div className="flex flex-col items-center sm:items-start">
      <h1 className="text-3xl">Personal information</h1>
      <form className="pt-4 w-[80%] md:w-[60%] lg:w-[50%]">
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
  );
}

export default Profile;
