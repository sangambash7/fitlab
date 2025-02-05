"use server";

import Image from "next/image";
import { createClient } from "@/utils/supabase/server";
import getStripe from "@/utils/get-stripejs";
import { getBySessionID } from "@/actions/stripeActions";
import ProductClient from "@/app/components/shop/ProductClient";

async function ProductPage({ params, searchParams }) {
  const supabase = await createClient();
  const { productID } = await params;
  const { session_id } = await searchParams;

  const { data: user } = await supabase.auth.getUser();
  console.log(user);

  // Check succesfull payment
  if (session_id) {
    const session = await getBySessionID(session_id);
    console.log("session", session, session?.payment_status);

    if (session?.payment_status) {
      const { data, error } = await supabase
        .from("orders")
        .insert([{ price_total: session.amount_total, product_id: productID }])
        .select("*");

      console.log("data, error", data, error);
    }
  }

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", productID);

  if (error) {
    console.log(error);
    return;
  }

  const product = data[0];

  console.log(product);

  return (
    <main className="flex justify-center">
      <div className="w-[1200px] flex m-8 gap-10">
        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-2">
            <div className="border border-gray-300 p-5 shadow-sm">
              <Image
                alt="Product"
                src={`${product.picture || "/placeholder.png"}`}
                width={500}
                height={500}
              />
            </div>
          </div>
          <div className="col-span-3 ">
            <h1 className="text-2xl">{product.name}</h1>
            <div className="w-[500px] my-6">
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <div>
                    <span className="text-gray-600 dark:text-white">
                      Brand:
                    </span>{" "}
                    <span className="font-bold">{product.brand}</span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-white">
                      Weight:
                    </span>{" "}
                    <span className="font-bold">{product.weight} KG</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div>
                    <span className="text-gray-600 dark:text-white">
                      Availability:
                    </span>{" "}
                    <span className="font-bold">
                      {product.availability > 0
                        ? `In Stock (${product.availability})`
                        : "Not Available"}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-white">
                      Category:
                    </span>{" "}
                    <span className="font-bold">{product.category}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-4xl text-[#1B4A8E] dark:text-white">
              ₾{product.price / 100}
            </div>
            <hr className="my-6"></hr>
            <ProductClient
              productID={product.id}
              priceID={product.stripe_priceID}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProductPage;
