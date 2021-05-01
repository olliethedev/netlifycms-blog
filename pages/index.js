import React from "react";
import styles from "../styles/Home.module.scss";
import Head, { HEAD_TYPES } from "../components/Head";
import Hero from "../components/Hero";
import Row from '../components/Row';

const Home = ({ post }) => {
  const { attributes, html } = post;
  const { title, hero, postsReversed, description } = attributes;
  return (
    <>
      <Head
        title={`Ollie Codes | ${title}`}
        description={description}
        type={HEAD_TYPES.website}
        image={hero}
      />
      <div className={styles.body}>
        <Hero title={title} description={html} image={hero} />
        <div className={styles.list}>
          {postsReversed.map((post) => (
            <Row
              key={post.link}
              link={post.link}
              isLinkRoute={true}
              title={post.name}
              description={post.description}
              date={post.date}
              dateFormat="MMM YYYY"
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;

export async function getStaticProps() {
  const [blogpost] = await Promise.all([
    import(`../content/home.md`).catch(() => null),
  ]);
  const { attributes = {}, html } = blogpost?.default ?? {};
  attributes.postsReversed = attributes.posts.reverse();
  return { props: { post: { attributes, html } } };
}
