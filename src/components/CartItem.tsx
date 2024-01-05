import {  ImageIcon, X } from "lucide-react";
import { Product } from "../payload-types";
import Image from "next/image";
import { PRODUCT_CATEGORIES } from "@/config";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/hooks/use-cart";

export default function CartItem({ product }: { product: Product }) {
  const { image } = product.images[0];

  const label = PRODUCT_CATEGORIES.find(
    ({ value }) => value === product.category
  )?.label;

  const { removeItem } = useCart();

  return (
    <div className="py-2">
      <div className="flex items-start justify-between gap-4">
        <div className="flex space-x-4">
          <div className="relative w-16 h-16 aspect-square min-w-fit overflow-hidden rounded">
            {typeof image !== "string" && image.url ? (
              <Image
                fill
                alt={product.name}
                src={image.url}
                className="absolute object-cover"
              />
            ) : (
              <div className="flex items-center justify-center">
                <ImageIcon className="h-4 w-4 " aria-hidden="true" />
              </div>
            )}
          </div>
          <div className="flex flex-col justify-between self-start'">
            <div className="flex flex-col space-y-1">
              <div className="h-6">
                <h3 className="text-gray-200 text-sm pt-0 text-ellipsis line-clamp-1">
                  {product.name}
                </h3>
              </div>
              <span className="text-gray-300 text-xs">{label}</span>
            </div>
            <button onClick={() => removeItem(product.id)} className="flex gap-0.5 items-center text-xs transition text-gray-200 hover:text-red-500 cursor-pointer">
            <X className="w-3 h-4 mt-0.5" /> 
            remove
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center text-white font-semibold">
          <span className="">{formatPrice(product.price)}</span>
        </div>
      </div>
    </div>
  );
}
