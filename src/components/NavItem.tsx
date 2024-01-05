import { type } from "os";
import { Button } from "./ui/button";
import { PRODUCT_CATEGORIES } from "@/config";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

type category = (typeof PRODUCT_CATEGORIES)[number];

interface navItemProps {
  category: category;
  handelOpen: () => void;
  isOpen: boolean;
  isAnyOpen: boolean;
}

export default function NavItem({
  category,
  handelOpen,
  isOpen,
  isAnyOpen,
}: navItemProps) {
  return (
    <div className="flex">
      <div className="relative flex items-center">
        <Button
          onClick={handelOpen}
          className="gap-1.5 text-white"
          variant={isOpen ? "secondary" : "ghost"}
        >
          {category.label}
          <ChevronDown
            className={cn("h-4 w-4 transition-all text-white", {
              "-rotate-180": isOpen,
            })}
          />
        </Button>
      </div>
      {isOpen ? (
        <div
          className={cn("absolute inset-x-0 top-full text-sm", {
            "": !isAnyOpen,
          })}
        >
          <div className="absolute inset-0 top-1/2 bg-black shadow" aria-hidden="true">
            <div className="relative bg-black">
              <div className="mx-auto max-w-7xl px-8">
                <div className="grid grid-cols-4 gap-x-8 gap-y-10 py-16">
                  <div className="col-span-4 col-start-1 grid grid-cols-3 gap-x-8 ">
                    {category.featured.map((item) => (
                      <div
                        key={item.name}
                        className="group relative text-base sm:text-sm "
                      >
                        <div className="relative aspect-video overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                          <Image
                          src={item.imageSrc}
                          alt = "product category image" 
                          fill
                          className="object-cover object-center"
                          priority={true}
                          /> 
                        </div>
                        <Link href={item.href} className="text-white font-bold ">{item.name}</Link>
                        {/* <p className="mt-1 text-white" aria-hidden="true">shop now</p> */}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
