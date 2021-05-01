import React from "react";
import moment from "moment";
import Head, {HEAD_TYPES} from '../../components/Head';
import styles from "../../styles/Portfolio.module.scss";

const Portfolio = ({ project }) => {
  const { attributes, html } = project;
  const { title, hero, projects, description } = attributes;
  return (
    <>
      <Head title={`Ollie Codes | ${title}`}
        description={description}
        type={HEAD_TYPES.website}
        image={hero}/>
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
  const [post] = await Promise.all([
    import(`../../content/portfolio.md`).catch(() => null),
  ]);
  const { attributes = {}, html } = post?.default ?? {};
  return { props: { project: { attributes, html } } };
}
