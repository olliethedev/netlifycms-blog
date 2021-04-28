import React from "react";
import Head from "next/head";
import moment from "moment";
import styles from "../../styles/Portfolio.module.css";

const Experiments = ({ project }) => {
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
          <img className="hero-pop" src={hero} alt="hero" />
          <h1>{title}</h1>
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>
        <ul>
          {projects.map((project, k) => (
            <div key={k}>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <h2 className={styles.link}>{project.name}</h2>
              </a>
              <sup>
                {project.date &&
                  moment(project.date, "YYYY-MM-DDTHH:mm:ss.SSS").format(
                    "MMM YYYY"
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

export default Experiments;

export async function getStaticProps() {
  console.log("building...");
  const [experiments] = await Promise.all([
    import(`../../content/experiments.md`).catch(() => null),
  ]);
  const { attributes = {}, html } = experiments?.default ?? {};
  return { props: { project: { attributes, html } } };
}
