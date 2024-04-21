import React, { useState, useEffect } from "react";
import axios from "axios";


const OrderCard = (id, wasteType, orderDate, quantity, decayDate, long, lat, status, orgName, isAdmin ) => {

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

 
    return (
        <>
            <div className={`flex mt-10 max-w-md border white rounded-md text-white`}>
                <div className="p-4">
                    <img
                        src={"https://pp.walk.sc/apartments/e/1/460x400/MD/Hagerstown/City_Square.png"}
                        width=""
                        className="h-48 w-48 rounded-sm text-center border  border-neutral-400/20 hover:border-black"
                    />
                </div>
                <div className={`flex flex-col justify-start py-4 pr-4`}>
                    <div>
                        <h1 className="text-3xl font-bold">Order</h1>
                        <h1 className="text-2xl"> lbs of </h1>
                        <h1 className="text-lg">Decay on </h1>
                        <h1 className="text-lg">Ordered on </h1>
                        <button onClick={changeStatus} className="mt-4 ml-10 border text-xs text-neutral p-2 rounded-sm hover:bg-slate-300">Change Status</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OrderCard;
