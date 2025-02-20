import getStripe from "@/utils/get-stripejs";

export async function buyFromCart(productData) {
  console.log("handlebuy from cart run");
  const response = await fetch("/api/stripe/create-multiple-payments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      productData,
    }),
  });

  const { sessionId } = await response.json();
  const stripe = await getStripe();

  if (!stripe) {
    console.error("Stripe.js didn't load correctly.");
    return;
  }

  if (sessionId) {
    try {
      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        console.error("Error redirecting to checkout:", error.message);
      }
    } catch (err) {
      console.error("Error with redirecting to checkout:", err);
    }
  } else {
    console.error("Session ID is not valid.");
  }
}
