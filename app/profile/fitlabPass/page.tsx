import { createClient } from "@/utils/supabase/server";
import { getSubscription } from "@/actions/stripeActions";

async function FitlabPass() {
  const monthPriceID = "price_1QnoSKI0TWu0X0NTWMp1ROWP";
  const yearPriceID = "price_1QnoT9I0TWu0X0NTE08Ldx2R";
  const supabase = await createClient();

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("stripe_subscriptionID");
  const stripeSubscriptionID = profile[0].stripe_subscriptionID;

  const subscription =
    profile?.length > 0 ? await getSubscription(stripeSubscriptionID) : null;

  const priceID = subscription?.items?.data[0].price.id;
  const subscriptionItems = subscription?.items?.data[0];

  console.log("console from fitlab Pass: profile", subscription);

  return (
    <>
      <h1 className="text-3xl">FitLab Pass</h1>
      {subscription.status === "active" ? (
        <div>
          <div className="text-green-500 italic">active</div>
          <div className="flex flex-col mt-4">
            <div>
              <span className="font-bold">Packet price:</span>{" "}
              {subscriptionItems?.plan.amount / 100}{" "}
              {subscriptionItems?.plan.currency.toUpperCase()}
            </div>
            <div>
              <span className="font-bold">Billing frequency:</span> every{" "}
              {subscriptionItems?.plan.interval_count}{" "}
              {subscriptionItems?.plan.interval}
            </div>
          </div>
          <hr></hr>
        </div>
      ) : (
        <div>not active</div>
      )}
    </>
  );
}

export default FitlabPass;
