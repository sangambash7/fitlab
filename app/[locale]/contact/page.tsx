"use client";
import { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (res.ok) {
        setStatus("Message sent successfully!");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        setStatus(result.error || "Failed to send message.");
      }
    } catch (error) {
      console.error(error);
      setStatus("Something went wrong.");
    }
  };
  return (
    <main className="flex justify-center dark:bg-black">
      <div className="w-[1200px] flex flex-col lg:flex-row mt-14 gap-10">
        <div className="">
          <h2 className="text-4xl text-[#1B4A8E] dark:text-white mb-3 text-center md:text-start">
            Contact us!
          </h2>
          <form
            className="flex flex-col justify-center items-center gap-5 w-full rounded-xl"
            onSubmit={handleSubmit}
          >
            <div className="flex gap-2 flex-col md:flex-row w-full">
              <div className="flex flex-col gap-2">
                <label htmlFor="email">Name:</label>
                <input
                  className="bg-slate-50 border dark:text-black"
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
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
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email">Phone:</label>
                <input
                  className="bg-slate-50 border dark:text-black"
                  id="phone"
                  name="phone"
                  type="text"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="email">Message:</label>
              <input
                className="bg-slate-50 border dark:text-black h-[100px]"
                id="message"
                name="message"
                type="text"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                required
              />
            </div>

            <div className="flex flex-col justify-start">
              <button className="bg-[#1B4A8E] text-white text-lg px-4 rounded-md">
                Send
              </button>
              {status && <p className="text-sm text-red-700">{status}</p>}
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
