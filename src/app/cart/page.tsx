"use client";
import { Button } from "@/components/ui/button";
import { PRODUCT_CATEGORIES } from "@/config";
import { useCart } from "@/hooks/use-cart";
import { cn, formatPrice } from "@/lib/utils";
import { Check, Loader2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { trpc } from "@/trpc/client";
import { useRouter } from "next/navigation";

export default function Pags() {
  const [isMounted, setIsMounted] = useState<Boolean>(false);

  const router = useRouter()

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { mutate: createCheckoutSession, isLoading } =
    trpc.payment.createSession.useMutation({
      onSuccess: ({ url }) => {
        if (url) router.push(url);
      },
    });

  const { items, removeItem } = useCart();

  const prdIDs = items.map((item) => item.product.id);

  const subTotale = items.reduce(
    (total, { product }) => total + product.price,
    0
  );
  const fee = 1;
  return (
    <div className="mx-auto max-w-2xl pt-24 px-4 lg:max-w-7xl lg:px-8">
      <h1 className="font-bold text-gray-300 text-3xl sm:text-4xl">
        Shopping Cart ({isMounted && items.length})
      </h1>
      <div className="mt-12 lg:grid items-start mx-auto lg:grid-cols-12 lg:gap-12 xl:gap-16">
        <ScrollArea
          className={cn("lg:col-span-7 p-1 max-h-[350px] h-48 bg-[#06010d] mb-4", {
            "border-dashed border-2 bg-[#06010d] p-2 rounded-lg ":
              isMounted && items.length === 0,
          })}
        >
          <h2 className="sr-only">Items in your shopping cart</h2>
          {isMounted && items.length === 0 ? (
            <div className="flex flex-col item-center justify-center w-full h-[350px] space-y-1">
              <div className="relative mx-auto w-40 h-40">
                <Image
                  src="/hippo-empty-cart.png"
                  alt="empty Cart image"
                  fill
                  loading="eager"
                />
              </div>
              <h1 className="text-xl text-center text-white font-semibold">
                your cart is empty
              </h1>
              <p className="text-gray-300 text-center text-sm">
                Whoops! Nothing to show here yet.
              </p>
            </div>
          ) : null}
          <ul
            className={cn({
              "divide-y-2 divide-gray-400 ": isMounted && items.length > 0,
            })}
          >
            {isMounted &&
              items.map(({ product }, i) => {
                const { image } = product.images[0];

                const label = PRODUCT_CATEGORIES.find(
                  ({ value }) => value === product.category
                )?.label;
                return (
                  <li key={i} className="flex relative py-6 gap-x-3 sm:py-10">
                    <div className="flex-shrink-0 ">
                      <div className="relative h-24 gap-1 w-24">
                        {typeof image !== "string" && image.url ? (
                          <Image
                            src={image.url}
                            fill
                            alt={product.name}
                            className="w-full h-full object-cover sm:w-48 sm:h-48 rounded-md"
                          />
                        ) : null}
                      </div>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <Link
                        href={`/product/${product.id}`}
                        className="text-ellipsis line-clamp-1 pr-5 text-white hover:text-gray-200 transition hover:underline"
                      >
                        {product.name}
                      </Link>
                      <p className="text-gray-300 text-sm">{label}</p>
                      <p className="font-bold text-gray-200">
                        {formatPrice(product.price)}
                      </p>
                      <div className="flex items-center gap-1">
                        <Check
                          strokeWidth="4.5px"
                          className="text-green-500 w-4 font-bold "
                        />
                        <p className="text-gray-300 font-semibold text-xs">
                          Eligible For Instant Delivery
                        </p>
                      </div>
                    </div>
                    <div className="absolute top-6 right-1">
                      <Button
                        aria-label="remove product"
                        onClick={() => removeItem(product.id)}
                        className="p-1 h-6"
                      >
                        <X size="20px" className="" />
                      </Button>
                    </div>
                  </li>
                );
              })}
          </ul>
        </ScrollArea>
        <section className="flex flex-col gap-4 bg-[#29292a] rounded-lg py-6 px-4 sm:p-6 lg:p-8 lg:col-span-5 mt-10 lg:mt-0">
          <h2 className="font-semibold text-2xl text-gray-200">
            order summary
          </h2>
          <div className="flex flex-col space-y-5 divide-y divide-opacity-60 divide-gray-400">
            <div className="flex justify-between items-center">
              <span className="font-medium text-[17px] text-gray-300">
                SubTotal
              </span>
              <span className="font-bold text-gray-200">
                {isMounted ? (
                  formatPrice(subTotale)
                ) : (
                  <Loader2 className="w-4 h-4 animate-spin" />
                )}
              </span>
            </div>
            <div className="flex justify-between pt-4 items-center">
              <span className="font-medium text-[17px] text-gray-300">
                falt transaction Fees
              </span>
              <span className="font-bold text-gray-300">
                {formatPrice(fee)}
              </span>
            </div>
          </div>
          <div className="flex justify-between mt-2 pt-3 border-t-2 border-opacity-60 border-gray-400 items-center">
            <span className="font-semibold text-lg text-gray-200">
              Order Total
            </span>
            <span className="font-bold text-gray-200">
              {isMounted ? (
                formatPrice(subTotale + fee)
              ) : (
                <Loader2 className="w-4 h-4 animate-spin" />
              )}
            </span>
          </div>
          <div className="mt-6">
            <Button
              disabled={isMounted && items.length === 0 || isLoading}
              onClick={() => createCheckoutSession({ productIDs: prdIDs })}
              className="w-full text-lg font-semibold"
            >
              {isLoading ? (
                <Loader2 className="animate-spin w-5 h-4 mr-1.5" />
              ) : null}
              Checkout
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
