import Image from "next/image";
import Head from "next/head";
import Hero from "./components/Hero";
import { useAuthInfo } from "@propelauth/react";

export default function Index() {
  const { loading, isLoggedIn, user } = useAuthInfo();
  return (
    <>
      <Head>
        <title>Home</title>
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Poppins&display=swap')
        </style>
        <link
          rel="icon"
          href="https://media.discordapp.net/attachments/1230548482725773426/1231136718460031088/logo1-removebg.png?ex=6635dc6b&is=6623676b&hm=000323459963bb9b8a265949410c34b7f997471de53bb1793354185918de2fd0&=&format=webp&quality=lossless&width=1000&height=1000"
        />
      </Head>

      <Hero isLoggedIn={isLoggedIn} />
    </>
  );
}
