import { useParams, Navigate } from "react-router-dom";
import "../styles/AccommodationDetail.scss";
import Carousel from "../components/Carousel";
import Tags from "../components/Tags";
import Accordion from "../components/Accordion";
import Rating from "../components/Rating";
import Host from "../components/Host";
import { useEffect, useState } from "react";

function AccommodationDetail() {
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [logement, setLogement] = useState({});

  useEffect(() => {
    fetch("http://localhost:3000/api/logements/" + id)
      .then((response) => response.json())
      .then((data) => {
        setLogement(data);
        setLoading(true);
      })
      .catch((err) => {
        console.log(err.message);
        fetch("../../data/logements.json")
          .then((response) => response.json())
          .then((data) => {
            const logementFind = data.find((loge) => loge.id === id);
            console.log(logementFind);
            setLogement(logementFind);
            setLoading(true);
          })
          .catch((err) => {
            console.log(err.message);
          });
      });
  }, []);

  if (!logement || !id) {
    return <Navigate to="/404" />;
  }

  return loading ? (
    <div className="logement-detail">
      <Carousel images={logement.pictures} />
      <div className="logement-carac">
        <div className="logement-carac__title">
          <h1>{logement.title}</h1>
          <div className="location">{logement.location}</div>
          <Tags value={logement.tags} />
        </div>
        <div className="logement-carac__rating">
          <Host hostDetail={logement.host} />
          <Rating rating={logement.rating} />
        </div>
      </div>
      <div className="accordion-container">
        <Accordion title="Description" content={logement.description} setLargeur="medium" />
        <Accordion title="Équipements" content={logement.equipments} setLargeur="medium" />
      </div>
    </div>
  ) : (
    <p>Chargement des données</p>
  );
}

export default AccommodationDetail;
