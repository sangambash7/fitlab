import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createClient } from "@/utils/supabase/server";
import ProductCard from "../components/shop/ProductCard";
import { CiSearch } from "react-icons/ci";

async function Shop() {
  const supabase = await createClient();

  const { data, error } = await supabase.from("products").select("*");

  return (
    <main className="flex justify-center">
      <div className="w-[1200px] flex m-8 gap-10">
        {/* FILTERING */}
        <div className="flex flex-col my-1">
          {/* Categories */}
          <div>
            <h3>CATEGORY</h3>
            <ul className="mt-2">
              <li>
                <span className="inline-flex justify-center items-center mr-2 w-4 h-4 bg-transparent border-2 border-gray-500 rounded-[2px] cursor-pointer transition-all duration-200 ease-[cubic-bezier(.4,.0,.23,1)] focus:border-[#FFEB3B]"></span>
                Trainers
              </li>
              <li>
                <span className="inline-flex justify-center items-center mr-2 w-4 h-4 bg-transparent border-2 border-gray-500 rounded-[2px] cursor-pointer transition-all duration-200 ease-[cubic-bezier(.4,.0,.23,1)] focus:border-[#FFEB3B]"></span>
                Balls
              </li>
              <li>
                <span className="inline-flex justify-center items-center mr-2 w-4 h-4 bg-transparent border-2 border-gray-500 rounded-[2px] cursor-pointer transition-all duration-200 ease-[cubic-bezier(.4,.0,.23,1)] focus:border-[#FFEB3B]"></span>
                Strength Training
              </li>
              <li>
                <span className="inline-flex justify-center items-center mr-2 w-4 h-4 bg-transparent border-2 border-gray-500 rounded-[2px] cursor-pointer transition-all duration-200 ease-[cubic-bezier(.4,.0,.23,1)] focus:border-[#FFEB3B]"></span>
                Gymnastics
              </li>
              <li>
                <span className="inline-flex justify-center items-center mr-2 w-4 h-4 bg-transparent border-2 border-gray-500 rounded-[2px] cursor-pointer transition-all duration-200 ease-[cubic-bezier(.4,.0,.23,1)] focus:border-[#FFEB3B]"></span>
                Boxing Equipments
              </li>
              <li>
                <span className="inline-flex justify-center items-center mr-2 w-4 h-4 bg-transparent border-2 border-gray-500 rounded-[2px] cursor-pointer transition-all duration-200 ease-[cubic-bezier(.4,.0,.23,1)] focus:border-[#FFEB3B]"></span>
                Sports Watches
              </li>
              <li>
                <span className="inline-flex justify-center items-center mr-2 w-4 h-4 bg-transparent border-2 border-gray-500 rounded-[2px] cursor-pointer transition-all duration-200 ease-[cubic-bezier(.4,.0,.23,1)] focus:border-[#FFEB3B]"></span>
                Clothes
              </li>
            </ul>
          </div>
          {/* Breakpoint */}
          <hr />
          {/* Price Range */}
          <div className="my-2">
            <h3>PRICE RANGE</h3>
            {/* აქ უნდა იყოს ფასის სლაიდერი */}
            <div className="my-2 rounded-md flex gap-3">
              <input
                type="number"
                className="w-24  border border-gray-400"
                placeholder="Min price"
              />
              <input
                type="number"
                className="w-24  border border-gray-400"
                placeholder="Max price"
              />
            </div>
            <ul>
              <RadioGroup defaultValue="option-one">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-one" id="option-one" />
                  <Label htmlFor="option-one" className="font-normal">
                    All Price
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-two" id="option-two" />
                  <Label htmlFor="option-two" className="font-normal">
                    Under $20
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-three" id="option-two" />
                  <Label htmlFor="option-two" className="font-normal">
                    $25 to $100
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-four" id="option-two" />
                  <Label htmlFor="option-two" className="font-normal">
                    $100 to $300
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-five" id="option-two" />
                  <Label htmlFor="option-two" className="font-normal">
                    $300 to $500
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-six" id="option-two" />
                  <Label htmlFor="option-two" className="font-normal">
                    $500 to $1000
                  </Label>
                </div>
              </RadioGroup>
            </ul>
          </div>
        </div>
        {/* PRODUCTS */}
        <div className="flex flex-col">
          {/* Searching AND Sorting */}
          <div className="flex justify-between gap-12">
            <div className="flex items-center">
              <input
                placeholder="Search for anything..."
                className="sm:w-[250px] p-2 border"
              ></input>
              <button className="text-lg">
                <CiSearch />
              </button>
            </div>
            <div className="flex items-center gap-2">
              Sort By:
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Newly Listed" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">Newly Listed</SelectItem>
                  <SelectItem value="asc">Lowest Price First</SelectItem>
                  <SelectItem value="desc">Highest Price First</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {/* Actual Products */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 sm:gap-4">
            {data &&
              data?.map((product, index) => (
                <div
                  key={index}
                  className="border rounded-md flex flex-col justify-between p-2"
                >
                  <ProductCard
                    id={product.id}
                    name={product.name}
                    image={product.picture}
                    price={product.price}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Shop;
