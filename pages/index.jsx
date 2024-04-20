import { useState } from 'react';
import Link from 'next/link';

const navigation = [
    { name: 'Orders', href: '/orders' },
    { name: 'Query', href: '/query' },
    { name: 'Settings', href: '/settings' },
];

export function Hero() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div>
            <header className="absolute inset-x-0 top-0 z-50">
                <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
                    <div className="flex-1"></div>
                    <div className="flex lg:gap-x-12">
                        {navigation.map((item) => (
                            <Link key={item.name} href={item.href} passHref>
                                <span className="text-md font-semibold leading-6 text-white cursor-pointer">{item.name}</span>
                            </Link>
                        ))}
                    </div>
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                        <Link href="/login" passHref>
                            <span className="text-sm font-semibold leading-6 text-white cursor-pointer">
                                Log in <span aria-hidden="true">&rarr;</span>
                            </span>
                        </Link>
                    </div>
                </nav>
            </header>

            <div className="relative isolate pt-14">
                <div
                    className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                    aria-hidden="true"
                >
                    <div
                        className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/3 rotate-[30deg] bg-gradient-to-tr from-[#0e1354] to-[#1223a6] opacity-40 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                    />
                </div>
                <div className="py-24 sm:py-32 lg:pb-40">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-4xl text-center pb-96">
                            <h1 className="text-5xl font-bold tracking-normal text-white sm:text-6xl leading-relaxed">
                                Nuke Nester
                            </h1>
                            <p className="mt-6 text-lg leading-8 text-gray-300">
                                A data-driven simulation platform that provides a realistic, hands-on experience for you to become a cybersecurity professional.
                            </p>
                            <div className="mt-10 flex items-center justify-center gap-x-6 pb-20">
                                <Link href="/register" passHref>
                                    <span className="rounded-md px-6 py-1.5 text-lg font-semibold text-white border border-white hover:bg-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 cursor-pointer">
                                        Get started
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hero;
