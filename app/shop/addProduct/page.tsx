"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import {
  AddProductToStripe,
  AddPrPriceToStripe,
} from "@/actions/stripeActions";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import { useRouter } from "next/navigation";

function page() {
  const [isLoading, setIsLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [titleGEO, setTitleGEO] = useState("");
  const [brand, setBrand] = useState("");
  const [weight, setWeight] = useState("");
  const [availability, setAvailability] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const router = useRouter();

  const handleFileChange = async (e) => {
    const file = e?.target?.files[0];
    if (file) {
      setImageFile(file);
    }
    return;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
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

    // Uploading picture
    if (imageFile) {
      const { data: dataUpload, error: errorUpload } = await supabase.storage
        .from("fitlab_pictures")
        .upload(`product_images/${imageFile?.name}`, imageFile);
    }

    const { data: dataStorage } = await supabase.storage
      .from("fitlab_pictures")
      .getPublicUrl(`product_images/${imageFile?.name}`);

    //Creating Product In Stripe
    const productStripe = await AddProductToStripe(title);

    if (!productStripe) {
      console.error(error);
      return;
    }

    //Creating Price In Stripe
    const priceStripe = await AddPrPriceToStripe(
      productStripe.productID,
      Number(price)
    );

    //Sending Stripe Product and Price IDs to supabase
    const { data: dataUpdate, error: errorUpdate } = await supabase
      .from("products")
      .update({
        stripe_productID: priceStripe?.productID,
        stripe_priceID: priceStripe?.priceID,
        picture: dataStorage?.publicUrl,
      })
      .eq("id", data[0]?.id);

    router.push(`/shop/${data[0]?.id}`);
  };

  return (
    <main className="flex justify-center">
      <div className="w-[1200px] flex m-8 gap-10">
        <div className="flex flex-col w-full">
          <h1 className="text-3xl text-center">Add A Product</h1>
          <form
            className="mx-auto mt-3 w-[70%] flex flex-col gap-4 p-4"
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
            <label className="flex flex-col text-lg font-medium text-gray-700">
              Image:
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                data-cy="image"
                onChange={handleFileChange}
              />
            </label>
            <button
              className="mx-auto my-9 p-3 rounded-lg bg-[#1B4A8E] text-white border-2 border-slate-50 w-[40%]"
              type="submit"
            >
              CREATE
            </button>
          </form>
          {isLoading && (
            <div className="flex justify-center">
              <LoadingSpinner />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default page;
