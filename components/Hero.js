import React from 'react'
import PropTypes from 'prop-types'
import styles from "../styles/Hero.module.scss";

const Hero = ({image, title, description}) => {
    return (
        <div className={styles.hero}>
          <img className="hero-pop" src={image} alt="hero" />
          <h1>{title}</h1>
          <div dangerouslySetInnerHTML={{ __html: description }} />
        </div>
    )
}

Hero.propTypes = {
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
}

export default Hero
