import { useState } from 'react';
import Link from 'next/link';

// Define the navigation links
const navigation = [
    { name: 'Orders', href: '/orders' },
    { name: 'Query', href: '/query' },
    { name: 'Settings', href: '/settings' },
];

export function Header() {

    return (
        
            <header className=" z-50">

                <nav className="flex items-center justify-between p-6 px-8" aria-label="Global">
                    <div className="flex-1">
                        <p className="text-xl font-semibold leading-6 text-white">
                            Nuke Nester
                        </p>
                    </div>

                    <div className="flex gap-x-12">
                        {navigation.map((item) => (
                            <a key={item.name} href={item.href} className="text-md font-semibold leading-6 text-white hover:text-gray-100">
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

    );
}

export default Header;
