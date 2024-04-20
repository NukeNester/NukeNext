import { useState } from 'react';
import Link from 'next/link';
import Header from './Header';
import Header from './Header';


export function Hero() {

    return (
        <div className="">
            <Header/>
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
                                    className="rounded-md px-6 py-1.5 text-lg font-semibold text-white border border-white hover:bg-slate-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
                                >
                                    Get started
                                </a>
                                <a
                                    href="./api/auth/login"
                                    className="rounded-md px-6 py-1.5 text-lg font-semibold text-white border border-white hover:bg-slate-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
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
