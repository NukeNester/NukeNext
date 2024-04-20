import Image from "next/image";
import Head from "next/head";
import Hero from "./components/Hero";


export default function Index() {
    return (
        <>
            <Head>
                <title>Home</title>
                <style>@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap')</style>
                <link rel="icon" href="https://cdn.discordapp.com/attachments/1230548482725773426/1231067116288081941/image.png?ex=66359b98&is=66232698&hm=84d21462860d268cf9140c33b4a7c739614059f5d359015a78d2122a1a909f40&" />
            </Head>

            <Hero />

        </>

    );
}
