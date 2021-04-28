import React from "react";
import Head from "next/head";
import Link from "next/link";
import moment from "moment";
import styles from "../../styles/Portfolio.module.css";

const Portfolio = ({ project }) => {
  const { attributes, html } = project;
  const { title, hero, projects } = attributes;
  return (
    <>
      <Head>
        <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
        <title>Ollie Codes | Portfolio</title>
      </Head>
      <div className={styles.body}>
        <div className={styles.hero}>
          <img src={hero} alt="hero" />
          <h1>{title}</h1>
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>
        <ul>
          {projects.map((project, k) => (
            <div key={k}>
              <Link
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <h2 className={styles.link}>{project.name}</h2>
              </Link>
              <sup>
                {project.date &&
                  moment(project.date, "YYYY-MM-DDTHH:mm:ss.SSS").format(
                    "YYYY"
                  )}
              </sup>
              <p>{project.description}</p>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Portfolio;

export async function getStaticProps() {
  console.log("building...");
  const [blogpost] = await Promise.all([
    import(`../../content/portfolio.md`).catch(() => null),
  ]);
  const { attributes = {}, html } = blogpost?.default ?? {};
  return { props: { project: { attributes, html } } };
}
