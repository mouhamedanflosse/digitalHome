import { Button } from "./ui/button";
import { PRODUCT_CATEGORIES } from "@/config";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";

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
  const router = useRouter()

  const goToCategory = (herf : string) => {
    handelOpen()
    router.push(herf)
  }
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
                        onClick={() => goToCategory(item.href)}
                        className="group relative text-base cursor-pointer sm:text-sm"
                      >
                        <div className="relative flex justify-center items-center aspect-video overflow-hidden rounded-lg">
                          <Image
                          src={item.imageSrc}
                          alt = "product category image" 
                          fill
                          className="object-cover bg-gray-100 group-hover:opacity-75 absolute object-center"
                          priority={true}
                          /> 
                         <p className="text-white inset-0 text-2xl z-10 opacity-0 transition group-hover:opacity-100 text-center">{item.name}</p>
                        </div>
                        <p className="text-white font-bold ">{item.name}</p>
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
