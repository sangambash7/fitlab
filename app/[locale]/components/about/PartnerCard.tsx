import Image from "next/image";
import Link from "next/link";

interface PartnerCardProps {
  image: string;
  company: string;
  caption: string;
  url: string;
  urlLabel: string;
}

function PartnerCard({
  image,
  company,
  caption,
  url,
  urlLabel,
}: PartnerCardProps) {
  return (
    <div className="col-span-3 lg:col-span-1 flex flex-col items-center border-2 border-w py-8  justify-between">
      <div className="dark:bg-white">
        <Image src={`${image}`} alt={`${company}`} width={150} height={120} />
      </div>
      <div className="font-bold text-[24px]">{company}</div>
      <div>{caption}</div>
      <div className="text-red-700">
        <Link href={`${url}`} target="_blank">
          {urlLabel}
        </Link>
      </div>
    </div>
  );
}

export default PartnerCard;
