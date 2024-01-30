import ImageSilder from "@/components/ImageSilder";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { PRODUCT_CATEGORIES } from "@/config";
import { getPayloadClient } from "@/get-payload";
import { formatPrice } from "@/lib/utils";
import { Check, Shield } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Product from "@/components/Product";
import AddToCartButton from "@/components/AddToCartButton";

interface pageProps {
  params: {
    productID: string;
  };
}

const BREADCRUMBS = [
  { id: 1, label: "Home", herf: "/" },
  { id: 2, label: "Product", herf: "/product" },
];

export default async function page({ params }: pageProps) {
  const payload = await getPayloadClient();
  const { docs: products } = await payload.find({
    collection: "products",
    limit: 1,
    where: {
      id: {
        equals: params.productID,
      },
    },
  });
  
  const [product] = products;

  if (!product) return notFound();

  const label = PRODUCT_CATEGORIES.find(
    ({ value }) => value === product.category
  )?.label;

  const url = product.images.map(({image}) =>
  typeof image === "string" ? image : image?.url
).filter(Boolean).filter((url) => url?.startsWith("http")) as string[]

  return (
    <MaxWidthWrapper>
      <div>
        <div className="mx-auto px-4 py-16 sm:px-6 max-w-2xl sm:py-24 lg:grid lg:max-w-3xl lg:grid-cols-2 lg:gap-x-8">
          <div className="flex flex-col space-y-3 lg:max-w-lg lg:self-start">
            <ol className="flex gap-1 items-center">
              {BREADCRUMBS.map((breadcrumbs, i) => {
                return (
                  <div key={i} className="flex items-center text-sm">
                    <Link
                      href={breadcrumbs.herf}
                      className="text-gray-300 hover:text-gray-200 transition "
                    >
                      {breadcrumbs.label}
                    </Link>
                    {i !== BREADCRUMBS.length - 1 ? (
                      <svg
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                        className="ml-2 h-5 w-5 flex-shrink-0 text-gray-300"
                      >
                        <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                      </svg>
                    ) : null}
                  </div>
                );
              })}
            </ol>
            <div className="mt-4">
              <h1 className="font-semibold text-2xl">{product.name}</h1>
            </div>
            <section>
              <div className="flex text-gray-300 items-center text-sm gap-7">
                <p className="font-bold">{formatPrice(product.price)}</p>
                <div className="border-l border-gray-400 pl-3">{label}</div>
              </div>
              <div className="">
                <p className="text-gray-200 mt-2 font-medium ">
                  {product.description}
                </p>
              </div>
            </section>
            <div className="mt-6 flex items-center gap-1">
              <Check
                strokeWidth="4.5px"
                className="text-green-500 w-4 font-bold "
              />
              <p className="text-gray-300 font-semibold text-xs">
                Eligible For Instant Delivery
              </p>
            </div>
          </div>
          <div className="lg:col-start-2 mt-10 lg:row-span-2 lg:mt-0 lg:self-center">
            <div className="rounded-lg aspect-square">
              <ImageSilder urls={url} />
            </div>
          </div>
          <div className="lg:col-start-1 mt-10 lg:row-start-2 lg:max-w-lg lg:self-start">
            <div>
              <div><AddToCartButton product={product} /></div>
              <div className="mt-6 tetx-sm flex items-center gap-2 justify-center text-gray-300">
                <Shield />
                <span>30 Day Return Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Product herf={`/product/${product.id}`} subTitle={`browse similar hight-quality ${label}`} title={`similar ${label}`} query={{category : product.category,limit : 4, sort:"desc"}} />
    </MaxWidthWrapper>
  );
}
