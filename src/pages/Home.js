import banner from "../img/banner-wide.jpg";
import tear from "../img/tear.svg";

import axios from "axios";
import { useState, useEffect } from "react";

import MiniOffer from "../components/MiniOffer";

const Home = () => {
  // USESTATES
  const [offers, setOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // functions

  // start HERE

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://site--backend-vinted--gw6mlgwnmzwz.code.run/offers?page=1"
        );
        // const response = await axios.get(
        //   "https://lereacteur-vinted-api.herokuapp.com/offers"
        // );
        setOffers(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, []);

  // RETURN Here
  return (
    <>
      <section className="home-hero">
        <img className="ban" src={banner} alt="banniere" />
        <img className="tear" src={tear} alt="dechirure" />
        <div className="action-box container">
          <p>Prêts à faire du tri dans vos placards ?</p>
          <button>Commencer à vendre</button>
        </div>
      </section>
      <section className="offers container">
        {isLoading ? (
          <p className="is-loading">Chargement en cours</p>
        ) : (
          <div className="offers-list">
            {offers.offers.map((offer) => {
              return <MiniOffer key={offer._id} offer={offer} />;
            })}
          </div>
        )}
      </section>
    </>
  );
};

export default Home;
