import Image from "next/image";
import ProductClient from "@/app/components/shop/ProductClient";

async function ProductPage({ params }) {
  const { productID } = await params;

  console.log(productID);
  return (
    <main className="flex justify-center">
      <div className="w-[1200px] flex m-8 gap-10">
        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-2">
            <div className="border border-gray-300 p-5 shadow-sm">
              <Image
                alt="Product"
                src="/test-products/PRO_SIDE_AND_ABS_MACHINE.jpg"
                width={500}
                height={500}
              />
            </div>
          </div>
          <div className="col-span-3 ">
            <h1 className="text-2xl">Pro Side And ABS Machine</h1>
            <div className="w-[500px] my-6">
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <div>
                    <span className="text-gray-600">Brand:</span>{" "}
                    <span className="font-bold">Pro</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Weight:</span>{" "}
                    <span className="font-bold">156 KG</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div>
                    <span className="text-gray-600">Availability:</span>{" "}
                    <span className="font-bold">In Stock</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Category:</span>{" "}
                    <span className="font-bold">Strength Training</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-4xl text-[#1B4A8E]">₾650</div>
            <hr className="my-6"></hr>
            <ProductClient />
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProductPage;
