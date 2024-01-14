import Image from "next/image";
import { getUser } from "@/lib/payload-utils";
import { cookies } from "next/headers";
import { getPayloadClient } from "@/get-payload";
import { notFound, redirect } from "next/navigation";
import { PRODUCT_CATEGORIES } from "@/config";
import { Product, ProductFile, User } from "@/payload-types";
import { formatPrice } from "@/lib/utils";
import PaymentStatus from "@/components/paymentStatus";
import Link from "next/link";

interface ThankUpageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export default async function ThankUpage({ searchParams }: ThankUpageProps) {
  const orderID = searchParams.orderID;
  const nexCookie = cookies();
  const user = await getUser(nexCookie);

  const payload = await getPayloadClient();

  const { docs: orders } = await payload.find({
    collection: "order",
    depth: 2,
    where: {
      id: {
        equals: orderID,
      },
    },
  });

  const [order] = orders;

  if (!order) notFound();

  const orderOwner =
    typeof order.user === "string" ? order.user : order.user.id;

  if (orderOwner !== user?.id) {
    redirect(`/sign-in?origin=thank-you?orderID=${orderID}`);
  }

  const subtotal = (order.products as Product[]).reduce(
    (total, { price }) => total + price,
    0
  );
  const fee = 1;
  return (
    <div className="min-h-full mx-auto w-fit relative ">
      <div className="hidden lg:absolute overflow-hidden lg:block lg:pr-4 h-80 lg:w-1/2 lg:h-full">
        <Image
          src="/checkout-thank-you.jpg"
          fill
          alt="thank you for your order"
          className="object-cover  object-center h-full w-full"
        />
      </div>
      <div className="mx-auto max-w-2xl px-4  sm:px-6 sm:grid sm:grid-cols-2 lg:max-w-7xl lg:gap-x-8 lg:px-8 xl:gap-x-24">
        <div className="flex-col lg:col-start-2 flex py-2 px-4 sm:px-6 sm:py-8 ">
          <div className="flex flex-col gap-y-2">
            <p className="font-semibold text-blue-200 ">Order Successful !</p>
            <h1 className="text-2xl">Thank you for ordering</h1>
            {order._isPaid ? (
              <p className="text-sm text-gray-300">
                {" "}
                Your order was processed and your assets are available to
                download below. We&apos;ve sent your receipt and order details
                to
                {order.user ? <span className="font-semibold">
                  {typeof order.user !== "string"
                    ? order.user.email
                    : "your email"}
                </span> : null}
              </p>
            ) : (
              <p className="text-sm text-gray-300">
                We appreciate your order, and we&apos;re currently processing
                it. So hang tight and we&apos;ll send you confirmation very
                soon!
              </p>
            )}
            <div className="mt-3">
              <p className="text-gray-100 text-lg">order Nr :</p>
              <div className="font-bold text-sm">{order.id}</div>
            </div>
            <ul className="divide-y-2 divide-gray-400 mt-6">
              {(order.products as Product[]).map((prd, i) => {
                const label = PRODUCT_CATEGORIES.find(
                  ({ value }) => value === prd.category
                )?.label;

                const downloadUrl = (prd.product_files as ProductFile)
                  .url as string;

                const url = prd.images
                  .map(({ image }) =>
                    typeof image === "string" ? image : image.url
                  )
                  .filter(Boolean) as string[];

                return (
                  <li key={i}>
                    <div className="flex space-x-3">
                      <div className="relative w-24 h-24">
                        <Image
                          src={url[0]}
                          fill
                          className="object-cover object-center w-full h-full rounded-md"
                          alt={prd.name}
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <p className="line-clamp-1 text-ellipsis font-semibold text-sm">
                          {prd.name}
                        </p>
                        <p className="text-xs text-gray-300">
                          category : {label}
                        </p>
                        { order._isPaid ?<a
                            href={downloadUrl}
                            className="mt-6 text-[13px] text-blue-300 hover:text-blue-200 hover:underline duration-300"
                            download={prd.name}
                          >
                            Download asset
                          </a> : null }
                      </div>
                      <p className="text-sm font-bold pl-8">
                        {formatPrice(prd.price)}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
            <ul className="flex mt-4 gap-y-4 flex-col ">
              <li className="flex items-center justify-between ">
                <p className="text-sm text-gray-300">subtotal</p>
                <span className="font-bold text-sm">
                  {formatPrice(subtotal)}
                </span>
              </li>
              <li className="flex pt-1 items-center justify-between ">
                <p className="text-sm text-gray-300">Transuction Fee</p>
                <span className="font-bold text-sm">{formatPrice(fee)}</span>
              </li>
              <li className="flex pt-3 border-t-2 border-gray-400 items-center justify-between ">
                <p className="text-sm font-semibold text-gray-200">Total</p>
                <span className="font-bold text-sm">
                  {formatPrice(fee + subtotal)}
                </span>
              </li>
            </ul>
            <PaymentStatus
              orderID={order.id}
              isPaid={order._isPaid}
              orderEmail={(order.user as User).email}
            />
            <div className="mt-6 text-right gap-x-3 text-xs  text-blue-400">
              <Link
                href="/products"
                className="text-sm font-medium flex items-center justify-end gap-0.5 text-blue-600 hover:text-blue-500"
              >
                Continue shopping <span className="text-[22px]">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
