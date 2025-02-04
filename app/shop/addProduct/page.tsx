"use client";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import {
  AddProductToStripe,
  AddPrPriceToStripe,
} from "@/actions/stripeActions";

function page() {
  const [title, setTitle] = useState("");
  const [titleGEO, setTitleGEO] = useState("");
  const [brand, setBrand] = useState("");
  const [weight, setWeight] = useState("");
  const [availability, setAvailability] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("products")
      .insert([
        {
          name: title,
          nameGEO: titleGEO,
          brand: brand,
          weight: weight,
          availability: availability,
          category: category,
          price: price,
        },
      ])
      .select("*");

    if (error) {
      console.log("error reaching the supabase database:", error);
      return;
    }

    const productStripe = await AddProductToStripe(title); //Creating Product In Stripe

    if (!productStripe) {
      console.error(error);
      return;
    }

    const priceStripe = await AddPrPriceToStripe(
      productStripe.productID,
      Number(price)
    ); //Creating Price In Stripe

    //Sending Stripe Product and Price IDs to supabase
    const { data: dataUpdate, error: errorUpdate } = await supabase
      .from("products")
      .update({
        stripe_productID: priceStripe?.productID,
        stripe_priceID: priceStripe?.priceID,
      })
      .eq("id", data[0]?.id);
  };

  return (
    <main className="flex justify-center">
      <div className="w-[1200px] flex m-8 gap-10">
        <div className="flex flex-col w-full">
          <h1 className="text-3xl text-center">Add A Product</h1>
          <form
            className="mx-auto my-3 w-[70%] flex flex-col gap-4 p-4"
            onSubmit={handleSubmit}
          >
            <label className="flex flex-col text-lg font-medium text-gray-700">
              Title:
              <input
                className="p-2 w-full rounded-lg border-2 border-black"
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <label className="flex flex-col text-lg font-medium text-gray-700">
              Title in Georgian:
              <input
                className="p-2 w-full rounded-lg border-2 border-black"
                type="text"
                required
                value={titleGEO}
                onChange={(e) => setTitleGEO(e.target.value)}
              />
            </label>
            <label className="flex flex-col text-lg font-medium text-gray-700">
              Brand:
              <input
                className="p-2 w-full rounded-lg border-2 border-black"
                type="text"
                required
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </label>
            <label className="flex flex-col text-lg font-medium text-gray-700">
              Availability:
              <input
                className="p-2 w-full rounded-lg border-2 border-black"
                type="text"
                required
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
              />
            </label>
            <label className="flex flex-col text-lg font-medium text-gray-700">
              Category:
              <input
                className="p-2 w-full rounded-lg border-2 border-black"
                type="text"
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </label>
            <label className="flex flex-col text-lg font-medium text-gray-700">
              Weight:
              <input
                className="p-2 w-full rounded-lg border-2 border-black"
                type="text"
                required
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </label>
            {/* <label className="flex flex-col text-lg font-medium text-gray-700">
              Upload Image:
              <input
                className="p-2 w-full rounded-lg border-2 border-black"
                type="text"
                required
                // value={price}
                // onChange={(e) => setPrice(e.target.value)}
              />
            </label> */}
            <label className="flex flex-col text-lg font-medium text-gray-700">
              Price (in ₾ currency):
              <input
                className="p-2 w-full rounded-lg border-2 border-black"
                type="text"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </label>
            <button
              className="mx-auto my-9 p-3 rounded-lg bg-[#1B4A8E] text-white border-2 border-slate-50 w-[40%]"
              type="submit"
            >
              CREATE
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default page;
