"use client";
import { icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ArrowRight,XCircle,CheckCircle,Eye,EyeOff  } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TauthValidtion, authValidtion } from "@/lib/validators/auth-schema";
import { trpc } from "@/trpc/client";
import { toast } from "sonner";
import { ZodError } from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react"

export default function SignUp() {
  const [showPwd,setShowPwd] = useState<boolean>(false) 
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset
  } = useForm<TauthValidtion>({
    resolver: zodResolver(authValidtion),mode :"onChange"
  });

  const { mutate, isLoading } = trpc.auth.createUser.useMutation({
    onError: (err) => {
      if (err.data?.code === "CONFLICT") {
        toast.error("this email is already exist");
        return
      }
      if (err instanceof ZodError) {
        toast.error(err.issues[0].message);
        return
      }
      toast.error("something went wrong.please try again")

    },
    onSuccess : ({sentToEmail}) => {
      reset({ email: "",password: "",confirm: "" })
      toast.success("please sgin")
        router.push(`/sign-in`)
      // toast.success('verfication email sent to ' + sentToEmail)
      // router.push(`verify-email?to=${sentToEmail}`)
    },
  });

  const submitForm = async ({ email, password, confirm }: TauthValidtion) => {
    mutate({ email, password, confirm });
  };
  return (
    <div className="flex flex-col pt-16 justify-center items-center lg:px-0 relative container">
      <div className="flex items-center w-full sm:w-[350px] flex-col mx-auto space-y-3">
        <div className="flex flex-col text-center w-full items-center space-y-1">
          <icons.logo className="w-12 h-12" />
          <h1 className="text-2xl font-bold text-white">create an account</h1>
          <Link
            href="/sign-in"
            className="flex text-sm gap-1 items-center hover:text-gray-400 transition-all text-gray-300"
          >
            already have an account sign in{" "}
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
                    { "focus-visible:ring-red-600 ring-2 ring-red-600": errors.email },
                    {"ring-gray-300 ring-1 input" : !errors.email} 
                  )}
                />
                {errors?.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
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
                    { "focus-visible:ring-red-600 ring-2 ring-red-600": errors.password },
                    {"ring-gray-300 ring-1 input" : !errors.password} 
                  )}
                />
                <div className={`absolute top-1/2 right-2 ${errors?.password && "-translate-y-[14px]"}`}>
                  {showPwd ?
                  <Eye  className="cursor-pointer" onClick={() => setShowPwd(false)} />  : 
                  <EyeOff className="cursor-pointer" onClick={() => setShowPwd(true)} />
                  
                  }
                </div>
                {errors?.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
              </div>
              <div className="grid relative gap-2 mb-[5px]">
                <Label
                  htmlFor="confirm"
                  className="ml-1 mb-[2px] font-semibold text-[#eee]"
                >
                  confirm
                </Label>
                <Input
                {...register("confirm")}
                  type="password"
                  placeholder="password"
                  className="ring-gray-300 ring-1"
                />
                { watch("confirm") &&
                <div className="absolute top-1/2 right-2">
                  {errors.confirm ?
                  <XCircle className="text-red-600" /> :
                  <CheckCircle className="text-green-600" />}
                </div>}
              </div>
              <Button disabled={isLoading} className={`py-1 h-8 ${isLoading && "bg-slate-200 hover:bg-slate-200"}`}>{isLoading ? <span className="loading" /> : "sign in"}</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
