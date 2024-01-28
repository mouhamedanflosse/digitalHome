'use client'
import { trpc } from "@/trpc/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface paymentProps {
  orderID: string;
  isPaid: Boolean;
  orderEmail: string;
}

export default function PaymentStatus({
  orderID,
  isPaid,
  orderEmail,
}: paymentProps) {
  const router = useRouter()
  const { data } = trpc.payment.getOrderStatus.useQuery(
    { orderID },
    {
      enabled: isPaid === false,
      refetchInterval: (data) => (data?.isPaid ? false : 1000),
    }
  );

  useEffect(() => {
    if (data?.isPaid) router.refresh()
  }, [data?.isPaid,router])

  return (
    <div className="grid grid-cols-2  justify-between gap-x-8 mt-4">
      <div className="flex flex-col gap-y-1 text-sm text-gray-200">
        shopping To:
        <div className="h-5">
          <p className="text-sm font-semibold text-gray-50 text-ellipsis truncate line-clamp-1">
            {orderEmail}
            <span className="sm:hidden block">...</span>
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-y-1 text-sm text-gray-200">
        payment satust :
        <p className="text-sm font-semibold text-gray-50">
          {isPaid ? "payment is successful" : "Pending payment"}
        </p>
      </div>
    </div>
  );
}
