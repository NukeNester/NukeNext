import Header from "./components/Header";
import OrderCard from "./components/OrderCard";
import React, { useRef } from 'react';



export default function Orders() {
    const myRef = useRef(null);
    const executeScroll = () => myRef.current.scrollIntoView({behavior : 'smooth'});
    return (
        <>
            <Header />
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
                            <a
                                href="./api/auth/login"
                                className="rounded-md px-6 py-1.5 text-lg font-semibold text-white border border-white hover:bg-slate-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
                            >
                                Place an Order
                            </a>
                        </div>
                    </div>

                    <div className="pb-80 flex justify-center" ref={myRef}>

                        <OrderCard />
                    </div>
                </div>
            </div>
        </>
    );
}
