"use client";

import { createClient } from "@/utils/supabase/client";

function AddToCartButton({
  quantity,
  productID,
}: {
  quantity: number;
  productID: number;
}) {
  async function handleAddToCart() {
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
        .insert([{ product_id: productID, quantity: quantity }]);
    }
  }

  return (
    <button
      onClick={handleAddToCart}
      className="bg-[#1B4A8E] dark:bg-white dark:text-black dark:hover:bg-slate-900 dark:hover:text-white px-10 py-2 rounded-sm text-white hover:bg-white hover:text-[#1B4A8E] hover:border hover:border-[#1B4A8E]"
    >
      ADD TO CART
    </button>
  );
}

export default AddToCartButton;
