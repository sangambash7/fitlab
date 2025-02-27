import CartClient from "../../components/shop/CartClient";

async function Cart() {
  return (
    <main className="flex justify-center">
      <div className="w-[1200px] flex m-8 gap-10">
        <div className="flex flex-col w-full">
          <CartClient />
        </div>
      </div>
    </main>
  );
}

export default Cart;
