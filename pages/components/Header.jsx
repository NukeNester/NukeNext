// components/Header.jsx
import Link from "next/link";
import HomeButton from "./HomeButton"; // Make sure the import path is correct

// Define the navigation links
const navigation = [
  { name: "Home", href: "/" },
  { name: "Orders", href: "/orders" },
  { name: "Query", href: "/query" },
  { name: "Statistics", href: "/statistics" },
];

export function Header({ isLoggedIn, handleLogIn, handleLogOut }) {
  return (
    <header className="z-50">
      <nav
        className="flex items-center justify-between p-6 px-8"
        aria-label="Global"
      >
        <div className="flex-1">
          <HomeButton />
        </div>

        <div className="flex gap-x-12">
          {navigation.map((item) => {
            // Check if the item is not the Home link or the user is not logged in
            if (
              (item.name == "Home" && isLoggedIn) ||
              (item.name != "Home" && !isLoggedIn)
            ) {
              return null;
            } else {
              return (
                <Link key={item.name} href={item.href} passHref>
                  <span className="text-md font-semibold leading-6 text-white hover:text-gray-100 cursor-pointer">
                    {item.name}
                  </span>
                </Link>
              );
            }
          })}
        </div>

        <div className="lg:flex lg:flex-1 lg:justify-end">
          {!isLoggedIn && (
            <span
              className="text-sm font-semibold leading-6 text-white hover:text-gray-100 cursor-pointer"
              onClick={handleLogIn}
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </span>
          )}
          {isLoggedIn && (
            <span
              className="text-sm font-semibold leading-6 text-white hover:text-gray-100 cursor-pointer"
              onClick={handleLogOut}
            >
              Log Out <span aria-hidden="true">&rarr;</span>
            </span>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;



