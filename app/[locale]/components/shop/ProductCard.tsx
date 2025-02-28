import Link from "next/link";

function ProductCard({
  id,
  image,
  name,
  price,
}: {
  id: number;
  image: string;
  name: string;
  price: number;
}) {
  return (
    <>
      <Link href={`shop/${id}`}>
        <div>
          <img
            width={200}
            height={300}
            src={image ? image : "/placeholder.png"}
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="w-auto">{name}</div>
          <div className="text-blue-700">₾{price}</div>
        </div>
      </Link>
    </>
  );
}

export default ProductCard;
