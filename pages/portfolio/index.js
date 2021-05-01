import React from "react";
import Head, { HEAD_TYPES } from "../../components/Head";
import styles from "../../styles/Portfolio.module.scss";
import Hero from "../../components/Hero";
import Row from "../../components/Row";

const Portfolio = ({ project }) => {
  const { attributes, html } = project;
  const { title, hero, projects, description } = attributes;
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
          {projects.map((project, k) => (
            <Row
              key={project.link}
              link={project.link}
              title={project.name}
              description={project.description}
              date={project.date}
              dateFormat="YYYY"
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Portfolio;

export async function getStaticProps() {
  const [post] = await Promise.all([
    import(`../../content/portfolio.md`).catch(() => null),
  ]);
  const { attributes = {}, html } = post?.default ?? {};
  return { props: { project: { attributes, html } } };
}
