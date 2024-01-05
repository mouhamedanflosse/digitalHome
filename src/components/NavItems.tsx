"use client";

import { PRODUCT_CATEGORIES } from "@/config";
import { useRef, useState,useEffect } from "react";
import NavItem from "./NavItem";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";

export default function NavItems() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const navRef = useRef<HTMLDivElement | null>(null)
  useOnClickOutside(navRef, () => setActiveIndex(null))
  const isAnyOpen = activeIndex !== null;

  useEffect(() => {
    const handler = (e : KeyboardEvent) => {
      if (e.key === "Escape")
      setActiveIndex(null)
    }
    document.addEventListener("keydown",handler)
    return () => document.removeEventListener("keydown",handler)
  },[])

  return (
    <div className="flex gap-4 h-full" ref={navRef}>
      {PRODUCT_CATEGORIES.map((category, i) => {
        const handelOpen = () => {
          if (activeIndex === i) {
            setActiveIndex(null);
          } else {
            setActiveIndex(i);
          }
        }
        const isOpen = i === activeIndex;

        return (
          <NavItem
            key={category.value}
            isOpen={isOpen}
            handelOpen={handelOpen}
            category={category}
            isAnyOpen={isAnyOpen}
          />
        );
      })}
    </div>
  );
}
