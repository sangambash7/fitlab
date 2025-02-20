import { createClient } from "@/utils/supabase/server";
import { buyFromCart } from "@/actions/buyFromCart";
import CartClient from "../../components/shop/CartClient";
import CartItem from "../../components/shop/CartItem";
import BuyFromCartButton from "../../components/shop/BuyFromCartButton";

async function Cart() {
  const supabase = await createClient();

  const { data: cartData } = await supabase
    .from("cart")
    .select("id, product_id, quantity, price_id");

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

  console.log(productPrices);

  const totalPrice = productPrices.reduce((acc, price) => acc + price, 0);

  return (
    <main className="flex justify-center">
      <div className="w-[1200px] flex m-8 gap-10">
        <div className="flex flex-col w-full">
          <h1 className="text-center mb-4 font-bold text-lg tracking-wider">
            YOUR BAG
          </h1>
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
          <div className="w-full mt-5">
            <div className="flex flex-col items-end">
              <div className="w-[200px] md:w-[400px]">
                <div className="flex justify-between mb-4">
                  <div className="font-bold">Subtotal:</div>
                  <div>₾{totalPrice / 100}</div>
                </div>
                <div className="flex justify-end">
                  <BuyFromCartButton />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Cart;
