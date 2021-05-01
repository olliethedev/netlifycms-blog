import "../public/fonts/inter.css";
import "../styles/globals.scss";
import React from 'react'
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
    <Head>
    <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
    </Head>
    <Component {...pageProps} />
    </>
  );
}

export default MyApp;