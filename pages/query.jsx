import Head from 'next/head';

export default function Query() {
    return (
        <>
            <Head>
                <title>Query</title>
            </Head>
            <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
                <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(to bottom, #d6d1cf, #92c0ac)" }}>
                    <div style={{ textAlign: "center", padding: "20px", maxWidth: "600px", width: "100%" }}>
                        <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "#fff" }}>Query Page</h1>
                        <p style={{ fontSize: "1.2rem", color: "#fff" }}>Here you can perform searches or submit queries to find specific information or resources.</p>
                        <div style={{ marginTop: "20px" }}>
                            <form style={{ display: "flex", alignItems: "center" }}>
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    style={{ flex: 1, padding: "10px", borderRadius: "5px 0 0 5px", border: "1px solid #ccc" }}
                                />
                                <button
                                    type="submit"
                                    style={{ padding: "10px 20px", borderRadius: "0 5px 5px 0", border: "none", backgroundColor: "#007bff", color: "#fff" }}
                                >
                                    Search
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                <div style={{ flex: 1, background: "#ffffff" }}>
                    {/* Bottom section content */}
                </div>
            </div>
        </>
    );
}
