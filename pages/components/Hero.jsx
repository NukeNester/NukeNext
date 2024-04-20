import { useState } from 'react';
import Link from 'next/link';

// Define the navigation links
const navigation = [
    { name: 'Orders', href: '/orders' },
    { name: 'Query', href: '/query' },
    { name: 'Settings', href: '/settings' },
];

export function Hero() {

    return (
        <div className="">
            <header className=" z-50">

                <nav className="flex items-center justify-between p-6 px-8" aria-label="Global">
                    <div className="flex-1">
                        <p className="text-xl font-semibold leading-6 text-white">
                            Nuke Nester
                        </p>
                    </div>

                    <div className="flex gap-x-12">
                        {navigation.map((item) => (
                            <a key={item.name} href={item.href} className="text-md font-semibold leading-6 text-white">
                                {item.name}
                            </a>
                        ))}
                    </div>
                    <div className="lg:flex lg:flex-1 lg:justify-end">
                        <a href="./api/auth/login" className="text-sm font-semibold leading-6 text-white">
                            Log in <span aria-hidden="true">&rarr;</span>
                        </a>
                    </div>
                </nav>
                <div />


            </header>

            <div className=" pt-14">

                <div className="py-24 sm:py-32 lg:pb-40">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-4xl text-center pb-96">
                            <h1 className="text-5xl font-bold  text-white sm:text-6xl">
                                Nuke Nester
                            </h1>
                            <p className="mt-6 text-lg leading-8 text-white">
                                Properly dispose and handle nuclear waste with Nuke Nester.
                            </p>
                            <div className="mt-10 flex items-center justify-center gap-x-6 pb-20">
                                <a
                                    href="./api/auth/login"
                                    className="rounded-md px-6 py-1.5 text-lg font-semibold text-white border border-white hover:bg-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
                                >
                                    Get started
                                </a>
                                <a
                                    href="./api/auth/login"
                                    className="rounded-md px-6 py-1.5 text-lg font-semibold text-white border border-white hover:bg-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
                                >
                                    Already a User?
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hero;
