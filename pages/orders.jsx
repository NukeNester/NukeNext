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
  const [useCard, setUseCard] = useState(false);

  const getOrders = async () => {
    let response = null;
    try {
      if (user.email == "echen9870@gmail.com" || user.email == "kkochhar2004@gmail.com") {
        console.log("Getting all orders")
        response = await axios.get(
          "https://server-iwh0.onrender.com/orders/getAllOrder"
        );
      } else {
        response = await axios.get(
          `https://server-iwh0.onrender.com/orders/getOrderByEmail/${user.email}`
        );
      }
      response == null ? getOrders() : setOrders(response.data);


      setTimeout(function () {
        // This code will execute after 1 second
        console.log("Waited for 1 second!");
      }, 1000);

      console.log("Orders:", response.data)

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  const changeStatus = () => {
    try {
      status = "pending" ? "disposed" : "pending";
      const response = axios.put(
        `https://server-iwh0.onrender.com/orders/updateOrderByID/${id}/${status}`
      );
      console.log("Successfuly saved", response);
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };
  useEffect(() => {
    if (user) {
      getOrders();
    }
  }, [user]);


  useEffect(() => {
    if (orders) {
      setUseCard(true);
    }
  }, [orders])

  function formatDate(date) {
    const createdAtDate = new Date(date);
    const options = { month: '2-digit', day: '2-digit', year: 'numeric' };
    return createdAtDate.toLocaleDateString('en-US', options);
}

  const executeScroll = () => {
    myRef.current.scrollIntoView({ behavior: "smooth" });
  };

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
      <div className="pt-36">
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
                className="rounded-md px-6 py-1.5 text-lg font-semibold text-white border border-white hover:bg-slate-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
              >
                View Orders
              </button>
              <button
                onClick={() => setPopupOpen(true)}
                className="rounded-md px-6 py-1.5 text-lg font-semibold text-white border border-white hover:bg-slate-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
              >
                Place an Order
              </button>
            </div>
          </div>
          <div className="mt-48 pb-80 flex flex-col justify-center" ref={myRef}>
            <div>
              <h1 className="pt-16 text-5xl font-bold text-white text-center">
                {orders && useCard && orders.length > 0 ? "Your Orders" : "No Orders."

                }
              </h1>
            </div>
            <div className="flex flex-wrap justify-center gap-x-16">

              {orders && useCard && orders.length > 0 && orders.map((order, index) => (
                <div key={index} className={`flex mt-10 max-w-xl border white rounded-md text-white`}>
                  <div className="p-4">
                    <img
                      src={"https://pp.walk.sc/apartments/e/1/460x400/MD/Hagerstown/City_Square.png"}
                      width=""
                      className="h-48 w-48 rounded-sm text-center border  border-neutral-400/20 hover:border-black"
                    />
                  </div>
                  <div className={`flex flex-col justify-start py-4 pr-4`}>
                    <div>
                      <h1 className="text-3xl font-bold">Order {order.status}</h1>
                      <h1 className="text-2xl">{order.quantity} lbs of {order.wasteType}</h1>
                      <h1 className="text-lg">Decay on {formatDate(order.timeToDecay)}</h1>
                      <h1 className="text-lg">Ordered on {formatDate(order.dateOrdered)}</h1>
                      <button onClick={changeStatus} className="mt-4 ml-10 border text-xs text-neutral p-2 rounded-sm hover:bg-slate-300">Change Status</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </>
  );
}