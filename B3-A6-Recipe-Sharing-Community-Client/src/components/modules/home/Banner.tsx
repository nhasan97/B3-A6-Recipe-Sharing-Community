import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import "../../../styles/carousel.css";
import { Image } from "@nextui-org/image";

const Banner = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 2000 }),
  ]);

  return (
    <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-6 bg-red-700 p-5 rounded-lg">
      <div className="w-full lg:w-[55%] flex flex-col items-center lg:items-start justify-center text-center lg:text-left gap-6">
        <p className="text-lg lg:text-xl text-white">Welcom to</p>
        <h1 className="glowing-text text-4xl xl:text-7xl font-bold">
          Taste Tribe
        </h1>
        <p className="text-sm lg:text-base text-white">
          Where Every Dish Tells a Story – Share, Discover, and Savor!
        </p>
      </div>

      <div className="w-full lg:w-[45%] md:bg-gradient-to-r from-red-800 via-red-700  to-red-800 py-1 border-x">
        <div className="embla" ref={emblaRef}>
          <div className="embla__container">
            <div className="embla__slide">
              <Image
                alt="NextUI hero Image"
                src={"/assets/images/BannerSlider/slider1.jpg"}
                className="size-[200px] object-cover object-center mx-auto"
              />
            </div>
            <div className="embla__slide">
              <Image
                alt="NextUI hero Image"
                src={"/assets/images/BannerSlider/slider2.webp"}
                className="size-[200px] object-cover object-center mx-auto"
              />
            </div>
            <div className="embla__slide">
              <Image
                alt="NextUI hero Image"
                src={"/assets/images/BannerSlider/slider3.webp"}
                className="size-[200px] object-cover object-center mx-auto"
              />
            </div>
            <div className="embla__slide">
              <Image
                alt="NextUI hero Image"
                src={"/assets/images/BannerSlider/slider4.jpg"}
                className="size-[200px] object-cover object-center mx-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
