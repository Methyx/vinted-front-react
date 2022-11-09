import banner from "../img/banner-wide.jpg";
import tear from "../img/tear.svg";

import axios from "axios";
import { useState, useEffect } from "react";

import MiniOffer from "../components/MiniOffer";

const Home = () => {
  // USESTATES
  const [offers, setOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  // functions
  const handlePage = (page) => {};

  // start HERE

  useEffect(() => {
    const fetchData = async () => {
      const url =
        "https://site--backend-vinted--gw6mlgwnmzwz.code.run/offers?page=" +
        page;
      try {
        const response = await axios.get(url);
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
  }, [page]);

  const nbPages = Math.ceil(offers.count / 5);

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
      <section className="handle-page container">
        <>
          {page > 1 && (
            <button
              onClick={() => {
                if (page > 1) {
                  setPage(page - 1);
                }
              }}
            >
              {"<"}
            </button>
          )}
          <span>{`  ${page}/${nbPages}  `}</span>
          {page < nbPages && (
            <button
              onClick={() => {
                if (page < nbPages) {
                  setPage(page + 1);
                }
              }}
            >
              {">"}
            </button>
          )}
        </>
      </section>
    </>
  );
};

export default Home;
