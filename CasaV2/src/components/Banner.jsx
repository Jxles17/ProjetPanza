// Banner.jsx
import PropTypes from 'prop-types';
import '../styles/Banner.scss';

function Banner({ image, title }) {
  return (
    <div className='banner'>
      <img src={image} alt="" />
      <h1>{title}</h1>
    </div>
  );
}

Banner.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Banner;
