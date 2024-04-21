import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Head from "next/head";
import WasteStats from "./components/WasteStats";
import EmissionsSaved from "./components/EmissionsSaved";
import LineGraph from "./components/LineGraph";
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
    if (!isLoggedIn) {
      window.location.href = "https://14758910.propelauthtest.com/en/login";
    }
    fetchData();
  }, [user]);

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

 // Depend on the user object itself if the email is the only mutable property
  
  return (
    <>
      <Head>
        <title>Statistics</title>
      </Head>
      <Header isLoggedIn={isLoggedIn} handleLogIn={redirectToLoginPage} handleLogOut={logout} />
      <div className="relative p-4 pb-72 flex justify-center items-center">
        {/* Centering content in a flex container */}
        <div className="flex flex-col items-center w-full max-w-4xl ">
          <h1 className="text-5xl font-bold text-white mb-10">
            Your Statistics
          </h1>
          {/* Flex container for the stats components horizontally aligned */}
          <div className="flex w-full mb-6">
            <div className="w-1/2 p-2">
              <WasteStats wasteData={wasteData} />
            </div>
            <div className="w-1/2 p-2">
              <EmissionsSaved wasteData={wasteData} />
            </div>
          </div>
          {/* LineGraph with the same width as the two components above */}
          <div className="w-full mb-6">
            <LineGraph wasteData={wasteData} />
          </div>
        </div>
      </div>
    </>
  );
}
