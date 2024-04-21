import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Head from "next/head";
import WasteStats from "./components/WasteStats";
import EmissionsSaved from "./components/EmissionsSaved";
import LineGraph from "./components/LineGraph";
import GrayBox from "./components/GrayBox";
import Header from "./components/Header";
import React, { useRef, useEffect } from "react";
import wasteData from './data/wasteData.json';

import {
  useAuthInfo,
  useLogoutFunction,
  useRedirectFunctions,
} from "@propelauth/react";

export default function Statistics() {
  const { isLoggedIn, user } = useAuthInfo();
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
      <Head>
        <title>Profile Statistics</title>
      </Head>
      <Header isLoggedIn={isLoggedIn} handleLogIn={redirectToLoginPage} handleLogOut={logout} />
      <div className="relative min-h-screen p-4">
        {/* Reduced top margin for title and header */}
        <div className="flex flex-col items-center mt-2"> {/* Reduced margin-top from mt-8 to mt-2 */}
          <h1 className="text-5xl font-bold text-white mb-10">
            Profile Statistics
          </h1>
        </div>
        
        {/* Main content */}
        <div className="flex justify-between items-start">
  {/* Left column for stats */}
  <div className="flex flex-col gap-8 w-1/2 p-4">
    <div className="flex">
      <div className="w-1/2 p-2"> {/* Change width here */}
        <WasteStats wasteData={wasteData} />
      </div>
      <div className="w-1/2 p-2">
        <EmissionsSaved wasteData={wasteData} />
      </div>
    </div>
    <LineGraph wasteData={wasteData} />
  </div>
  
  {/* Right column for the map */}
  <div className="w-1/2 p-4" style={{ height: '100%' }}>
    <GrayBox />
  </div>
</div>

      </div>
    </>
  );
}
