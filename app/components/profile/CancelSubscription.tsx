"use client";

import { cancelSubscriptionByID } from "@/actions/stripeActions";

function CancelSubscription() {
  return <button onClick={cancelSubscriptionByID}>Cancel membership</button>;
}

export default CancelSubscription;
