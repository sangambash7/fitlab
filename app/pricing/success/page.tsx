import { getBySessionID } from "@/actions/stripeActions";
import { createSubscriptionSupabase } from "@/actions/authActions";

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
          <div>You Subscription Is Confirmed</div>
          <div>session ID: {session_id}</div>
        </div>
      </div>
    </main>
  );
}

export default Success;
