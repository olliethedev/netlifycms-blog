import "../public/fonts/inter.css";
import "../styles/globals.scss";
import React from 'react'

function MyApp({ Component, pageProps }) {
  return (
    <Component {...pageProps} />
  );
}

export default MyApp;