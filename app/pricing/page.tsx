"use client";

import { useState } from "react";

function Pricing() {
  const [pack, setPack] = useState("");

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
            <button onClick={() => setPack("monthly")}>
              <div
                className={`flex flex-col shadow-lg border ${
                  pack === "monthly" && "border-[#1B4A8E] border-[0.15rem]"
                }  rounded-md bg-white text-center gap-8 px-8 pt-2 pb-8 w-[450px] md:w-[350px]`}
              >
                <h2 className="font-bold text-2xl">Monthly</h2>
                <h2 className="font-bold text-2xl">$99</h2>

                <div className="bg-[#1B4A8E] text-white text-sm px-6 py-2 rounded-3xl self-center">
                  Subscribe Now
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
            </button>
            {/* YEARLY */}
            <button onClick={() => setPack("yearly")}>
              <div
                className={`flex flex-col shadow-lg border ${
                  pack === "yearly" && "border-[#1B4A8E] border-[0.15rem]"
                }  rounded-md bg-white text-center gap-8 px-8 pt-2 pb-8 w-[450px] md:w-[350px]`}
              >
                <h2 className="font-bold text-2xl">Yearly</h2>
                <h2 className="font-bold text-2xl">$999</h2>
                <div className="bg-[#1B4A8E] text-white text-sm px-6 py-2 rounded-3xl self-center">
                  Subscribe Now
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
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Pricing;
