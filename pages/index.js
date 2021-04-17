import React, { Component } from "react";
import Head from "next/head";
import Link from "next/link";
import { attributes, react as HomeContent } from "../content/home.md";
import styles from  "../styles/Home.module.css";

export default class Home extends Component {
  render() {
    let { title, posts } = attributes;
    return (
      <>
        <Head>
          <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
          <title>Ollie Codes | Blog</title>
        </Head>
        <article>
          <h1>{title}</h1>
          <HomeContent />
          <ul>
            {posts.map((post, k) => (
              <div key={k}>
                <Link href={post.link}>
                  <h2 className={styles.link}>{post.name}</h2>
                </Link>
                <p>{post.description}</p>
              </div>
            ))}
          </ul>
        </article>
      </>
    );
  }
}
