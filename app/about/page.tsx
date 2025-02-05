import Image from "next/image";

function page() {
  return (
    <main className="flex justify-center">
      <div className="w-[1200px] flex mt-8 gap-10">
        <div className="w-full grid grid-cols-5 gap-10">
          <div className="col-span-4 text-2xl">
            <h1 className="mb-6">Welcome To FitLab</h1>
            <div className="flex text-justify">
              At FitLab, we’re more than just a gym. We are a community of
              fitness enthusiasts, dedicated to helping you achieve your health
              and wellness goals. Whether you&apos;re a beginner or an
              experienced athlete, our state-of-the-art facilities cater to all
              your fitness needs. We offer flexible membership options tailored
              to fit your lifestyle, including access to top-tier gym equipment,
              personal training services, group fitness classes, and wellness
              programs. Our friendly and experienced team is here to provide the
              support you need to succeed in your fitness journey.
            </div>
          </div>
          <div className="col-span-1">
            <Image src={"/about.jpg"} width={300} height={300} alt="Gym" />
          </div>
        </div>
      </div>
    </main>
  );
}

export default page;
