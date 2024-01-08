"use client";

import { Product } from "../payload-types";
import { TQueryValidator } from "../lib/validators/query-validator";
import { trpc } from "@/trpc/client";
import Link from "next/link";
import ProductListing from "./ProductListing";

interface productProps {
  title: string;
  subTitle?: string;
  herf?: string;
  query: TQueryValidator;
}

export default function Product(props: productProps) {
  const { title, subTitle, herf, query } = props;

  const FALLBACK_LIMIT = 4;

  const { data: QueryResult, isLoading } = trpc.getProducts.useInfiniteQuery(
    {
      limit: query.limit ?? FALLBACK_LIMIT,
      query,
    },
    {
      getNextPageParam: (page) => page.nextPage,
    }
  );
  const products = QueryResult?.pages.flatMap((page) => page.item);

  let prods: (Product | null)[] = []

  if (products && products.length) {
    prods = products;
  } else if (isLoading) {
    prods = new Array<null>(query.limit ?? FALLBACK_LIMIT).fill(null)
  }
  return (
    <section className="py-12">
      <div className="md:flex md:items-center md:justify-between mb-4">
        <div className="max-w-2xl px-4 lg:max-w-4xl lg:px-0">
          {title ? (
            <h1 className="font-bold text-2xl text-gray-300 sm:text-3xl">
              {title}
            </h1>
          ) : null}
          {subTitle ? (
            <p className="text-sm mt-2 text-muted-foreground">{subTitle}</p>
          ) : null}
        </div>
        {herf ? (
          <Link
            className="hidden md:block font-medium hover:text-gray-200 transition-all text-sm text-gray-400"
            href={herf}
          >
            Get the hole collection
            <span className="ml-2 text-[18px]" aria-hidden="true">
              &rarr;
            </span>
          </Link>
        ) : null}
      </div>
      <div className="relative">
        <div className="flex items-center mt-6">
          <div className="grid w-full px-3 grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-6 lg:gap-x-8">
          {prods.map((prod,i) => {
           return <ProductListing key={`product-${i}`} product={prod} index={i}/>
          })}
          </div>
        </div>
      </div>
    </section>
  );
}
