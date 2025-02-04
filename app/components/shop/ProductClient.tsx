"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

function ProductClient() {
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
    <div className="flex justify-between">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="sm"
          className="px-2 py-1"
          onClick={handleDecrement}
        >
          -
        </Button>
        <div className="text-xl">{quantity} </div>
        <Button
          variant="outline"
          size="sm"
          className="px-2 py-1"
          onClick={handleIncrement}
        >
          +
        </Button>
      </div>
      <div className="text-xl">
        <button className="bg-[#1B4A8E] px-10 py-2 rounded-sm text-white hover:bg-white hover:text-[#1B4A8E] hover:border hover:border-[#1B4A8E]">
          ADD TO CART
        </button>
      </div>
      <div className="text-xl">
        <button className="border border-[#1B4A8E] px-4 py-2 rounded-sm text-[#1B4A8E] hover:bg-[#1B4A8E] hover:text-white">
          BUY NOW
        </button>
      </div>
    </div>
  );
}

export default ProductClient;
