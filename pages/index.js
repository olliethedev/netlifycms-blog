import React, { Component } from 'react'
import Head from "next/head"
import Link from "next/link";
import { attributes, react as HomeContent } from '../content/home.md';

export default class Home extends Component {
  render() {
    let { title, posts } = attributes;
    return (
      <>
        <Head>
          <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
        </Head>
        <article>
          <h1>{title}</h1>
          <HomeContent />
          <ul>
            {posts.map((post, k) => (
              <li key={k}>
                <Link href={post.link}><h2>{post.name}</h2></Link>
                <p>{post.description}</p>
              </li>
            ))}
          </ul>
        </article>
      </>
    )
  }
}