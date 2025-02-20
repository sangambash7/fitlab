"use client";
import { createClient } from "@/utils/supabase/client";
import { useState, useEffect, useRef } from "react";
import { buyFromCart } from "@/actions/buyFromCart";

function BuyFromCartButton() {
  const [productData, setProductData] = useState([]);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    async function getCartData() {
      const supabase = await createClient();
      const { data } = await supabase
        .from("cart")
        .select("id, product_id, quantity, price_id");

      data.map((item) =>
        setProductData((prev) => [
          ...prev,
          { price: item.price_id, quantity: item.quantity },
        ])
      );
    }
    getCartData();
  }, []);

  return (
    <button
      onClick={() => buyFromCart(productData)}
      className="border border-[#1B4A8E] px-4 py-2 rounded-sm text-[#1B4A8E] dark:text-white dark:hover:bg-slate-900 hover:bg-[#1B4A8E] hover:text-white"
    >
      GO TO CHECKOUT
    </button>
  );
}

export default BuyFromCartButton;
