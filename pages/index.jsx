import Image from "next/image";
import Head from "next/head";
import Hero from "./components/Hero";
import {useUser} from "@auth0/nextjs-auth0/client";


export default function Index() {

    const {user, error, isLoading} = useUser();
    return (
        <>
            <Head>
                <title>Home</title>
                <style>@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap')</style>
                <link rel="icon" href="" />
            </Head>

            <Hero />

        </>

    );
}
