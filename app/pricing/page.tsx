import { createClient } from "@/utils/supabase/server";
import { getSubscription } from "@/actions/stripeActions";
import Pricelist from "../components/pricing/Pricelist";

async function Pricing() {
  const supabase = await createClient();

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("stripe_subscriptionID");
  const stripeSubscriptionID = profile && profile[0]?.stripe_subscriptionID;

  const subscription =
    profile && profile?.length > 0
      ? await getSubscription(stripeSubscriptionID)
      : null;

  const hasMembership = subscription?.items?.data[0]?.price?.active;

  return (
    <main className="flex justify-center">
      <div className="w-[1200px] flex justify-center mt-8 gap-10">
        <div className="flex flex-col">
          <div className="text-[#1B4A8E] text-[3rem] font-bold">Price list</div>
          <div className="text-[#1B4A8E] text-[2rem] font-bold">
            {hasMembership
              ? "You already hold the active membership. Enjoy!"
              : "Choose the membership that suits you best"}
          </div>
          <Pricelist hasMembership={hasMembership} />
        </div>
      </div>
    </main>
  );
}

export default Pricing;
