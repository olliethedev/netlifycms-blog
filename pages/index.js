import React from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

const Home = ({ post }) => {
  const { attributes, html } = post;
  const { title, postsReversed } = attributes;
  return (
    <>
      <Head>
        <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
        <title>Ollie Codes | Blog</title>
      </Head>
      <div className={styles.body}>
        <div className={styles.hero}>
          <h1>{title}</h1>
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>
        <ul>
          {postsReversed.map((post, k) => (
            <div key={k}>
              <Link href={post.link}>
                <h2 className={styles.link}>{post.name}</h2>
              </Link>
              <p>{post.description}</p>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Home;

export async function getStaticProps() {
  console.log("building...");
  const [blogpost] = await Promise.all([
    import(`../content/home.md`).catch(() => null),
  ]);
  const { attributes = {}, html } = blogpost?.default ?? {};
  attributes.postsReversed = attributes.posts.reverse();
  return { props: { post: { attributes, html } } };
}
