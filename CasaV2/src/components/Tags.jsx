import PropTypes from 'prop-types';
import '../styles/Tags.scss';

function Tag({ value }) {
  return (
    <div className='tags'>
      {value.map((tag, index) => (
        <div key={index} className='tag'>
          {tag}
        </div>
      ))}
    </div>
  );
}

Tag.propTypes = {
  value: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Tag;
