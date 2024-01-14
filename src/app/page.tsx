import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import Product from "@/components/Product";
import { OurQualityPromise } from "@/components/OurQualityPromise";
import Link from "next/link";

export default function Home() {
  return (
    <MaxWidthWrapper>
      <div className="flex text-white flex-col items-center py-20 mx-auto max-w-3xl">
        <h1 className="font-bold text-center text-5xl sm:text-7xl relative">
          DigitalHome
          <span className="text-blue-600 text-8xl p-0 absolute -bottom-1.5 sm:bottom-0">
            .
          </span>
        </h1>
        <p className="mt-3 text-gray-400 text-center text-[19px]">
          Marketplace{" "}
          <span className="text-blue-400 text-xl font-semibold"></span>for high
          Quality{" "}
          <span className="text-blue-400 text-xl font-semibold">
            Digital Assets
          </span>
        </p>
        <p className="text-[15px] text-center max-w-prose  text-[#ccc] mt-3 ">
          Welcome to digitalHome. Every asset on our platform is verified by our
          team to ensure our highest quality standards
        </p>
        <div className="flex mx-auto  gap-4 mt-6 flex-col sm:flex-row">
          <Button className="py-0" ><Link href="/products">Browse Trending</Link></Button>
          <OurQualityPromise />
        </div>
      </div>
      <Product query={{limit : 4,sort : "desc"}} title="Brand new" herf="/products" />
    </MaxWidthWrapper>
  );
}
