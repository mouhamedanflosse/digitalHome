"use client";

import { useEffect, useState } from "react";
import { Product } from "../payload-types";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";
import { cn, formatPrice } from "@/lib/utils";
import { PRODUCT_CATEGORIES } from "../config/index";
import ImageSilder from "./ImageSilder";

interface props {
  product: Product | null;
  index: number;
}

export default function ProductListing({ product, index }: props) {
  const [isVisibale, setIsVisibale] = useState<boolean>(false);

  useEffect(() => {
    const Timer = setTimeout(() => {
      setIsVisibale(true);
    }, index * 75);
    return () => clearTimeout(Timer);
  }, [index]);

  const label = PRODUCT_CATEGORIES.find(
    ({ value }) => value === product?.category
  )?.label;

  if (!product || !isVisibale) {
    return <ProductListingHolder />;
  }

  const url = product.images.map(({image}) =>
    typeof image === "string" ? image : image.url
  ).filter(Boolean) as string[]

  if (product && isVisibale) {
    return (
      <Link
        href={`/product/${product.id}`}
        className={cn("cursor-pointer invisible w-full h-full", {
          "visible animate-out fade-in-5": isVisibale,
        })}
      >
        <div className="flex flex-col w-full ">
          <ImageSilder urls={url} />
          <h3 className="font-medium text-white ">{product.name}</h3>
          <p className="text-sm my-1 text-gray-300">{label}</p>
          <p className="font-semibold text-gray-200">
            {formatPrice(product.price)}
          </p>
        </div>
      </Link>
    );
  }
}

const ProductListingHolder = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="relative bg-zinc-100 aspect-square w-full overflow-hidden rounded-xl">
        <Skeleton className="h-full w-full" />
      </div>
      <div className="flex flex-col space-y-2 mt-3">
        <Skeleton className="w-2/3 h-4 rounded-lg" />
        <Skeleton className="w-16 h-4 rounded-lg" />
        <Skeleton className="w-10 h-4 rounded-lg" />
      </div>
    </div>
  );
};
