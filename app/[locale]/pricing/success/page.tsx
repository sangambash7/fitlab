import { getBySessionID } from "@/actions/stripeActions";
import { createSubscriptionSupabase } from "@/actions/authActions";
import Pricelist from "../../components/pricing/Pricelist";

interface SuccessProps {
  searchParams: Promise<Record<string, string | undefined>>;
}

export default async function Success({ searchParams }: SuccessProps) {
  const params = await searchParams;
  const session_id = params?.session_id;

  if (!session_id) {
    return <div>No session ID found</div>;
  }

  const session = await getBySessionID(session_id);
  if (!session) {
    return null;
  }

  const subscriptionID = session.subscription;

  if (typeof subscriptionID !== "string") {
    console.error("Invalid subscription ID:", subscriptionID);
    return null;
  }

  await createSubscriptionSupabase(subscriptionID);

  return (
    <main className="flex justify-center">
      <div className="w-[1200px] flex justify-center mt-8 gap-10">
        <div className="flex flex-col">
          <div className="text-[#1B4A8E] dark:text-white text-[3rem] font-bold">
            Congratulations! Your Membership Is Confirmed
          </div>
          <div className="text-[#1B4A8E] dark:text-white text-[2rem] font-bold">
            Enjoy our facilities! Please visit your profile page to see more
            details about your membership.
          </div>
          <Pricelist hasMembership={true} />
        </div>
      </div>
    </main>
  );
}
