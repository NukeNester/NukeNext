import React, { useState, useEffect } from "react";
import axios from "axios";
import StaticMap from "./StaticMap";

const OrderTable = ({ orders, isAdmin, updateOrder }) => {
  const handleStatusChange = async (order) => {
    try {
      console.log(order._id);
      const newStatus = order.status === "pending" ? "disposed" : "pending";
      const response = await axios.put(
        `https://server-iwh0.onrender.com/orders/updateOrderStatusByID/${order._id}/${newStatus}`
      );
      console.log("Order status updated successfully:", response.data);
      // Update the orders state variable with the modified order
      updateOrder(order._id, newStatus);
      alert("Order has been changed");
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <div className="flex flex-wrap justify-center gap-x-16 shadow-sm">
      {orders &&
        orders.map((order, index) => (
          <div
            key={index}
            className={`flex mt-10 max-w-xl border white rounded-md text-white`}
          >
            <div className="p-4">
              <StaticMap lat={order.latitude} lng={order.longitude}></StaticMap>
            </div>
            <div className={`flex flex-col justify-start py-4 pr-4`}>
              <div>
                <h1 className="text-3xl font-bold">Order {order.status}</h1>
                <h1 className="text-2xl">
                  {order.quantity} lbs of {order.wasteType}
                </h1>
                <h1 className="text-lg">
                  Decay on {new Date(order.timeToDecay).toLocaleDateString()}
                </h1>
                <h1 className="text-lg">
                  Ordered on {new Date(order.dateOrdered).toLocaleDateString()}
                </h1>

                <button
                  className="mt-4 ml-10 border text-xs text-neutral p-2 rounded-sm hover:bg-slate-300"
                  onClick={() => handleStatusChange(order)}
                >
                  Change Status
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default OrderTable;
