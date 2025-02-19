import { CiShoppingCart } from "react-icons/ci";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";

async function ShoppingCartButton() {
  const supabase = await createClient();
  const { data } = await supabase.from("cart").select("id");

  return (
    <button>
      <Link href={"/shop/cart"}>
        <span className="flex items-center ">
          <CiShoppingCart />{" "}
          <span className="text-red-700 align-super text-sm relative -top-1">
            {data?.length > 0 && data?.length}
          </span>
        </span>
      </Link>
    </button>
  );
}

export default ShoppingCartButton;
