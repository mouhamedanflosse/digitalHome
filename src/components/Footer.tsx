"use client";
import { usePathname } from "next/navigation";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { icons } from "./icons";
import Link from "next/link";

export default function Footer() {
  const pathname = usePathname();
  const psthTominimize = ["/sign-in", "/sign-up", "verfiy-email"];

  return (
    <MaxWidthWrapper>
      <div className="">
        <div className="border-t border-opacity-60 border-gray-600 mt-10 mb-3 py-2">
          {psthTominimize.includes(pathname) ? null : (
            <div className="relative flex justify-center">
              <icons.logo className="h-12 w-auto" />
            </div>
          )}
          {psthTominimize.includes(pathname) ? null : (
            <div className=" relative bg-zinc-900 pb-3 mt-3 rounded-md flex items-center justify-center text-center ">
            <div className="flex-col mx-auto max-w-sm py-2 flex gap-y-2">
                <h2 className="text-white font font-semibold text-lg">Become a seller</h2>
                <p className="text-sm text-gray-200"> If you&apos;d like to sell high-quality
                    digital products, you can do so in
                    minutes. <Link href="/sign-in?as=seller" className="font-bold text-gray-200 hover:text-gray-50 transition relative">Get started <span className="text-xl p-0 absolute -mt-[4px] ml-1">&rarr;</span></Link></p>
                    
            </div>
            </div>
          )}
          <div className="py-3 mt-2 flex justify-between flex-wrap gap-y-2 items-center">
            <p className="text-sm mx-auto text-gray-300">&copy;{new Date().getFullYear()} All Rights Reserved</p>
            <ul className="flex mx-auto gap-1 divide-x-2 divide-opacity-40 text-sm text-gray-300 divide-gray-400 items-center">
                <li className="px-2">
                    <Link href="#">Terms</Link>
                </li>
                <li className="px-2">
                    <Link href="#">Privacy policy </Link>
                </li>
                <li className="px-2">
                    <Link href="#">cookies policy</Link>
                </li>
            </ul>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
