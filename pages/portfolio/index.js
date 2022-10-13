import React from "react";
import Head, { HEAD_TYPES } from "../../components/Head";
import Hero from "../../components/Hero";
import Row from "../../components/Row";
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const Portfolio = ({ project }) => {
  const { attributes, html } = project;
  const { title, hero, projects, description } = attributes;
  return (
    <>
      <Head
        title={`Ollie The Dev | ${title}`}
        description={description}
        type={HEAD_TYPES.website}
        image={hero}
      />
      <Navbar currentName="Portfolio"/>
      <div className="content-body">
        <Hero title={title} description={html} image={hero} />
        <div className="content-list">
          {projects.map((project, k) => (
            <Row
              key={project.link}
              link={project.link}
              title={project.name}
              description={project.description}
              date={project.date}
              dateFormat="YYYY"
              category="portfolio"
            />
          ))}
        </div>
      </div>
      <Footer />
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
