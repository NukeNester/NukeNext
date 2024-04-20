"use client";
import Header from "./components/Header";
import OrderCard from "./components/OrderCard";
import React, { useRef } from 'react';
import { Transition, Dialog } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { useEffect } from 'react';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
import mapboxgl from 'mapbox-gl';
import Axios from 'axios';




export default function Orders() {
    const [searchQuery, setSearchQuery] = useState("");
    const [map, setMap] = useState(null);
    const [searchResult, setSearchResult] = useState(null);
    const myRef = useRef(null);
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [isMapReady, setMapReady] = useState(false);

    const { loading, isLoggedIn, user } = useAuthInfo();
    const logout = useLogoutFunction();
    const { redirectToLoginPage, redirectToAccountPage } = useRedirectFunctions();
    
    const getOrders = async () => {
        try {
            const response = await axios.get(
                `https://server-iwh0.onrender.com/orders/getOrderByEmail/${user.email}`
            );
            setOrders(response.data);
            console.log(response.data); // Log response.data instead of orders
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        getOrders();
    }, [user.email]); // Include user.email in the dependency array

    const executeScroll = () => {
        getOrders();
        myRef.current.scrollIntoView({ behavior: "smooth" });
    };

    const [orders, setOrders] = useState(null);
    let marker = null;

    async function fetchLocations() {
        try {
            const response = await Axios.get('https://server-iwh0.onrender.com/orders/getOrderByArea', {
                params: {
                    topLeft: [-79.4877, 39.7220], // Specify the actual coordinates for the top left corner
                    bottomRight: [-75.0487, 37.9117]
                }
            });
            return response.data; // Accessing data directly from Axios response
        } catch (error) {
            console.error('Failed to fetch locations', error);
            return [];
        }
    }


    useEffect(() => {

    }, []);





    function wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }


    async function runMap() {
        await wait(1);
        const newMap = new mapboxgl.Map({
            container: "map",
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [-74.006, 40.7128],
            zoom: 10
        });
        newMap.on('load', async () => {
            setMap(newMap);
            newMap.addControl(new mapboxgl.NavigationControl());

            // Add event listener for map click
            newMap.on('click', (e) => {
                const { lng, lat } = e.lngLat;
                console.log(`Longitude: ${lng}, Latitude: ${lat}`);

                // If a marker already exists, remove it
                if (marker) {
                    marker.remove();
                }

                // Create a new marker at the clicked location
                marker = new mapboxgl.Marker()
                    .setLngLat([lng, lat])
                    .addTo(newMap);
            });
        });
        setMapReady(true);

        return () => newMap.remove();
    }

    const handlePopupOpen = () => {
        setPopupOpen(true);
        runMap();
    }

    const handlePopupClose = () => {
        setPopupOpen(false);
    }




    return (
        <>
            <Header
                isLoggedIn={isLoggedIn}
                handleLogIn={redirectToLoginPage}
                handleLogOut={logout}
            />
            <Transition.Root show={isPopupOpen} as={Fragment}>
                <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={() => handlePopupClose()}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div onClick={() => {
                            handlePopupClose()
                            localStorage.setItem("22-18-update", false)
                        }}
                            className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" />
                    </Transition.Child>
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 text-center sm:block sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div style={{ fontFamily: 'Poppins, sans-serif', backgroundColor: "#161716" }} className="max-w-7xl relative inline-block align-bottom w-5/6 pb-10 pt-10 bg-gray-900 border border-gray-700 rounded-lg px-20 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle ">
                                <div>
                                    <div className="mt-3 sm:mt-5">
                                        <h1 className="text-white text-5xl text-center pb-10">Place An Order</h1>
                                        <div className="flex justify-center items-center ">
                                            {/* INPUT BOX */}
                                            <div className="text-white text-lg pb-12 px-10 ">

                                                {/* Prompt 1 */}
                                                <div className="flex items-start flex-col mb-10">
                                                    <label className=" text-white pb-1">Type of Waste:</label>
                                                    <input type="text" id="name" name="name" className="border border-neutral-700 rounded-md w-60 text-white py-2 bg-neutral-800 hover:text-neutral-300 hover:bg-neutral-800/90" />
                                                </div>

                                                {/* Prompt 2 */}
                                                <div className="flex items-start flex-col mb-10">
                                                    <label className=" text-white pb-1">Quantity of Waste:</label>
                                                    <input type="text" id="name" name="name" className="border border-neutral-700 rounded-md w-60 text-white py-2 bg-neutral-800 hover:text-neutral-300 hover:bg-neutral-800/90" />
                                                </div>

                                                {/* Prompt 3 */}
                                                <div className="flex items-start flex-col mb-10">
                                                    <label className=" text-white pb-1">Time to Decay:</label>
                                                    <input type="text" id="name" name="name" className="border border-neutral-700 rounded-md w-60 text-white py-2 bg-neutral-800 hover:text-neutral-300 hover:bg-neutral-800/90" />
                                                </div>

                                            </div>

                                            <div className=" px-10 pb-16 hidden lg:block">
                                                <div id="map" style={{ height: "300px", width: "125%" }} />
                                            </div>



                                        </div>
                                        <div className=" py-5 ">
                                            <div className="flex items-center justify-center">
                                                <button className="border border-neutral-700 mx-3 rounded-md w-20 text-white py-2 bg-neutral-800 hover:text-neutral-300 hover:bg-neutral-800/90"
                                                    onClick={() => handlePopupClose()}>Close
                                                </button>
                                                <button className="border border-neutral-700 mx-3 rounded-md px-4 text-white py-2 bg-green-700 hover:text-neutral-300 hover:bg-green-800"
                                                    onClick={() => handlePopupClose()}>Place Order
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
            <div className="py-72">
                <div className="grid grid-cols mx-auto max-w-7xl px-6 lg:px-8">
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
                                onClick={() => handlePopupOpen()}
                                className="rounded-md px-6 py-1.5 text-lg font-semibold text-white border border-white hover:bg-slate-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
                            >
                                Place an Order
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-center text-6xl gap-x-2 py-24 pb-10 font-bold text-white" ref={myRef}>
                        <span className="">Your <span>Orders</span></span>

                    </div>
                    <div className="pb-80 flex justify-center">
                        <OrderCard />
                    </div>
                </div>

                <div className="hidden">

                </div>


            </div>
        </>
    );
}