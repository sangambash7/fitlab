"use client";

import { createClient } from "@/utils/supabase/server";
import { cancelSubscription } from "@/actions/stripeActions";
import { useEffect, useState } from "react";

function CancelSubscription() {
  const [cancelAction, setCancelAction] = useState(false);

  useEffect(() => {
    async function handleCancel() {
      const supabase = await createClient();

      const { data: profile, error } = await supabase
        .from("profiles")
        .select("stripe_subscriptionID");
      if (error) {
        return;
      }
      const stripeSubscriptionID = profile[0].stripe_subscriptionID;
      cancelSubscription(stripeSubscriptionID);
    }
    handleCancel();
  }, []);

  return <button onClick={() => setCancelAction(true)}>Cancel sub</button>;
}

export default CancelSubscription;
