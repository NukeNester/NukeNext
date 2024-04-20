// pages/Settings.jsx
import Head from 'next/head';
import WasteStats from './components/WasteStats';
import EmissionsSaved from './components/EmissionsSaved';
import LineGraph from './components/LineGraph';  // Assuming you also integrate the line graph

export default function Settings() {
    return (
        <>
            <Head>
                <title>Settings</title>
            </Head>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-200 via-gray-400 to-green-500 p-4">
                <h1 className="text-3xl font-bold text-white mb-4">Settings Page</h1>
                <p className="text-white mb-6">Manage your account settings and preferences.</p>
                
                {/* Stats Container */}
                <div className="flex flex-wrap justify-center gap-4 mb-6">
                    <WasteStats />
                    <EmissionsSaved />
                </div>
                
                <LineGraph />
            </div>
        </>
    );
}
