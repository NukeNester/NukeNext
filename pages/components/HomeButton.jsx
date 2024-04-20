import Link from 'next/link';

const HomeButton = () => {
    return (
        <Link href="/" passHref>
            <span className="text-xl font-bold text-green-500 hover:text-gray-300 transition duration-300 cursor-pointer">
                Nuke<span className="text-white">Nester</span>
            </span>
        </Link>
    );
};

export default HomeButton;
