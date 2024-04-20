import React from 'react';
import Header from './Header';
import Logo from './Logo'; // Ensure Logo component import path is correct

export function Hero() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-green-200">
            <Header />
            <div className="flex flex-col justify-center items-center h-full">  
                <div className="text-center">
                    <div className="flex items-center justify-center gap-4">
                        <Logo src="https://cdn.discordapp.com/attachments/1230548482725773426/1231136718460031088/logo1-removebg.png?ex=6635dc6b&is=6623676b&hm=000323459963bb9b8a265949410c34b7f997471de53bb1793354185918de2fd0&" width={100} height={100} />
                        <div className="relative text-5xl font-bold sm:text-6xl">
                            <span className="text-green-500">Nuke</span>
                            <span className="text-black">Nester</span>
                        </div>
                    </div>
                    <p className="mt-6 text-lg leading-8 text-black">
                        Properly dispose and handle nuclear waste with Nuke Nester.
                    </p>
                    <div className="mt-6 flex items-center justify-center gap-x-6 pb-8">
                        <a
                            href="./api/auth/login"
                            className="rounded-md px-6 py-1.5 text-lg font-semibold text-black border border-black hover:bg-slate-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
                        >
                            Get started
                        </a>
                        <a
                            href="./api/auth/login"
                            className="rounded-md px-6 py-1.5 text-lg font-semibold text-black border border-black hover:bg-slate-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
                        >
                            Already a User?
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hero;
