import { useState } from "react";
import Link from "next/link";
import Header from "./Header";
import Logo from "./Logo"; // Ensure this import is correct
import {
  withAuthInfo,
  useLogoutFunction,
  useRedirectFunctions,
} from "@propelauth/react";

export function Hero({ isLoggedIn }) {
  const logout = useLogoutFunction();
  const { redirectToLoginPage, redirectToAccountPage } = useRedirectFunctions();

  return (
    <>
      <Header isLoggedIn={isLoggedIn} handleLogIn={redirectToLoginPage} handleLogOut={logout} />
      <div className="pt-6">  {/* Reduced top padding */}
        <div className="py-16 sm:py-20 lg:pb-24">  {/* Reduced vertical padding */}
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
              <div className="flex flex-col items-center justify-center gap-2">  {/* Reduced gap between logo and title */}
                <Logo src="https://cdn.discordapp.com/attachments/1230548482725773426/1231136718460031088/logo1-removebg.png?ex=6635dc6b&is=6623676b&hm=000323459963bb9b8a265949410c34b7f997471de53bb1793354185918de2fd0" width={100} height={100} />
                <h1 className="text-5xl font-bold sm:text-6xl">
                  <span className="text-green-500">Nuke</span>
                  <span className="text-white">Nest</span>
                  <span className="text-white">er</span>
                </h1>
              </div>
              <p className="mt-4 text-lg leading-8 text-white">  {/* Reduced margin top for the paragraph */}
                Properly dispose and handle nuclear waste with Nuke Nester.
              </p>
              <div className="mt-8 flex items-center justify-center gap-x-6 pb-16">  {/* Reduced bottom padding and margin top */}
                <a
                  onClick={redirectToLoginPage}
                  className="cursor-pointer rounded-md px-6 py-1.5 text-lg font-semibold text-white border border-white hover:bg-slate-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
                >
                  Get started
                </a>
                <a
                  onClick={redirectToLoginPage}
                  className="cursor-pointer rounded-md px-6 py-1.5 text-lg font-semibold text-white border border-white hover:bg-slate-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
                >
                  Already a User?
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
