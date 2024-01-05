"use client";
import { trpc } from "@/trpc/client";
import { Loader2, XCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

interface props {
  token: string;
}

export default function Verifyemail({ token }: props) {
  const { data, isError, isLoading } = trpc.auth.verifyEmail.useQuery({
    token,
  });

  if (isError) {
    return (
      <div className="flex flex-col items-center gap-2">
        <XCircle className="text-red-500  h-8 w-8" />
        <h2 className="font-semibold ">there was a problem</h2>
        <p className="text-xs text-gray-300 font-semibold">
          token is not valid or might be expired please try agian
        </p>
      </div>
    );
  }
  if (data?.success) {
    return (
      <div>
        <div className="flex flex-col justify-center items-center space-y-1">
          <div className="w-60 relative h-60 mb-2 ">
            <Image src="/hippo-email-sent.png" fill alt="email sent image" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-200">
            You&apos;re set
          </h2>
          <p className="text-center text-gray-400 text-sm font-semibold">
            thank you for verifying your email
          </p>
          <Link
            className={buttonVariants({ className: "translate-y-3 h-8" })}
            href="sign-in"
          >
            sign in
          </Link>
        </div>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="animate-spin text-zinc-300 h-8 w-8" />
        <h2 className="font-semibold ">Verifying...</h2>
        <p className="text-sm text-gray-300 font-semibold">
          this won&apos;t take long.
        </p>
      </div>
    );
  }
}
