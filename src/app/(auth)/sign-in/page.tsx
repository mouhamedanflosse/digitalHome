"use client";
import { icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {  TauthValidtion2, authValidtion2 } from "@/lib/validators/auth-schema";
import { trpc } from "@/trpc/client";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SignIn() {
  const [showPwd,setShowPwd] = useState<boolean>(false) 
    const router = useRouter();
    const searchParams = useSearchParams()
    const isSeller = searchParams.get("as") ===  "seller"
    const origin = searchParams.get("origin")

    const continueAsSeller = () => {
        router.push('?as=seller')
    }
    const continueAsBuyer = () => {
        router.replace("/sign-in",undefined)
    }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<TauthValidtion2>({
    resolver: zodResolver(authValidtion2),
  });

  const { mutate, isLoading } = trpc.auth.signIn.useMutation({
    onSuccess : () => {
      reset({ email: "",password: "" })
        toast.success("signed in successfully")
        router.refresh()
        if (origin) {
          router.push(`/${origin}`)
          return
        }
        if (isSeller) {
            router.push('/sell')
            return
        }
        router.push("/")
      },
      onError : (err) => {
        if (err.data?.code === "UNAUTHORIZED") {
            toast.error("invalid email or password");
          }
      }
  });

  const submitForm = async ({ email, password }: TauthValidtion2
    ) => {
    mutate({ email, password });

  };

  return (
    <div className="flex flex-col pt-16 justify-center items-center lg:px-0 relative container">
      <div className="flex items-center w-full sm:w-[350px] flex-col mx-auto space-y-3">
        <div className="flex flex-col text-center w-full items-center space-y-1">
          <icons.logo className="w-12 h-12" />
          <h1 className="text-2xl font-bold text-white">{isSeller ? "Sign in as seller" : "Sign in"}</h1>
          <Link
            href="/sign-up"
            className="flex text-sm gap-1 items-center hover:text-gray-400 transition-all text-gray-300"
          >
            dont have an account{" "}
            <ArrowRight className="w-4 h-5 font-extrabold" />
          </Link>
        </div>
        <div className="grid gap-6 w-full sm:px-9">
          <form onSubmit={handleSubmit(submitForm)}>
            <div className="grid gap-1">
              <div className="grid gap-2">
                <Label
                  htmlFor="email"
                  className="ml-1 bg-opacity-0 mb-[2px] font-semibold text-[#eee]"
                >
                  email
                </Label>
                <Input
                  {...register("email")}
                  placeholder="you@example.com"
                  className={cn(
                    { "focus-visible:ring-red-600": errors.email },
                    "ring-gray-300 ring-1 input "
                  )}
                />
                {errors?.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>
              <div className="grid relative gap-2 py-2">
                <Label
                  htmlFor="password"
                  className="ml-1 mb-[2px] font-semibold text-[#eee]"
                >
                  password
                </Label>
                <Input
                  {...register("password")}
                  type={showPwd ? "text" : "password"}
                  placeholder="password"
                  className={cn(
                    { "focus-visible:ring-red-600": errors.password },
                    "ring-gray-300 ring-1 input"
                  )}
                />
                 <div className={`absolute top-1/2 right-2 ${errors?.password && "-translate-y-[14px]"}`}>
                  {showPwd ?
                  <Eye  className="cursor-pointer" onClick={() => setShowPwd(false)} />  : 
                  <EyeOff className="cursor-pointer" onClick={() => setShowPwd(true)} />
                  
                  }
                </div>
                {errors?.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <Button disabled={isLoading} className={`py-1 h-8 ${isLoading && "bg-slate-200 hover:bg-slate-200"}`}>{isLoading ? <span className="loading" /> : "sign in"}</Button>

              <div className="relative mt-2">
                <div className="flex bg-black absolute text-gray-300 uppercase left-1/2 -translate-x-1/2 text-xs ">
                    or
                </div>
                <div className=" w-full flex h-4 items-center ">
                    <span className="w-full border-b border-gray-500" />
                </div>
              </div>
              {
                isSeller ?  <Button type="button" variant="secondary" onClick={continueAsBuyer}>continue as buyer</Button>  :
                <Button type="button" variant="secondary" onClick={continueAsSeller}>continue as seller</Button>
              }
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
