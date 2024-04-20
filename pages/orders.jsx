import Header from "./components/Header";
import OrderCard from "./components/OrderCard";
import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import {
  withAuthInfo,
  useLogoutFunction,
  useRedirectFunctions,
  useAuthInfo,
} from "@propelauth/react";
import OrderTable from "./components/OrderTable";

export default function Orders() {
  const { loading, isLoggedIn, user } = useAuthInfo();
  const logout = useLogoutFunction();
  const { redirectToLoginPage, redirectToAccountPage } = useRedirectFunctions();
  const myRef = useRef(null);
  const getOrders = async () => {
    try {
      let response = null;
      //If the user is a admin(echen9870@gmail.com)
      if (user.email == "echen9870@gmail.com") {
        response = await axios.get(
          `https://server-iwh0.onrender.com/orders/getAllOrder`
        );
        //If the user is a regular person
      } else {
        response = await axios.get(
          `https://server-iwh0.onrender.com/orders/getOrderByEmail/${user.email}`
        );
      }

      setOrders(response.data);
      console.log(response.data); // Log response.data instead of orders
      console.log(user);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const executeScroll = () => {
    getOrders();
    myRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const [orders, setOrders] = useState(null);

  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        handleLogIn={redirectToLoginPage}
        handleLogOut={logout}
      />
      <div className="py-72">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center pb-96">
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

              {/*TODO NEED TO CREATE A PLACE ORDER COMPONENT */}
              <a className="rounded-md px-6 py-1.5 text-lg font-semibold text-white border border-white hover:bg-slate-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400">
                Place an Order
              </a>
            </div>
          </div>

          <div className="pb-80 flex justify-center" ref={myRef}>
            {orders && <OrderTable orders={orders} isAdmin = {user.email === "echen9870@gmail.com"}/>}
          </div>
        </div>
      </div>
    </>
  );
}
