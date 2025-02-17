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

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      console.error("Cant retrieve user:", authError);
      return null;
    }

    const { data, error: errorCart } = await supabase
      .from("cart")
      .select("products");
    const cartData = data && data[0].products;

    console.log("data from cart", cartData);
    cartData?.push({ product_id: productID, quantity: quantity });

    const { error } = await supabase
      .from("cart")
      .update([{ products: cartData }])
      .eq("user_id", user.id);

    if (error) {
      console.log(error);
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
