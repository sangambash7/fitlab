import Link from "next/link";

import { createClient } from "@/utils/supabase/server";
import { getSubscription } from "@/actions/stripeActions";
import CancelSubscription from "@/app/components/profile/CancelSubscription";

async function FitlabPass() {
  const supabase = await createClient();

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("stripe_subscriptionID");
  const stripeSubscriptionID = profile[0]?.stripe_subscriptionID;

  const subscription =
    profile?.length > 0 ? await getSubscription(stripeSubscriptionID) : null;

  const priceID = subscription?.items?.data[0].price.id;
  const subscriptionItems = subscription?.items?.data[0];

  const subEndTime = new Date(
    subscription?.current_period_end * 1000
  ).toLocaleString();

  console.log(subscription);
  console.log(subscriptionItems);

  return (
    <div className="w-full lg:w-[500px]">
      <h1 className="text-3xl">FitLab Pass</h1>

      {subscriptionItems?.plan?.active ? (
        <div className="w-full">
          <hr></hr>
          <div className="flex w-full justify-between my-4">
            <h1 className="font-semibold">Membership</h1>
            {subscription?.status === "active" && (
              <div className="text-green-500">✅ Active</div>
            )}
            {subscription?.status === "canceled" && (
              <div className="text-yellow-500">Cancelled</div>
            )}
          </div>
          <hr></hr>
          <div className="flex w-full justify-between my-4">
            <h1 className="font-semibold">Billing frequency</h1>
            <div>
              {subscriptionItems?.plan.interval_count}{" "}
              {subscriptionItems?.plan.interval}
            </div>
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
          {subscription?.status === "active" && (
            <div className="flex w-full justify-between my-4">
              <h1 className="font-semibold">Next bill date</h1>
              <div className="flex flex-col items-end">
                <div>{subEndTime}</div>
                <div>
                  <div className="text-red-700">
                    <CancelSubscription />
                  </div>
                </div>
              </div>
            </div>
          )}
          {subscription?.status === "canceled" && (
            <div className="flex w-full justify-between my-4">
              <h1 className="font-semibold">Package ends</h1>
              <div className="flex flex-col items-end">
                <div>{subEndTime}</div>
              </div>
            </div>
          )}
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
