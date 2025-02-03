"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { createSubscriptionSupabase } from "@/actions/authActions";
import getStripe from "@/utils/get-stripejs";
import { createSubscription } from "@/actions/stripeActions";

async function checkSubscription() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("profiles").select("*");

  return data;
}

async function fetchData() {
  const data = await checkSubscription();
  console.log("data: ", data); // This will log the resolved data
}

fetchData();

function Pricing() {
  const [interval, setInterval] = useState("");

  async function handleSubscription(time: "month" | "year") {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();

    const priceID =
      time === "month"
        ? "price_1QnoSKI0TWu0X0NTWMp1ROWP"
        : "price_1QnoT9I0TWu0X0NTE08Ldx2R";
    const customerID = data?.user?.user_metadata?.stripeCustomerID;

    const response = await fetch("/api/stripe/create-subscription", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        priceID,
        customerID,
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
    <main className="flex justify-center">
      <div className="w-[1200px] flex justify-center mt-8 gap-10">
        <div className="flex flex-col">
          <div className="text-[#1B4A8E] text-[3rem] font-bold">Price list</div>
          <div className="text-[#1B4A8E] text-[2rem] font-bold">
            Choose the membership that suits you best
          </div>
          <div className="bg-[#F1F1F1] mt-4 flex flex-col md:flex-row items-center">
            {/* MONTHLY */}
            <div
              className="cursor-pointer"
              onClick={() => setInterval("monthly")}
            >
              <div
                className={`flex flex-col shadow-lg border hover:border-[#1B4A8E] ${
                  interval === "monthly" && "border-[#1B4A8E] border-[0.15rem]"
                }  rounded-md bg-white text-center gap-8 px-8 pt-2 pb-8 w-[450px] md:w-[350px]`}
              >
                <h2 className="font-bold text-2xl">Monthly</h2>
                <h2 className="font-bold text-2xl">$99</h2>

                <div className="bg-[#1B4A8E] text-white hover:bg-blue-600 text-sm px-6 py-2 rounded-3xl self-center">
                  <button onClick={() => handleSubscription("month")}>
                    Buy 1 month
                  </button>
                </div>
                <div className="flex flex-col text-start text-sm">
                  <div>
                    <span className="text-[#1B4A8E]">✔</span> Monthly payment
                  </div>
                  <div>
                    <span className="text-[#1B4A8E]">✔</span> Unlimited access
                    to all FitLab clubs
                  </div>
                  <div>
                    <span className="text-[#1B4A8E]">✔</span> Unlimited access
                    to all group activities
                  </div>
                  <div>
                    <span className="text-[#1B4A8E]">✔</span> Fitness areas with
                    high-quality equipment
                  </div>
                  <div>
                    <span className="text-[#1B4A8E]">✔</span> Changing rooms,
                    Showers, Wifi
                  </div>
                </div>
              </div>
            </div>
            {/* YEARLY */}
            <div
              className="cursor-pointer"
              onClick={() => setInterval("yearly")}
            >
              <div
                className={`flex flex-col shadow-lg border hover:border-[#1B4A8E] ${
                  interval === "yearly" && "border-[#1B4A8E] border-[0.15rem]"
                }  rounded-md bg-white text-center gap-8 px-8 pt-2 pb-8 w-[450px] md:w-[350px]`}
              >
                <h2 className="font-bold text-2xl">Yearly</h2>
                <h2 className="font-bold text-2xl">$999</h2>
                <div className="bg-[#1B4A8E] text-white hover:bg-blue-600 text-sm px-6 py-2 rounded-3xl self-center">
                  <button onClick={() => handleSubscription("year")}>
                    Buy 1 year
                  </button>
                </div>

                <div className="flex flex-col text-start text-sm">
                  <div>
                    <span className="text-[#1B4A8E]">✔</span> Yearly payment
                  </div>
                  <div>
                    <span className="text-[#1B4A8E]">✔</span> Unlimited access
                    to all FitLab clubs
                  </div>
                  <div>
                    <span className="text-[#1B4A8E]">✔</span> Unlimited access
                    to all group activities
                  </div>
                  <div>
                    <span className="text-[#1B4A8E]">✔</span> Fitness areas with
                    high-quality equipment
                  </div>
                  <div>
                    <span className="text-[#1B4A8E]">✔</span> Changing rooms,
                    Showers, Wifi
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Pricing;
