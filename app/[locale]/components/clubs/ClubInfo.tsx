"use client";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { MdOutlineWatchLater } from "react-icons/md";
import { LuSquareParking } from "react-icons/lu";
import { useTranslations } from "next-intl";

interface ClubInfoProps {
  club: {
    fullClubName: string;
    address: string;
    coord: { lat: number; lng: number };
    time1: string;
    time2: string;
    time3: string;
  };
}

function ClubInfo({ club }: ClubInfoProps) {
  const t = useTranslations("Clubs");

  return (
    <div className="grid grid-cols-5 gap-2 md:gap-0">
      <div className="col-span-5 md:col-span-2">
        <div className="flex flex-col gap-4 bg-black opacity-90 text-white text-[17px] h-full p-6">
          <div>
            <h3>{club.fullClubName}</h3>
            <h3>{club.address}</h3>
          </div>
          <div>
            <h3>{t("tel")} +995 322 12 12 12</h3>
            <h3>contact@fitlab.ge</h3>
          </div>
          <div className="flex gap-4">
            <div className="text-7xl">
              <MdOutlineWatchLater />
            </div>
            <div>
              <div>{club.time1}</div>
              <div>{club.time2}</div>
              <div>{club.time3}</div>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="text-7xl">
              <LuSquareParking />
            </div>
            <div className="flex items-center">{t("parking")}</div>
          </div>
        </div>
      </div>
      <div className="col-span-5 md:col-span-3">
        <LoadScript
          googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
        >
          <GoogleMap
            mapContainerStyle={{
              width: "100%",
              height: "400px",
            }}
            center={club.coord}
            zoom={15}
          >
            <Marker position={club.coord} />
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
}

export default ClubInfo;
