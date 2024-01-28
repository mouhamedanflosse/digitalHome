import { Button } from "./ui/button";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';

export default function GoogleButton() {
    const login = useGoogleLogin({
        onSuccess: tokenResponse => console.log(tokenResponse),
    })
  return (
    <div>
      <Button type="button" className="flex justify-center w-full items-center gap-2 mt-3 "><FcGoogle className="text-lg h-fit mt-1 shrink-0" /> continue with google</Button>
    </div>
  )
}
