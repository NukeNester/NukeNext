import Head from 'next/head';

export default function Settings() {
    return (
        <>
            <Head>
                <title>Settings</title>
            </Head>
            <div style={{ padding: "20px" }}>
                <h1>Settings Page</h1>
                <p>This is where you can manage your account settings and preferences.</p>
            </div>
        </>
    );
}
