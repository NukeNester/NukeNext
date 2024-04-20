// pages/Statistics.jsx
import Head from "next/head";
import WasteStats from "./components/WasteStats"; // Ensure the import paths are correct
import EmissionsSaved from "./components/EmissionsSaved"; // Ensure the import paths are correct
import LineGraph from "./components/LineGraph"; // Ensure the import paths are correct
import HomeButton from "./components/HomeButton"; // Ensure the import paths are correct
import BarGraph from "./components/BarGraph";
import Header from "./components/Header";
import React, { useRef, useEffect } from "react";
import {
  withAuthInfo,
  useLogoutFunction,
  useRedirectFunctions,
  useAuthInfo,
} from "@propelauth/react";

export default function Statistics() {
  const { loading, isLoggedIn, user } = useAuthInfo();
  const logout = useLogoutFunction();
  const { redirectToLoginPage, redirectToAccountPage } = useRedirectFunctions();
  const myRef = useRef(null);
  const executeScroll = () =>
    myRef.current.scrollIntoView({ behavior: "smooth" });

    useEffect(() => {
      if (!isLoggedIn) {
        window.location.href = "https://14758910.propelauthtest.com/en/login";
      }
    }, []);
  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        handleLogIn={redirectToLoginPage}
        handleLogOut={logout}
      />
      <div className="relative min-h-screen bg-gradient-to-b from-[#86c6aa] to-gray-200 p-4">
        {/* Central content */}
        <div className="flex flex-col items-center justify-center w-full">
          <h1 className="text-3xl font-bold text-white mb-4">
            Profile Statistics
          </h1>
          <p className="text-white mb-6">View your profile statistics</p>
          {/* Stats Container */}
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <WasteStats />
            <EmissionsSaved />
          </div>

          <LineGraph />
        </div>
      </div>
    </>
  );
}
