"use client";

import { useEffect, useState } from "react";
import CartItem from "../../components/shop/CartItem";
import BuyFromCartButton from "./BuyFromCartButton";
import { createClient } from "@/utils/supabase/client";
import LoadingSpinner from "../../components/LoadingSpinner";

function CartClient() {
  const [isLoading, setIsLoading] = useState(false);
  const [cartList, setCartList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(null);
  const [cartUpdated, setCartUpdated] = useState(false); // გადაეცემა შვილებს პროპსებად; იქ განხორციელებული ოპერაციების შემდეგ ახლდება რათა მშობლის და შვილის რეგენრირება გამოიწვიოს

  useEffect(() => {
    async function getCartData() {
      // setIsLoading(true);
      const supabase = await createClient();
      const { data: cartData } = await supabase
        .from("cart")
        .select("id, product_id, quantity, price_id");

      setCartList(cartData);

      const productPrices = await Promise.all(
        cartData.map(async (item) => {
          const { data: product } = await supabase
            .from("products")
            .select("price")
            .eq("id", item.product_id)
            .single();

          return product ? product.price * item.quantity : 0;
        })
      );

      setTotalPrice(productPrices.reduce((acc, price) => acc + price, 0));
      // setIsLoading(false);
    }
    getCartData();
  }, [cartUpdated]);

  return (
    <>
      {!isLoading ? (
        <>
          <h1 className="text-center mb-4 font-bold text-lg tracking-wider">
            YOUR BAG
            {cartList.length > 0 ? (
              <span> ({cartList.length} items)</span>
            ) : (
              <span> IS EMPTY</span>
            )}
          </h1>
          {cartList && cartList.length > 0 && (
            <>
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
                  {cartList &&
                    cartList.map((item, index) => (
                      <tr key={index}>
                        <CartItem
                          setCartUpdated={setCartUpdated}
                          cartID={item.id}
                          productID={item.product_id}
                          quantity={item.quantity}
                        />
                      </tr>
                    ))}
                </tbody>
              </table>
              <div className="w-full mt-5">
                <div className="flex flex-col items-end">
                  <div className="w-[200px] md:w-[400px]">
                    <div className="flex justify-between mb-4">
                      <div className="font-bold">Subtotal:</div>
                      <div>₾{totalPrice && totalPrice / 100}</div>
                    </div>
                    <div className="flex justify-end">
                      <BuyFromCartButton />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <div className="flex flex-col w-full items-center justify-center">
          <LoadingSpinner />
        </div>
      )}
    </>
  );
}

export default CartClient;
