"use client";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

function Contact() {
  return (
    <main className="flex justify-center dark:bg-black">
      <div className="w-[1200px] flex flex-col lg:flex-row mt-14 gap-10">
        <div>
          <h2 className="text-4xl text-[#1B4A8E] dark:text-white mb-3">
            Contact us!
          </h2>
          <form
            className="flex flex-col justify-center items-center gap-5 w-full rounded-xl"
            // onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex gap-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="email">Name:</label>
                <input
                  className="bg-slate-50 border dark:text-black"
                  id="email"
                  name="email"
                  type="email"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email">Email:</label>
                <input
                  className="bg-slate-50 border dark:text-black"
                  id="email"
                  name="email"
                  type="email"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email">Phone:</label>
                <input
                  className="bg-slate-50 border dark:text-black"
                  id="email"
                  name="email"
                  type="email"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 w-[620px] lg:w-full">
              <label htmlFor="email">Name:</label>
              <input
                className="bg-slate-50 border dark:text-black h-[100px]"
                id="email"
                name="email"
                type="email"
                required
              />
            </div>

            <div className="flex justify-start">
              <button className="bg-[#1B4A8E] text-white text-lg px-4 rounded-md">
                Send
              </button>
            </div>
          </form>
        </div>
        <div className="w-full">
          <LoadScript
            googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
          >
            <GoogleMap
              mapContainerStyle={{
                width: "100%",
                height: "400px",
              }}
              center={{
                lat: 41.7706,
                lng: 44.79319,
              }}
              zoom={15}
            >
              <Marker
                position={{
                  lat: 41.7706,
                  lng: 44.79319,
                }}
              />
            </GoogleMap>
          </LoadScript>
        </div>
      </div>
    </main>
  );
}

export default Contact;
