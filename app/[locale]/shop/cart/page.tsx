"use client";

import { useEffect, useState, useRef } from "react";
import CartItem from "../../components/shop/CartItem";
import getStripe from "@/utils/get-stripejs";
import { createClient } from "@/utils/supabase/client";
import LoadingSpinner from "../../components/LoadingSpinner";

function Cart() {
  const [isLoading, setIsLoading] = useState(false);
  const [cartData, setCartData] = useState(null);
  const [productData, setProductData] = useState([]);
  const hasFetched = useRef(false);
  let totalPrice = 0;

  useEffect(() => {
    setIsLoading(true);
    if (hasFetched.current) return;
    hasFetched.current = true;

    async function getCartData() {
      const supabase = await createClient();
      const { data } = await supabase
        .from("cart")
        .select("id, product_id, quantity, price_id");

      setCartData(data);
      console.log("data", data);

      const { data: products } = await supabase
        .from("products")
        .select("price, stripe_priceID");

      console.log("products", products);

      data.map((item) =>
        setProductData((prev) => [
          ...prev,
          { price: item.price_id, quantity: item.quantity },
        ])
      );

      console.log("productData", productData);

      setIsLoading(false);
    }
    getCartData();
  }, []);

  async function handleBuy() {
    console.log("handlebuy from cart run");
    const response = await fetch("/api/stripe/create-multiple-payments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productData,
      }),
    });

    const { sessionId } = await response.json();
    const stripe = await getStripe();

    if (!stripe) {
      console.error("Stripe.js didn't load correctly.");
      return;
    }

    if (sessionId) {
      try {
        const { error } = await stripe.redirectToCheckout({ sessionId });

        if (error) {
          console.error("Error redirecting to checkout:", error.message);
        }
      } catch (err) {
        console.error("Error with redirecting to checkout:", err);
      }
    } else {
      console.error("Session ID is not valid.");
    }
  }

  return (
    <main className="flex justify-center">
      <div className="w-[1200px] flex m-8 gap-10">
        {!isLoading ? (
          <div className="flex flex-col w-full">
            <h1 className="text-center mb-4 font-bold text-lg tracking-wider">
              YOUR BAG (2 ITEMS)
            </h1>
            <div className="w-full">
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
                  {cartData &&
                    cartData.map((item, index) => (
                      <tr key={index}>
                        <CartItem
                          productID={item.product_id}
                          quantity={item.quantity}
                        />
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className="w-full mt-5">
              <div className="flex flex-col items-end">
                <div className="w-[200px] md:w-[400px]">
                  <div className="flex justify-between mb-4">
                    <div className="font-bold">Subtotal:</div>
                    <div>{totalPrice}</div>
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={handleBuy}
                      className="border border-[#1B4A8E] px-4 py-2 rounded-sm text-[#1B4A8E] dark:text-white dark:hover:bg-slate-900 hover:bg-[#1B4A8E] hover:text-white"
                    >
                      GO TO CHECKOUT
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col w-full items-center justify-center">
            <LoadingSpinner />
          </div>
        )}
      </div>
    </main>
  );
}

export default Cart;
