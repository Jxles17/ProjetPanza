import PropTypes from 'prop-types';
import '../styles/Host.scss';

function Host({hostDetail}) {

  return (
    <div className='host'>
      <div className='host-name'>{hostDetail.name}</div>
      <div className='host-picture'>
      {hostDetail.picture && (
        <img src={hostDetail.picture} alt="host-picture" />
      )}
      </div>
    </div>
  )
}

Host.propTypes = {
  hostDetail: PropTypes.object.isRequired,
};

export default Host;
