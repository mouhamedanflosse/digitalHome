import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { PRODUCT_CATEGORIES } from "@/config";
import Product from "@/components/Product";
type params = string | string[] | undefined;

interface ProductsPageProps {
    searchParams: {
    [key: string]: params;
  };
}

const parse = (params: params) => {
  return typeof params === "string" ? params : undefined;
};

export default function ProductsPage({ searchParams }: ProductsPageProps) {
  const sort = parse(searchParams.sort);
  const category = parse(searchParams.category);

  const label = PRODUCT_CATEGORIES.find(
    ({ value }) => value === category
  )?.label;

  return (
    <MaxWidthWrapper>
      <Product
        title={label || "browse high-quality assets"}
        query={{
          category,
          limit: 40,
          sort: sort === "desc" || sort === "asc" ? sort : undefined,
        }}
      />
    </MaxWidthWrapper>
  );
}
