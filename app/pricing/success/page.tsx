import { getBySessionID } from "@/actions/stripeActions";
import { createSubscriptionSupabase } from "@/actions/authActions";
import Pricelist from "@/app/components/pricing/Pricelist";

async function Success({
  searchParams,
}: {
  searchParams: { session_id: string };
}) {
  const { session_id } = searchParams;
  const session = await getBySessionID(session_id);
  if (!session) {
    return null;
  }

  const subscriptionID = session.subscription;

  await createSubscriptionSupabase(subscriptionID);

  return (
    <main className="flex justify-center">
      <div className="w-[1200px] flex justify-center mt-8 gap-10">
        <div className="flex flex-col">
          <div className="text-[#1B4A8E] text-[3rem] font-bold">
            Congratulations! You Membership Is Confirmed
          </div>
          <div className="text-[#1B4A8E] text-[2rem] font-bold">
            Enjoy our facilities! Please visit your profile page to see more
            details about your membership
          </div>
          <Pricelist hasMembership={true} />
        </div>
      </div>
    </main>
  );
}

export default Success;
