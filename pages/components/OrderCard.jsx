import { useState } from 'react';
import Link from 'next/link';


export function OrderCard() {

    return (

        <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-3xl">
            <div className="bg-white text-center py-4">
                <h1 className="text-2xl font-bold text-gray-800">Order #1</h1>
            </div>
            <div className=" flex justify-center gap-x-10">
                <div className="">
                    <img 
                        className="border w-96 h-96 object-cover"
                        src="https://mdi.georgetown.edu/wp-content/uploads/sites/371/2022/10/sftract5-1024x1024.png">
                
                    </img>
                </div>
                <div className="flex items-center p-4">
                    <div>

                    <p className="text-gray-700 mb-4">United States Government</p>
                    <p className="text-gray-700 mb-4">Date Ordered: 4-20-24</p>
                    <p className="text-gray-700 mb-4">Waste Type: LEVEL 4</p>
                    <p className="text-gray-700 mb-4">Quantity:  10 LBS</p>
                    <p className="text-gray-700 mb-4">Time to Decay: 28 days</p>
                    </div>
                </div>
            </div>
            <div className="bg-white text-center py-4">
                <a className="text-gray-800 font-semibold">View Order</a>

            </div>
        </div>

    );
}

export default OrderCard;
