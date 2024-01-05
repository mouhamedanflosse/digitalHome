import Verifyemail from "@/components/Verifyemail"
import Image from "next/image"


interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default function VerifyEmailPage({searchParams} : PageProps) {
    const token = searchParams.token
    const emailTo = searchParams.to

  return (
    <div className='container flex flex-col lg:px-0 pt-20 relative justify-center items-center'>
      <div className='w-full sm:w-[350px] flex flex-col space-y-6 justify-center items-center'>
        {
            token && typeof token === "string" ? 
            <div className='grid gap-6'>
            <Verifyemail token={token} />
            </div> : 
            <div className='flex flex-col justify-center items-center space-y-1'>
                <div className="w-60 relative h-60 mb-2 ">
                    <Image src="/hippo-email-sent.png" fill alt="email sent image" />
                </div>
                <h2 className="text-lg font-semibold text-gray-200">check your email</h2>
                {
                  emailTo ? <p className="text-center text-gray-400 text-sm font-semibold"> we&apos;ve sent a verfication email to <span className="font-bold text-gray-300">{emailTo}</span></p> 
                  : <p className="text-center text-gray-400 text-sm font-semibold"> we&apos;ve sent a verfication email to</p>
                }
            </div>
        }
      </div>
    </div>
  )
}
