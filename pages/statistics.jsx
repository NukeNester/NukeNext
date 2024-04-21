import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Head from "next/head";
import WasteStats from "./components/WasteStats";
import EmissionsSaved from "./components/EmissionsSaved";
import LineGraph from "./components/LineGraph";
import GrayBox from "./components/GrayBox";
import Header from "./components/Header";

import {
  useAuthInfo,
  useLogoutFunction,
  useRedirectFunctions,
} from "@propelauth/react";

export default function Statistics() {
  const { isLoggedIn, user } = useAuthInfo();
  const logout = useLogoutFunction();
  const { redirectToLoginPage } = useRedirectFunctions();
  const [wasteData, setWasteData] = useState([]);

  useEffect(() => {
    if (!user || !user.email) return;  // Ensure there's a user and email before fetching
  
    const fetchData = async () => {
      try {
        const url = user.email === "echen9870@gmail.com"
          ? "https://server-iwh0.onrender.com/orders/getAllOrder"
          : `https://server-iwh0.onrender.com/orders/getOrderByEmail/${user.email}`;
  
        const response = await axios.get(url);
        setWasteData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, [user]);  // Depend on the user object itself if the email is the only mutable property
  
  return (
    <>
      <Head>
        <title>Profile Statistics</title>
      </Head>
      <Header isLoggedIn={isLoggedIn} handleLogIn={redirectToLoginPage} handleLogOut={logout} />
      <div className="relative min-h-screen p-4">
        {/* Reduced top margin for title and header */}
        <div className="flex flex-col items-center mt-2">
          <h1 className="text-3xl font-bold text-white mb-4">
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
  <div className="w-1/2 p-4" style={{ height: '70%' }}>
    <GrayBox />
  </div>
</div>

      </div>
    </>
  );
}