// import { useState } from 'react'
import '../styles/About.scss';
import Banner from '../components/Banner';
import Accordion from '../components/Accordion';
import bannerAbout from '../assets/bannerAbout.png';
import accordionData from '../../data/accordionAbout.json';

function About() {
  return (
      <div className='about'>
        <Banner
        image={bannerAbout} // Remplacez par le chemin de votre image
        title=""
        />
        <div className='accordion-container'>
        {accordionData.map((accordion) => (
          <Accordion
            key={accordion.id}
            title={accordion.title}
            content={accordion.content}
            setLargeur='large'
          />
        ))}
        </div>
      </div>
  )
}

export default About
