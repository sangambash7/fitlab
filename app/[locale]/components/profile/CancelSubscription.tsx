"use client";

import { cancelSubscriptionByID } from "@/actions/stripeActions";
import { useState } from "react";

function CancelSubscription() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsModalOpen(true)}>Cancel membership</button>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 ">
          <div className="bg-white p-8 rounded-lg max-w-md w-full flex flex-col items-center gap-4">
            <div className="text-black flex text-center">
              Are You Sure You Want To Cancel The Next Bill Payment And
              Membership?
            </div>

            <div className="flex gap-20 text-xl">
              <div
                className="cursor-pointer bg-[#1B4A8E] px-2 rounded-md text-white"
                onClick={cancelSubscriptionByID}
              >
                Yes
              </div>
              <div
                className="cursor-pointer bg-red-700 px-2 rounded-md text-white"
                onClick={() => setIsModalOpen(false)}
              >
                No
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CancelSubscription;
