import Link from 'next/link';

const HomeButton = () => {
    return (
        <Link href="/" passHref>
            <span className=" text-2xl font-bold text-blue-900/90 hover:text-blue-900/60  cursor-pointer">
                Nuke<span className="text-white">Nester</span>
            </span>
        </Link>
    );
};

export default HomeButton;
