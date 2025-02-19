"use client";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

function CartItem({ productID, quantity }) {
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    async function getProduct() {
      const supabase = await createClient();

      const { data } = await supabase
        .from("products")
        .select("name, price, stripe_priceID, picture")
        .eq("id", productID);

      setProductData(data?.length > 0 && data[0]);
    }
    getProduct();
  }, []);

  return (
    <>
      {productData && (
        <>
          <td className="flex items-center gap-2">
            <img
              src={`${productData?.picture || "/placeholder.png"}`}
              width={50}
              height={80}
            />
            {productData?.name}
          </td>
          <td>{productData?.price / 100}</td>
          <td>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                className="px-2 py-1 dark:bg-white dark:text-black"
                // onClick={handleDecrement}
              >
                -
              </Button>
              <div className="text-xl">{quantity}</div>
              <Button
                variant="outline"
                size="sm"
                className="px-2 py-1 dark:bg-white dark:text-black"
                // onClick={handleIncrement}
              >
                +
              </Button>
            </div>
          </td>
          <td className="text-right">
            {((productData?.price / 100) * quantity).toFixed(2)}
          </td>
        </>
      )}
    </>
  );
}

export default CartItem;
