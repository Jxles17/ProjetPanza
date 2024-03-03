// Home.jsx
import '../styles/Home.scss';
import Banner from '../components/Banner';
import Accommodation from '../components/Accommodation';
import bannerHome from '../assets/bannerHome.png';

function Home() {
  return (
    <div className='home'>
      <Banner
        image={bannerHome} // Remplacez par le chemin de votre image
        title="Chez vous, partout et ailleurs"
      />
      <Accommodation />
    </div>
  );
}

export default Home;
