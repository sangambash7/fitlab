"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

function Cart() {
  const [quantity, setQuantity] = useState(1);
  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <main className="flex justify-center">
      <div className="w-[1200px] flex m-8 gap-10">
        <div className="flex flex-col w-full">
          <h1 className="text-center mb-4 font-bold text-lg tracking-wider">
            YOUR BAG (2 ITEMS)
          </h1>
          <div className="w-full">
            <table className="table-auto w-full">
              <thead className="border-b">
                <tr className="text-left">
                  <th>ITEM</th>
                  <th>PRICE</th>
                  <th>QUANTITY</th>
                  <th className="text-right">TOTAL</th>
                </tr>
              </thead>
              <tbody className="">
                <tr>
                  <td className="flex items-center gap-2">
                    {" "}
                    <img
                      src={`${"/placeholder.png"}`}
                      width={100}
                      height={100}
                    />
                    The Sliding Mr.
                  </td>
                  <td>₾9.95</td>
                  <td>
                    {" "}
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
                  </td>
                  <td className="text-right">₾19.9</td>
                </tr>
                <tr>
                  <td className="flex items-center gap-2">
                    {" "}
                    <img
                      src={`${"/placeholder.png"}`}
                      width={100}
                      height={100}
                    />
                    The Sliding Mr.
                  </td>
                  <td>₾11</td>
                  <td>1</td>
                  <td className="text-right">₾11</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="w-full mt-5">
            <div className="flex flex-col items-end">
              <div className="w-[200px] md:w-[400px]">
                <div className="flex justify-between mb-4">
                  <div className="font-bold">Subtotal:</div>
                  <div>₾29.9</div>
                </div>
                <div className="flex justify-end">
                  <button className="border border-[#1B4A8E] px-4 py-2 rounded-sm text-[#1B4A8E] dark:text-white dark:hover:bg-slate-900 hover:bg-[#1B4A8E] hover:text-white">
                    GO TO CHECKOUT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Cart;
