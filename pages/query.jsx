// pages/Query.jsx
import Head from 'next/head';
import GrayBox from './components/GrayBox'; // Adjust the path as necessary

export default function Query() {
    return (
        <>
            <Head>
                <title>Query Page</title>
            </Head>
            <div className="flex flex-col h-screen justify-center items-center bg-gradient-to-b from-gray-300 to-green-400">
                <div className="text-center p-10 max-w-3xl w-full">
                    <h1 className="text-2xl font-bold text-white">Query Page</h1>
                    <p className="text-sm text-white mt-2">Here you can perform searches or submit queries to find specific information or resources.</p>
                    <div className="mt-4 flex justify-center">
                        <form className="flex items-center">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-48 p-2 rounded-l-md border border-gray-300"
                            />
                            <button
                                type="submit"
                                className="px-3 py-2 rounded-r-md bg-blue-500 text-white"
                            >
                                Search
                            </button>
                        </form>
                    </div>
                </div>
                <GrayBox />
            </div>
        </>
    );
}
