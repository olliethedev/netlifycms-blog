import React from "react";
import Link from "next/link";
import moment from "moment";
import styles from "../styles/Home.module.scss";
import Head, {HEAD_TYPES} from '../components/Head';

const Home = ({ post }) => {
  const { attributes, html } = post;
  const { title, hero, postsReversed, description } = attributes;
  return (
    <>
      <Head title={`Ollie Codes | ${title}`}
        description={description}
        type={HEAD_TYPES.website}
        image={hero}
      />
      <div className={styles.body}>
        <div className={styles.hero}>
          <img className="hero-pop" src={hero} alt="hero" />
          <h1>{title}</h1>
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>
        <ul>
          {postsReversed.map((post, k) => (
            <div key={k}>
              <Link href={post.link}>
                <h2 className={styles.link}>{post.name}</h2>
              </Link>
              <sup>
                {post.date &&
                  moment(post.date, "YYYY-MM-DDTHH:mm:ss.SSS").format(
                    "MMM YYYY"
                  )}
              </sup>
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
