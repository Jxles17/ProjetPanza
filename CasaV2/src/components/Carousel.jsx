import { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/Carousel.scss';

function Carousel({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    // La fonction setCurrentIndex met à jour l'index actuel en fonction de l'index précédent.
    // Si l'index actuel est 0 (première image), le nouvel index devient le dernier index (images.length - 1),
    // sinon, le nouvel index est l'index précédent (prevIndex - 1).
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };
  
  const goToNext = () => {
    // La fonction setCurrentIndex met à jour l'index actuel en fonction de l'index précédent.
    // Si l'index actuel est le dernier index (images.length - 1), le nouvel index devient 0 (première image),
    // sinon, le nouvel index est l'index suivant (prevIndex + 1).
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };
  
  
  const shouldDisplayButtons = images.length > 1;

  return (
    <div className="carousel">
      {shouldDisplayButtons && (
        <button className='chevron prev' onClick={goToPrevious}>
            <svg viewBox="0 0 33 32" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.2897 10.7897C15.9591 10.1202 17.0462 10.1202 17.7157 10.7897L27.9979 21.0719C28.6674 21.7414 28.6674 22.8285 27.9979 23.4979C27.3285 24.1673 26.2414 24.1673 25.572 23.4979L16.5 14.4259L7.42804 23.4926C6.75862 24.162 5.67148 24.162 5.00206 23.4926C4.33265 22.8231 4.33265 21.736 5.00206 21.0666L15.2843 10.7843L15.2897 10.7897Z" fill="white"/>
            </svg>
        </button>
      )}
      <img src={images[currentIndex]} alt={`Image ${currentIndex + 1}`} />
      {shouldDisplayButtons && (
        <button className='chevron next' onClick={goToNext}>
            <svg viewBox="0 0 33 32" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.2897 10.7897C15.9591 10.1202 17.0462 10.1202 17.7157 10.7897L27.9979 21.0719C28.6674 21.7414 28.6674 22.8285 27.9979 23.4979C27.3285 24.1673 26.2414 24.1673 25.572 23.4979L16.5 14.4259L7.42804 23.4926C6.75862 24.162 5.67148 24.162 5.00206 23.4926C4.33265 22.8231 4.33265 21.736 5.00206 21.0666L15.2843 10.7843L15.2897 10.7897Z" fill="white"/>
            </svg>
        </button>
      )}
      {shouldDisplayButtons && (
      <p className="image-counter">{currentIndex + 1} / {images.length}</p>
      )}
    </div>
  );
}

Carousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Carousel;
