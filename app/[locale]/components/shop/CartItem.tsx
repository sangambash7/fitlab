"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import DeleteCartItem from "./DeleteCartItem";

function CartItem({
  setCartUpdated,
  cartID,
  productID,
  quantity,
}: {
  cartID: number;
  productID: number;
  quantity: number;
}) {
  const [productData, setProductData] = useState(null);
  const supabase = createClient();

  useEffect(() => {
    async function getProduct() {
      // const supabase = await createClient();

      const { data } = await supabase
        .from("products")
        .select("name, price, stripe_priceID, picture")
        .eq("id", productID);

      setProductData(data?.length > 0 && data[0]);
    }
    getProduct();
  }, []);

  const handleDecrement = async () => {
    if (quantity > 1) {
      await supabase
        .from("cart")
        .update({ quantity: quantity - 1 })
        .eq("id", cartID);
    }

    setCartUpdated((prev) => !prev);
  };

  const handleIncrement = async () => {
    await supabase
      .from("cart")
      .update({ quantity: quantity + 1 })
      .eq("id", cartID);

    setCartUpdated((prev) => !prev);
  };

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
                onClick={handleDecrement}
              >
                -
              </Button>
              <div className="text-xl">{quantity}</div>
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
          <td className="text-right">
            <span className="">
              {((productData?.price / 100) * quantity).toFixed(2)}{" "}
              <DeleteCartItem cartID={cartID} setCartUpdated={setCartUpdated} />
            </span>
          </td>
        </>
      )}
    </>
  );
}

export default CartItem;
