import Image from "next/image";

function ProductCard({
  image,
  name,
  price,
}: {
  image: string;
  name: string;
  price: number;
}) {
  return (
    <>
      <div>
        <Image
          alt="Product"
          src={image ? image : "/placeholder.png"}
          width={200}
          height={300}
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="w-auto">{name}</div>
        <div className="text-blue-700">₾{price}</div>
      </div>
    </>
  );
}

export default ProductCard;
