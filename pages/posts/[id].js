import React from "react";
import fs from "fs";
import path from "path";
import Head from "next/head";
import styles from "../../styles/Post.module.scss";
import "prismjs/themes/prism-okaidia.css";

const Post = ({ post }) => {
  const { attributes, html } = post;

  return (
    <>
      <Head>
        <title>Ollie Codes | {attributes.title}</title>
      </Head>
      <article className={styles.body}>
        <div>
          <div dangerouslySetInnerHTML={{ __html: html }}></div>
        </div>
      </article>
    </>
  );
};

export default Post;

export async function getStaticProps({ params }) {
  console.log("building...");
  const { id } = params;
  console.log(id);
  const [blogpost] = await Promise.all([
    import(`../../content/posts/${id}.md`).catch(() => null),
  ]);
  const { attributes = {}, html } = blogpost?.default ?? {};
  return { props: { post: { attributes, html } } };
}

export async function getStaticPaths() {
  console.log("building...");
  const paths = fs
    .readdirSync(path.join(process.cwd(), "content/posts"))
    .map((blogName) => {
      const trimmedName = blogName.substring(0, blogName.length - 3);
      return {
        params: { id: trimmedName },
      };
    });

  return {
    paths,
    fallback: false, // constrols whether not predefined paths should be processed on demand, check for more info: https://nextjs.org/docs/basic-features/data-fetching#the-fallback-key-required
  };
}
