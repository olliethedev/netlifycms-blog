import React from "react";
import PropTypes from "prop-types";
import NextHead from "next/head";
const HEAD_TYPES = { website: "website", article: "article" };
const Head = ({ title, description, type, image }) => {
    const fullImgPath = process.env.NEXT_PUBLIC_DOMAIN + image;
  return (
    <NextHead>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="og:title" content={title} />
      <meta name="og:description" content={description} />
      <meta name="og:type" content={type} />
      <meta name="og:url" content={process.env.NEXT_PUBLIC_DOMAIN} />
      {image && <meta name="og:image" content={fullImgPath} />}
      <meta name="author" content="Ollie" />
      <meta property="og:locale" content="en_US"/>
      {image && <meta name="twitter:card" content="summary_large_image"/>}
      {image && <meta name="twitter:image" content={fullImgPath}></meta>}
    </NextHead>
  );
};
Head.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  type: PropTypes.oneOf(["website", "article"]),
};
export default Head;
export { HEAD_TYPES };
