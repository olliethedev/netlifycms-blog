import React from 'react'
import Head from "next/head";
import Script from "next/script";
import "../styles/index.css";
import "tailwindcss/tailwind.css";

const G_TAG = "G-1JWLCFBV9T";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <>
        {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${G_TAG}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${G_TAG}');
        `}
        </Script>
      </>
      <Head>
        <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;