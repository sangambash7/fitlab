"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import getStripe from "@/utils/get-stripejs";
import LoadingSpinner from "../LoadingSpinner";

function Pricelist({ hasMembership }: { hasMembership: boolean | undefined }) {
  const [interval, setInterval] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubscription(time: "month" | "year" | "quarter") {
    setIsLoading(true);
    console.log("first run after loading set to true");
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    console.log("data from supabase user", data);

    const priceObject = {
      month: "price_1QnoSKI0TWu0X0NTWMp1ROWP",
      quarter: "price_1QnoSiI0TWu0X0NT6hzUtYun",
      year: "price_1QnoT9I0TWu0X0NTE08Ldx2R",
    };

    const priceID = priceObject[time];
    const customerID = data?.user?.user_metadata?.stripeCustomerID;
    console.log(priceID, customerID);

    const response = await fetch("/api/stripe/create-subscription", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        priceID,
        customerID,
      }),
    });

    console.log("response", response);

    const { sessionId } = await response.json();
    const stripe = await getStripe();
    console.log("sessionId", sessionId);

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
    <>
      <div
        className={`bg-[#F1F1F1] dark:bg-slate-900 mt-4 pt-2 lg:pt-0 flex flex-col lg:flex-row items-center ${
          isLoading && "pointer-events-none opacity-60"
        } ${hasMembership && "pointer-events-none opacity-60"} `}
      >
        {/* MONTHLY */}
        <div
          className="cursor-pointer h-full"
          onClick={() => setInterval("monthly")}
        >
          <div
            className={`flex flex-col shadow-lg border h-full hover:border-[#1B4A8E] rounded-md text-center gap-8 px-8 pt-2 pb-8 w-[450px] md:w-[450px] lg:w-[350px] ${
              interval === "monthly"
                ? "border-[#1B4A8E] bg-[#1B4A8E] dark:bg-slate-900 border-[0.15rem]"
                : "bg-white dark:bg-black"
            }  `}
          >
            <h2
              className={`font-bold text-2xl ${
                interval === "monthly"
                  ? "text-white"
                  : "text-[#1B4A8E] dark:text-white"
              }`}
            >
              Monthly
            </h2>
            <div>
              <h2
                className={`font-bold text-2xl ${
                  interval === "monthly"
                    ? "text-white"
                    : "text-[#1B4A8E] dark:text-white"
                }`}
              >
                ₾99 /month
              </h2>
              <h3
                className={`font-bold text-sm ${
                  interval === "monthly"
                    ? "text-white"
                    : "text-[#1B4A8E] dark:text-white"
                }`}
              >
                billed monthly
              </h3>
            </div>

            <div
              className={` text-sm px-6 py-2 rounded-3xl self-center ${
                interval === "monthly"
                  ? "bg-white text-black hover:bg-slate-100 "
                  : "bg-[#1B4A8E] dark:bg-black dark:border dark:border-white dark:font-bold dark:hover:bg-slate-900 text-white hover:bg-blue-600 "
              }`}
            >
              <button onClick={() => handleSubscription("month")}>
                Buy 1 month
              </button>
            </div>
            <div
              className={`flex flex-col text-start text-sm ${
                interval === "monthly"
                  ? "text-white"
                  : "text-black dark:text-white"
              }`}
            >
              <div>
                <span
                  className={`${
                    interval === "monthly"
                      ? "text-white"
                      : "text-[#1B4A8E] dark:text-white"
                  }`}
                >
                  ✔
                </span>{" "}
                Billed once in a month
              </div>
              <div>
                <span
                  className={`${
                    interval === "monthly"
                      ? "text-white"
                      : "text-[#1B4A8E] dark:text-white"
                  }`}
                >
                  ✔
                </span>{" "}
                Unlimited access to all FitLab clubs
              </div>
              <div>
                <span
                  className={`${
                    interval === "monthly"
                      ? "text-white"
                      : "text-[#1B4A8E] dark:text-white"
                  }`}
                >
                  ✔
                </span>{" "}
                Unlimited access to all group activities
              </div>
              <div>
                <span
                  className={`${
                    interval === "monthly"
                      ? "text-white"
                      : "text-[#1B4A8E] dark:text-white"
                  }`}
                >
                  ✔
                </span>{" "}
                Fitness areas with high-quality equipment
              </div>
              <div>
                <span
                  className={`${
                    interval === "monthly"
                      ? "text-white"
                      : "text-[#1B4A8E] dark:text-white"
                  }`}
                >
                  ✔
                </span>{" "}
                Changing rooms, Showers, Wifi
              </div>
            </div>
          </div>
        </div>
        {/* QUARTER */}
        <div
          className="cursor-pointer h-full"
          onClick={() => setInterval("quarter")}
        >
          <div
            className={`flex flex-col shadow-lg border h-full hover:border-[#1B4A8E] rounded-md text-center gap-8 px-8 pt-2 pb-8 w-[450px] md:w-[450px] lg:w-[350px] ${
              interval === "quarter"
                ? "border-[#1B4A8E] bg-[#1B4A8E] dark:bg-slate-900 border-[0.15rem]"
                : "bg-white dark:bg-black"
            }  `}
          >
            <h2
              className={`font-bold text-2xl ${
                interval === "quarter"
                  ? "text-white"
                  : "text-[#1B4A8E] dark:text-white"
              }`}
            >
              Quarterly
            </h2>
            <div>
              <h2
                className={`font-bold text-2xl ${
                  interval === "quarter"
                    ? "text-white"
                    : "text-[#1B4A8E] dark:text-white"
                }`}
              >
                ₾99 /month
              </h2>
              <h3
                className={`font-bold text-sm ${
                  interval === "quarter"
                    ? "text-white"
                    : "text-[#1B4A8E] dark:text-white"
                }`}
              >
                billed every 3 months
              </h3>
            </div>

            <div
              className={` text-sm px-6 py-2 rounded-3xl self-center ${
                interval === "quarter"
                  ? "bg-white text-black hover:bg-slate-100 "
                  : "bg-[#1B4A8E] dark:bg-black dark:border dark:border-white dark:font-bold dark:hover:bg-slate-900 text-white hover:bg-blue-600 "
              }`}
            >
              <button onClick={() => handleSubscription("month")}>
                Buy 3 months
              </button>
            </div>
            <div
              className={`flex flex-col text-start text-sm ${
                interval === "quarter"
                  ? "text-white"
                  : "text-black dark:text-white"
              }`}
            >
              <div>
                <span
                  className={`${
                    interval === "quarter"
                      ? "text-white"
                      : "text-[#1B4A8E] dark:text-white"
                  }`}
                >
                  ✔
                </span>{" "}
                Billed once in a quarter
              </div>
              <div>
                <span
                  className={`${
                    interval === "quarter"
                      ? "text-white"
                      : "text-[#1B4A8E] dark:text-white"
                  }`}
                >
                  ✔
                </span>{" "}
                Unlimited access to all FitLab clubs
              </div>
              <div>
                <span
                  className={`${
                    interval === "quarter"
                      ? "text-white"
                      : "text-[#1B4A8E] dark:text-white"
                  }`}
                >
                  ✔
                </span>{" "}
                Unlimited access to all group activities
              </div>
              <div>
                <span
                  className={`${
                    interval === "quarter"
                      ? "text-white"
                      : "text-[#1B4A8E] dark:text-white"
                  }`}
                >
                  ✔
                </span>{" "}
                Fitness areas with high-quality equipment
              </div>
              <div>
                <span
                  className={`${
                    interval === "quarter"
                      ? "text-white"
                      : "text-[#1B4A8E] dark:text-white"
                  }`}
                >
                  ✔
                </span>{" "}
                Includes 8 personal training sessions from our proffesional
                staff
              </div>
              <div>
                <span
                  className={`${
                    interval === "quarter"
                      ? "text-white"
                      : "text-[#1B4A8E] dark:text-white"
                  }`}
                >
                  ✔
                </span>{" "}
                Changing rooms, Showers, Wifi
              </div>
            </div>
          </div>
        </div>
        {/* YEARLY */}
        <div
          className="cursor-pointer h-full"
          onClick={() => setInterval("year")}
        >
          <div
            className={`flex flex-col shadow-lg border h-full hover:border-[#1B4A8E] rounded-md text-center gap-8 px-8 pt-2 pb-8 w-[450px] md:w-[450px] lg:w-[350px] ${
              interval === "year"
                ? "border-[#1B4A8E] bg-[#1B4A8E] dark:bg-slate-900 border-[0.15rem]"
                : "bg-white dark:bg-black"
            }  `}
          >
            <h2
              className={`font-bold text-2xl ${
                interval === "year"
                  ? "text-white"
                  : "text-[#1B4A8E] dark:text-white"
              }`}
            >
              Quarterly
            </h2>
            <div>
              <h2
                className={`font-bold text-2xl ${
                  interval === "year"
                    ? "text-white"
                    : "text-[#1B4A8E] dark:text-white"
                }`}
              >
                ₾99 /month
              </h2>
              <h3
                className={`font-bold text-sm ${
                  interval === "year"
                    ? "text-white"
                    : "text-[#1B4A8E] dark:text-white"
                }`}
              >
                billed anually
              </h3>
            </div>

            <div
              className={` text-sm px-6 py-2 rounded-3xl self-center ${
                interval === "year"
                  ? "bg-white text-black hover:bg-slate-100 "
                  : "bg-[#1B4A8E] dark:bg-black dark:border dark:border-white dark:font-bold dark:hover:bg-slate-900 text-white hover:bg-blue-600 "
              }`}
            >
              <button onClick={() => handleSubscription("month")}>
                Buy 1 year
              </button>
            </div>
            <div
              className={`flex flex-col text-start text-sm ${
                interval === "year"
                  ? "text-white"
                  : "text-black dark:text-white"
              }`}
            >
              <div>
                <span
                  className={`${
                    interval === "year"
                      ? "text-white"
                      : "text-[#1B4A8E] dark:text-white"
                  }`}
                >
                  ✔
                </span>{" "}
                Billed once in a year
              </div>
              <div>
                <span
                  className={`${
                    interval === "year"
                      ? "text-white"
                      : "text-[#1B4A8E] dark:text-white"
                  }`}
                >
                  ✔
                </span>{" "}
                Unlimited access to all FitLab clubs
              </div>
              <div>
                <span
                  className={`${
                    interval === "year"
                      ? "text-white"
                      : "text-[#1B4A8E] dark:text-white"
                  }`}
                >
                  ✔
                </span>{" "}
                Unlimited access to all group activities
              </div>
              <div>
                <span
                  className={`${
                    interval === "year"
                      ? "text-white"
                      : "text-[#1B4A8E] dark:text-white"
                  }`}
                >
                  ✔
                </span>{" "}
                Fitness areas with high-quality equipment
              </div>
              <div>
                <span
                  className={`${
                    interval === "year"
                      ? "text-white"
                      : "text-[#1B4A8E] dark:text-white"
                  }`}
                >
                  ✔
                </span>{" "}
                Changing rooms, Showers, Wifi
              </div>
              <div>
                <span
                  className={`${
                    interval === "year"
                      ? "text-white"
                      : "text-[#1B4A8E] dark:text-white"
                  }`}
                >
                  ✔
                </span>{" "}
                Includes 20 personal training sessions from our proffesional
                staff
              </div>
            </div>
          </div>
        </div>
      </div>
      {isLoading && (
        <div className="flex justify-center mt-1">
          <LoadingSpinner />
        </div>
      )}
    </>
  );
}

export default Pricelist;
