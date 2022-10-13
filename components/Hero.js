import React from 'react'
import PropTypes from 'prop-types'

const Hero = ({image, title, description}) => {
    return (
        <div className="flex flex-col items-center mx-auto max-w-7xl ">
          <img className="w-20 h-20 rounded-full" src={image} alt="hero" />
          <h1 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>{title}</h1>
          <div className='mx-auto mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4' dangerouslySetInnerHTML={{ __html: description }} />
        </div>
    )
}

Hero.propTypes = {
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
}

export default Hero
