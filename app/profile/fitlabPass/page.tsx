import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { getSubscription, cancelSubscription } from "@/actions/stripeActions";

async function FitlabPass() {
  const monthPriceID = "price_1QnoSKI0TWu0X0NTWMp1ROWP";
  const yearPriceID = "price_1QnoT9I0TWu0X0NTE08Ldx2R";
  const supabase = await createClient();

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("stripe_subscriptionID");
  const stripeSubscriptionID = profile[0]?.stripe_subscriptionID;

  const subscription =
    profile?.length > 0 ? await getSubscription(stripeSubscriptionID) : null;

  const priceID = subscription?.items?.data[0].price.id;
  const subscriptionItems = subscription?.items?.data[0];
  console.log(subscriptionItems);

  return (
    <div className="w-full lg:w-[500px]">
      <h1 className="text-3xl">FitLab Pass</h1>

      {subscription?.status === "active" ? (
        <div className="w-full">
          <hr></hr>
          <div className="flex w-full justify-between my-4">
            <h1 className="font-semibold">Membership</h1>
            <div className="text-green-500">✅ Active</div>
          </div>
          <hr></hr>
          <div className="flex w-full justify-between my-4">
            <h1 className="font-semibold">Price</h1>
            <div>
              {subscriptionItems?.plan.amount / 100}{" "}
              {subscriptionItems?.plan.currency.toUpperCase()}
            </div>
          </div>
          <hr></hr>
          <div className="flex w-full justify-between my-4">
            <h1 className="font-semibold">Billing frequency</h1>
            <div className="flex flex-col items-end">
              <div>
                {subscriptionItems?.plan.interval_count}{" "}
                {subscriptionItems?.plan.interval}
              </div>
              <div>
                <button className="text-red-700">Cancel membership</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full">
          <hr></hr>
          <div className="flex w-full justify-between my-4">
            <h1 className="font-semibold">Membership</h1>
            <div className="text-red-500">❌ Not active</div>
          </div>
          <hr></hr>
          <div className="flex w-full justify-between my-4">
            <h1 className="font-semibold">Price</h1>
            <div className="text-[#1B4A8E] text-lg font-semibold">
              <Link href={"/pricing"}>See our pricelist</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FitlabPass;
