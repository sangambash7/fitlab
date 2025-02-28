import CartClient from "../../components/shop/CartClient";
import { createClient } from "@/utils/supabase/server";
import { getBySessionID } from "@/actions/stripeActions";

async function Cart({ searchParams }) {
  const supabase = await createClient();
  const { session_id } = await searchParams;

  // Check succesfull payment
  if (session_id) {
    const session = await getBySessionID(session_id);
    console.log("session", session, session?.payment_status);

    if (session?.payment_status === "paid") {
      await supabase
        .from("cart")
        .delete()
        .eq("user_id", (await supabase.auth.getUser()).data.user?.id);

      const { data, error } = await supabase
        .from("orders")
        .insert([
          {
            price_total: session.amount_total,
            session_id: session.id,
            delivery_address: session.customer_details?.address,
            contact_number: session.customer_details?.phone,
          },
        ])
        .select("*");

      console.log("data, error", data, error);
    }
  }

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
