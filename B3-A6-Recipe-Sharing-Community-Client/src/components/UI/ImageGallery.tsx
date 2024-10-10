"use client";

import LightGallery from "lightgallery/react";

// import styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
// import plugins if you need
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import Link from "next/link";
import Image from "next/image";

const ImageGallery = ({ images }: { images: string[] }) => {
  return (
    <LightGallery
      elementClassNames={`grid ${
        images.length === 1 ? "grid-cols-1" : "grid-cols-2"
      } gap-2 place-items-center`}
      speed={500}
      plugins={[lgThumbnail, lgZoom]}
    >
      {images?.map((image, index) => (
        <Link
          href={image}
          key={image}
          className={`w-full ${
            images.length === 3 && index === 0 ? "col-span-2" : "col-span-1"
          }`}
        >
          <Image
            src={image}
            width={300}
            height={300}
            alt={`item-image-${index}`}
            className="w-full h-[400px] object-cover object-center"
          />
        </Link>
      ))}
    </LightGallery>
  );
};

export default ImageGallery;
