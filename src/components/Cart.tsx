"use client";
import { ShoppingCart } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import Image from "next/image";
import { useCart } from "@/hooks/use-cart";
import CartItem from "./CartItem";
import { useEffect, useState } from "react";
import { ScrollArea } from "./ui/scroll-area";

export default function Cart() {
  const [isMounted, setIsMounted] = useState<Boolean>(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { items } = useCart();

  const TotalPrice = items.reduce(
    (total, { product }) => total + product.price,
    0
  );
  const itemCount = items.length;
  const fee = 1;

  return (
    <div>
      <Sheet>
        <SheetTrigger className="flex items-center group p-2 -m-2">
          <ShoppingCart
            className="h-6 w-6 flex-shrink-0 group-hover:text-gray-100 transition-all text-gray-300"
            aria-hidden="true"
          />
          <span className="ml-2 font-medium text-gray-300 transition-all group-hover:text-gray-100">
            {isMounted ? itemCount : 0}
          </span>
        </SheetTrigger>
        <SheetContent className="flex w-full flex-col pr-0">
          <SheetHeader className="space-y-2.5 pr-6">
            <SheetTitle>{`Cart(${itemCount})`}</SheetTitle>
          </SheetHeader>
          {itemCount > 0 ? (
            <div>
              <div className="flex flex-col pr-6">
                <ScrollArea className="h-56 p-2.5">
                  {items.map(({ product }, i) => (
                    <CartItem key={i} product={product} />
                  ))}
                </ScrollArea>
              </div>
              <div className="space-y-4 pr-6 ">
                <div
                  aria-hidden="true"
                  className="h-px w-full bg-gray-300 opacity-70 "
                ></div>
                <div className="text-sm space-y-1.5">
                  <div className="flex">
                    <span className="flex-1">Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex">
                    <span className="flex-1">Transation Fees</span>
                    <span>{formatPrice(fee)}</span>
                  </div>
                  <div className="flex">
                    <span className="flex-1">Total price</span>
                    <span>{formatPrice(TotalPrice + fee)}</span>
                  </div>
                  <SheetFooter>
                    <SheetTrigger asChild>
                      <Link
                        href="/cart"
                        className={buttonVariants({
                          className: "w-full h-8 py-0",
                        })}
                      >
                        {" "}
                        continu to checkout
                      </Link>
                    </SheetTrigger>
                  </SheetFooter>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col h-full justify-center items-center ">
              <div aria-hidden="true" className="w-60 h-60 relative mb-2 ">
                <Image src="/panda-empty-cart.png" fill alt="empty Cart " />
              </div>
              <p className="font font-semibold text-white">
                your cart is empty
              </p>
              <SheetTrigger asChild>
                <Link
                  href="/products"
                  className="text-blue-600 mt-2 font-semibold transition-all text-sm hover:text-blue-400"
                >
                  add items to cart checkout
                </Link>
              </SheetTrigger>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
