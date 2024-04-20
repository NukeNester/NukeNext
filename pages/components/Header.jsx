// components/Header.jsx
import Link from 'next/link';
import HomeButton from './HomeButton'; // Make sure the import path is correct

// Define the navigation links
const navigation = [
    { name: 'Orders', href: '/orders' },
    { name: 'Query', href: '/query' },
    { name: 'Statistics', href: '/statistics' },
];

export function Header() {
    return (
        <header className="z-50">
            <nav className="flex items-center justify-between p-6 px-8" aria-label="Global">
                <div className="flex-1">
                    <HomeButton />
                </div>

                <div className="flex gap-x-12">
                    {navigation.map((item) => (
                        <Link key={item.name} href={item.href} passHref>
                            <span className="text-md font-semibold leading-6 text-white hover:text-gray-100 cursor-pointer">
                                {item.name}
                            </span>
                        </Link>
                    ))}
                </div>
                <div className="lg:flex lg:flex-1 lg:justify-end">
                    <Link href="/api/auth/login" passHref>
                        <span className="text-sm font-semibold leading-6 text-white cursor-pointer">
                            Log in <span aria-hidden="true">&rarr;</span>
                        </span>
                    </Link>
                </div>
            </nav>
        </header>
    );
}

export default Header;
