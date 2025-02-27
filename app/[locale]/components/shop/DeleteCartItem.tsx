"use client";

import { createClient } from "@/utils/supabase/client";
import { RiDeleteBin7Line } from "react-icons/ri";

function DeleteCartItem({ cartID, setCartUpdated }: { cartID: number }) {
  async function handleDelete() {
    console.log("from DeleteCartItem", cartID);
    const supabase = await createClient();

    await supabase.from("cart").delete().eq("id", cartID);

    setCartUpdated((prev) => !prev);
  }

  return (
    <button onClick={handleDelete}>
      <RiDeleteBin7Line />
    </button>
  );
}

export default DeleteCartItem;
