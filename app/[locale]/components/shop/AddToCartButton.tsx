"use client";

import { createClient } from "@/utils/supabase/client";
import { useState } from "react";

function AddToCartButton({
  quantity,
  productID,
  priceID,
  isLoading,
  setIsLoading,
}: {
  quantity: number;
  productID: number;
  priceID: string;
}) {
  const [cartAdding, setCartAdding] = useState(false);

  async function handleAddToCart() {
    setIsLoading(true);
    setCartAdding(true);
    const supabase = await createClient();

    //update a cart item if product already exists
    const { data } = await supabase.from("cart").select("product_id, quantity");

    const currentProduct = data?.find(
      (product) => product.product_id === productID
    );

    if (currentProduct) {
      await supabase
        .from("cart")
        .update([{ quantity: currentProduct.quantity + quantity }])
        .eq("product_id", productID);
    } else {
      // create a new cart items if the product doesn't exist
      await supabase
        .from("cart")
        .insert([
          { product_id: productID, quantity: quantity, price_id: priceID },
        ]);
    }
    setIsLoading(false);
    setCartAdding(false);
  }

  return (
    <button
      onClick={handleAddToCart}
      className="bg-[#1B4A8E] dark:bg-white dark:text-black dark:hover:bg-slate-900 dark:hover:text-white px-10 py-2 rounded-sm text-white hover:bg-white hover:text-[#1B4A8E] hover:border hover:border-[#1B4A8E]"
    >
      {!cartAdding ? "ADD TO CART" : "ADDING..."}
    </button>
  );
}

export default AddToCartButton;
