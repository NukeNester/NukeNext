import "@/styles/globals.css";
import {AppProps} from 'next/app'
import {AuthProvider} from "@propelauth/react";

export default function App({Component, pageProps}) {
    return <AuthProvider authUrl="https://14758910.propelauthtest.com">
        <Component {...pageProps} />
    </AuthProvider>
}