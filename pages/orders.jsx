"use client";
import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import { Dialog, Transition } from "@headlessui/react";

import Header from "./components/Header";
import OrderTable from "./components/OrderTable";
import OrderForm from "./components/OrderForm";
import OrderCard from "./components/OrderCard";

import {
  withAuthInfo,
  useLogoutFunction,
  useRedirectFunctions,
  useAuthInfo,
} from "@propelauth/react";

export default function Orders() {
  const { loading, isLoggedIn, user } = useAuthInfo();

  const logout = useLogoutFunction();
  const { redirectToLoginPage, redirectToAccountPage } = useRedirectFunctions();
  const [orders, setOrders] = useState(null);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const myRef = useRef(null);

  useEffect(() => {
    if (user) {
      getOrders();
    } else {
      window.location.href = "https://14758910.propelauthtest.com/en/login";
    }
  }, []);

  const getOrders = async () => {
    try {
      const url =
        user.email === "echen9870@gmail.com" ||
        user.email === "kkochhar2004@gmail.com"
          ? "https://server-iwh0.onrender.com/orders/getAllOrder"
          : `https://server-iwh0.onrender.com/orders/getOrderByEmail/${user.email}`;
      const response = await axios.get(url);
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleUpdateOrder = (orderID, status) => {
    setOrders((prevOrders) => {
      return prevOrders.map((o) => {
        if (orderID === o._id) {
          return { ...o, status: status }; // Create a new object with updated status
        }
        return o;
      });
    });
  };

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    if (!user) {
      return;
    }
    getOrders();
  }, [user]);

  const executeScroll = () => {
    myRef.current.scrollIntoView({ behavior: "smooth" });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        handleLogIn={redirectToLoginPage}
        handleLogOut={logout}
      />
      <Transition.Root show={isPopupOpen} as={React.Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          onClose={() => setPopupOpen(false)}
        >
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              onClick={() => {
                setPopupOpen(false);
                localStorage.setItem("22-18-update", false);
              }}
              className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity"
            />
          </Transition.Child>
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 text-center sm:block sm:p-0">
            <OrderForm
              organizationName={user ? user.email : null}
              handlePopupClose={() => setPopupOpen(false)}
            />
          </div>
        </Dialog>
      </Transition.Root>
      <div className="py-36">
        <div className="flex flex-col mx-auto max-w-7xl px-6 lg:px-8">
          <div className=" mx-auto max-w-4xl text-center pb-96">
            <h1 className="text-5xl font-bold  text-white sm:text-6xl">
              Orders
            </h1>
            <p className="mt-6 text-lg leading-8 text-white">
              Manage your orders here
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6 pb-20">
              <button
                onClick={executeScroll}
                className="rounded-md px-6 py-1.5 text-lg shadow-sm font-semibold text-white border border-white hover:bg-slate-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
              >
                View Orders
              </button>
              <button
                onClick={() => setPopupOpen(true)}
                className="rounded-md px-6 py-1.5 text-lg shadow-sm font-semibold text-white border border-white hover:bg-slate-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
              >
                Place an Order
              </button>
            </div>
          </div>
          <div className="pb-96 flex flex-col justify-center" ref={myRef}>
            <div className="mt-12">
              <h1 className="pt-16 text-5xl font-bold text-white text-center">
                {orders && orders.length > 0 ? "Your Orders" : "No Orders."}
              </h1>
            </div>
            <OrderTable
              orders={orders}
              isAdmin={
                user.email == "echen9870@gmail.com" ||
                user.email == "kkochhar2004@gmail.com"
              }
              updateOrder={handleUpdateOrder}
            ></OrderTable>
          </div>
        </div>
      </div>
    </>
  );
}
