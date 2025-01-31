"use client";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { MdOutlineWatchLater } from "react-icons/md";
import { LuSquareParking } from "react-icons/lu";

const center = {
  lat: 41.7706,
  lng: 44.79319,
};

function Clubs() {
  return (
    <main className="flex justify-center">
      <div className="w-[1200px] flex mt-8 gap-10">
        <div className="w-full flex flex-col">
          <h1 className="text-[#1B4A8E] text-[3rem] font-bold">Clubs</h1>
          <p className="w-[60%] text-[20px]">
            FitLab is the biggest sports clubs chain in Georgia; it operates 5
            clubs in Georgia, including 3 clubs in capital Tbilisi. Spacious
            training halls, well equipped gyms, always new and versatile
            training programs, and our best trainers await you in all of our
            clubs. Pick the club you like and start training already today!
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 my-8">
            <div className="bg-[#fafafa] text-[#1B4A8E] font-bold text-lg cursor-pointer hover:bg-[#1B4A8E] hover:text-white flex justify-center text-center p-[2rem]">
              Guramishvili
            </div>
            <div className="bg-[#fafafa] text-[#1B4A8E] font-bold text-lg cursor-pointer hover:bg-[#1B4A8E] hover:text-white flex justify-center text-center p-[2rem]">
              Saburtalo
            </div>
            <div className="bg-[#fafafa] text-[#1B4A8E] font-bold text-lg cursor-pointer hover:bg-[#1B4A8E] hover:text-white flex justify-center text-center p-[2rem]">
              Marjanishvili
            </div>
            <div className="bg-[#fafafa] text-[#1B4A8E] font-bold text-lg cursor-pointer hover:bg-[#1B4A8E] hover:text-white flex justify-center text-center p-[2rem]">
              Kutaisi
            </div>
            <div className="bg-[#fafafa] text-[#1B4A8E] font-bold text-lg cursor-pointer hover:bg-[#1B4A8E] hover:text-white flex justify-center text-center p-[2rem]">
              Batumi
            </div>
          </div>

          <div className="grid grid-cols-5">
            <div className="col-span-2">
              <div className="flex flex-col gap-4 bg-black opacity-90 text-white text-[17px] h-full p-6">
                <div>
                  <h3>FitLab Guramishvili</h3>
                  <h3>Guramishvili Ave 25, Tbilisi</h3>
                </div>
                <div>
                  <h3>Telephone number +995 322 12 12 12</h3>
                  <h3>contact@fitlab.ge</h3>
                </div>
                <div className="flex gap-4">
                  <div className="text-7xl">
                    <MdOutlineWatchLater />
                  </div>
                  <div>
                    <div>Mon-Thu 6.30-22.00</div>
                    <div>Fri 6.30-21.00</div>
                    <div>Sat, Sun 9.00-21.00</div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-7xl">
                    <LuSquareParking />
                  </div>
                  <div className="flex items-center">Free parking</div>
                </div>
              </div>
            </div>
            <div className="col-span-3">
              <LoadScript
                googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
              >
                <GoogleMap
                  mapContainerStyle={{
                    width: "100%",
                    height: "400px",
                  }}
                  center={center}
                  zoom={15}
                >
                  <Marker position={center} />
                </GoogleMap>
              </LoadScript>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Clubs;
