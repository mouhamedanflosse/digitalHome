"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PRODUCT_CATEGORIES } from "@/config";
import { Menu } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function NavMobile() {
  const router = useRouter();

  const goToCategory = (herf: string) => {
    router.push(herf);
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="lg:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetTrigger asChild>
          <div className="flex flex-col gap-9">
            {PRODUCT_CATEGORIES.map((cat, i) => {
              return (
                <div key={i}>
                  <h2 className="font-semibold mb-3">{cat.label}</h2>
                  <div key={cat.value} className="grid grid-cols-2 gap-3">
                    {cat.featured.map((item, i) => {
                      return (
                        <div
                          key={item.name}
                          onClick={() => goToCategory(item.href)}
                          className="group relative text-base sm:text-sm "
                        >
                          <div className="relative  flex justify-center items-center aspect-video overflow-hidden rounded-lg">
                            <Image
                              src={item.imageSrc}
                              alt="product category image"
                              fill
                              className="object-cover bg-gray-100 group-hover:opacity-75 absolute object-center"
                              priority={true}
                            />
                          </div>
                          <p className="text-white text-sm ">{item.name}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </SheetTrigger>
      </SheetContent>
    </Sheet>
  );
}
