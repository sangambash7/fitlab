"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import getStripe from "@/utils/get-stripejs";

function ProductClient({
  productID,
  priceID,
}: {
  productID: number;
  priceID: string;
}) {
  const [quantity, setQuantity] = useState(1);
  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  async function handleBuy() {
    console.log("handlebuy run");
    const response = await fetch("/api/stripe/create-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productID,
        priceID,
        quantity,
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

  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="sm"
          className="px-2 py-1 dark:bg-white dark:text-black"
          onClick={handleDecrement}
        >
          -
        </Button>
        <div className="text-xl">{quantity} </div>
        <Button
          variant="outline"
          size="sm"
          className="px-2 py-1 dark:bg-white dark:text-black"
          onClick={handleIncrement}
        >
          +
        </Button>
      </div>
      <div className="text-xl">
        <button className="bg-[#1B4A8E] dark:bg-white dark:text-black dark:hover:bg-slate-900 dark:hover:text-white px-10 py-2 rounded-sm text-white hover:bg-white hover:text-[#1B4A8E] hover:border hover:border-[#1B4A8E]">
          ADD TO CART
        </button>
      </div>
      <div className="text-xl">
        <button
          onClick={() => handleBuy()}
          className="border border-[#1B4A8E] px-4 py-2 rounded-sm text-[#1B4A8E] dark:text-white dark:hover:bg-slate-900 hover:bg-[#1B4A8E] hover:text-white"
        >
          BUY NOW
        </button>
      </div>
    </div>
  );
}

export default ProductClient;
