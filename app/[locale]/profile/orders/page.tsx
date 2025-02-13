import { createClient } from "@/utils/supabase/server";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

async function Orders() {
  const supabase = await createClient();
  const { data: orders, error } = await supabase
    .from("orders")
    .select(
      "product_id, created_at, quantity, price_total, session_id, contact_number, delivery_address"
    );

  console.log(orders);

  return (
    <>
      <h1 className="text-3xl">Order History</h1>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Product ID</TableHead>
            <TableHead className="text-center">Order created</TableHead>
            <TableHead className="text-right">Total price </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders &&
            orders.map((order) => (
              <TableRow key={order.product_id}>
                <TableCell className="font-medium">
                  {order.product_id}
                </TableCell>
                <TableCell className="text-center">
                  {order.created_at.toLocaleString()}
                </TableCell>
                <TableCell className="text-right">
                  ₾{order.price_total}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
}

export default Orders;
