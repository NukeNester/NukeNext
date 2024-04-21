import React, { useState, useEffect } from "react";
import axios from "axios";
import OrderCard from "./OrderCard";
const OrderTable = ({ orders, isAdmin }) => {

  const [editedOrders, setEditedOrders] = useState({});

  const handleStatusChange = (orderId, newStatus) => {
    console.log(orderId);
    console.log(newStatus);
    setEditedOrders((prevOrders) => ({
      ...prevOrders,
      [orderId]: newStatus,
    }));
  };

  useEffect(() => {
    console.log("Current edited orders:", editedOrders);
  }, [editedOrders]);
  const handleSaveChanges = async () => {
    try {
      // Convert the object into an array of objects with ID and status properties
      const editedOrdersArray = Object.entries(editedOrders).map(
        ([orderId, status]) => ({ id: orderId, status })
      );

      // Iterate over each order in the array and update its status
      for (const order of editedOrdersArray) {
        const response = await axios.put(
          `https://server-iwh0.onrender.com/orders/updateOrderByID/${order.id}/${order.status}`
        );
      }
    } catch (error) {
      console.error("Error saving changes:", error);
    }
    console.log("Successfuly saved");
  };

  return (
    <div>
      <OrderCard />
      <table className="border-collapse border border-gray-300 ">
        <thead>
          <tr>
            {isAdmin && (
              <th className="border border-gray-300 px-4 py-2">Org Email</th>
            )}
            <th className="border border-gray-300 px-4 py-2">Date Ordered</th>
            <th className="border border-gray-300 px-4 py-2">Waste Type</th>
            <th className="border border-gray-300 px-4 py-2">Quantity</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
            <th className="border border-gray-300 px-4 py-2">Time to Decay</th>
            <th className="border border-gray-300 px-4 py-2">Latitude</th>
            <th className="border border-gray-300 px-4 py-2">Longitude</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              {isAdmin && (
                <td className="border border-gray-300 px-4 py-2">
                  {order.organizationName}
                </td>
              )}
              <td className="border border-gray-300 px-4 py-2">
                {new Date(order.dateOrdered).toLocaleDateString()}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {order.wasteType}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {order.quantity}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {isAdmin ? (
                  <select
                    value={editedOrders[order._id] || order.status}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                  >
                    <option value="pending">Pending</option>
                    <option value="disposed">Disposed</option>
                  </select>
                ) : (
                  order.status
                )}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {new Date(order.timeToDecay).toLocaleDateString()}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {order.latitude}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {order.longitude}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isAdmin && (
        <button
          onClick={handleSaveChanges}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Save Changes
        </button>
      )}
    </div>
  );
};

export default OrderTable;
