import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { icons } from "./icons";
import NavItems from "./NavItems";
import { buttonVariants } from "./ui/button";
import Cart from "./Cart";
import {cookies} from "next/headers"
import { getUser } from "@/lib/payload-utils";
import UserAccount from "./UserAccountNav";
import NavMobile from "./MobileNav";

export default async function Navbar() {
  const nextCookies = cookies()
  const user = await getUser(nextCookies)
 
  return (
    <div className="sticky top-0 z-30 bg-black inset-x-0 h-16">
      <header className="bg-black relative">
        <MaxWidthWrapper>
          <div className="border-b border-gray-800 ">
            <div className="flex h-16 items-center ">
              <NavMobile />
              <div className="flex ml-4 lg:ml-0">
                <Link href="/">
                  <icons.logo className="w-10 h-10" />
                </Link>
              </div>
              <div className="hidden lg:block z-50 lg:ml-8 lg:self-stretch">
                <NavItems />
              </div>
              <div className="flex ml-auto items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6 ">
                  {user ? null : (
                    <Link
                      href="/sign-in"
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      sign-in
                    </Link>
                  )}
                  {user ? null : <span aria-hidden="true" className="h-6 bg-gray-300 w-px" />}
                  {user ? <UserAccount user={user} />  : (
                    <Link
                      href="/sign-up"
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      create account
                    </Link>
                  )}
                  {user ? null : <span className="h-6 bg-gray-300 w-px" aria-hidden="true"/> }
                  <div className="ml-4 lg:ml-8 flow-root">
                    <Cart />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  );
}
