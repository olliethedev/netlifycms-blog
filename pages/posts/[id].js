import React from "react";
import { useRouter } from "next/router";
import fs from 'fs';
import path from 'path';
import dynamic from "next/dynamic";
import Head from 'next/head';
import styles from  "../../styles/Post.module.css";
import 'prismjs/themes/prism-okaidia.css';



const Post = ({post}) => {
  const router = useRouter();
  const { id } = router.query;
  const {attributes, html} = post;

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

export async function getStaticProps({params}){
    const { id } = params;
    console.log(id);
    const [blogpost] = await Promise.all([
      import(`../../content/posts/${id}.md`).catch(() => null)
    ]);
    const { attributes = {}, html } = blogpost?.default ?? {};
    return { props: { post: {attributes, html} } };
}

export async function getStaticPaths() {
  const paths = fs
    .readdirSync(path.join(process.cwd(), 'content/posts'))
    .map(blogName => {
      const trimmedName = blogName.substring(0, blogName.length - 3);
      return {
        params: { id: trimmedName },
      };
    });

  return {
    paths,
    fallback: false, // constrols whether not predefined paths should be processed on demand, check for more info: https://nextjs.org/docs/basic-features/data-fetching#the-fallback-key-required
  };
};
