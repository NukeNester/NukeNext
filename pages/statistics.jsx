// pages/Statistics.jsx
import Head from 'next/head';
import WasteStats from './components/WasteStats'; // Ensure the import paths are correct
import EmissionsSaved from './components/EmissionsSaved'; // Ensure the import paths are correct
import LineGraph from './components/LineGraph'; // Ensure the import paths are correct
import HomeButton from './components/HomeButton'; // Ensure the import paths are correct
import BarGraph from './components/BarGraph';

export default function Statistics() {
    return (
        <>
            <Head>
                <title>Profile Statistics</title>
            </Head>
            <div className="relative min-h-screen bg-gradient-to-b from-[#86c6aa] to-gray-200 p-4">
                {/* Position HomeButton at the top left */}
                <div className="absolute top-0 left-0 p-4">
                    <HomeButton />
                </div>

                {/* Central content */}
                <div className="flex flex-col items-center justify-center w-full">
                    <h1 className="text-3xl font-bold text-white mb-4">Profile Statistics</h1>
                    <p className="text-white mb-6">View your profile statistics</p>
                    {/* Stats Container */}
                    <div className="flex flex-wrap justify-center gap-4 mb-6">
                        <WasteStats />
                        <EmissionsSaved />
                    </div>
                
                            <LineGraph />
                            
                    
                           
                </div>
                
                    
            </div>
        </>
    );
}
