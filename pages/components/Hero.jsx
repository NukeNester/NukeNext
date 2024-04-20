import { useState } from 'react';
import Link from 'next/link';

// Define the navigation links
const navigation = [
    { name: 'Orders', href: '/orders' },
    { name: 'Query', href: '/query' },
    { name: 'Settings', href: '/settings' },
];

export function Hero() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className="relative">
            <header className="absolute inset-x-0 top-0 z-50">
                <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
                    <div className="flex-1"></div>
                    <div className="flex lg:gap-x-12">
                        {navigation.map((item) => (
                            <Link key={item.name} href={item.href} passHref>
                                <a className="text-md font-semibold leading-6 text-white">{item.name}</a>
                            </Link>
                        ))}
                    </div>
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                        <Link href="/login" passHref>
                            <a className="text-sm font-semibold leading-6 text-white">
                                Log in <span aria-hidden="true">&rarr;</span>
                            </a>
                        </Link>
                    </div>
                </nav>
            </header>
            
            <div className="pt-24">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-5xl font-bold text-white sm:text-6xl">
                            Nuke Nester
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-gray-300">
                            A data-driven simulation platform that provides a realistic, hands-on experience for you to become a cybersecurity professional.
                        </p>
                        <div className="mt-10 flex justify-center gap-x-6">
                            <Link href="/register" passHref>
                                <a className="rounded-md px-6 py-1.5 text-lg font-semibold text-white border border-white hover:bg-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400">
                                    Get started
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hero;
