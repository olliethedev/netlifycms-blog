import React from "react";
import Head, { HEAD_TYPES } from "../components/Head";
import Hero from "../components/Hero";
import Row from '../components/Row';

const Home = ({ post }) => {
  const { attributes, html } = post;
  const { title, hero, postsReversed, description } = attributes;
  return (
    <>
      <Head
        title={`Ollie The Dev | ${title}`}
        description={description}
        type={HEAD_TYPES.website}
        image={hero}
      />
      <div className="content-body">
        <Hero title={title} description={html} image={hero} />
        <div className="content-list">
          {postsReversed.map((post) => (
            <Row
              key={post.link}
              link={post.link}
              image={post.image}
              isLinkRoute={true}
              title={post.name}
              description={post.description}
              date={post.date}
              dateFormat="MMM YYYY"
              category="article"
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
