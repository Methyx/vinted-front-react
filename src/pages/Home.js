import banner from "../img/banner-wide.jpg";
import tear from "../img/tear.svg";

import axios from "axios";
import { useState, useEffect } from "react";

import MiniOffer from "../components/MiniOffer";

const Home = ({ sortParams, page, setPage }) => {
  // USESTATES du composant
  const [offers, setOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // récupération des STATES passés en params
  const inputSearch = sortParams.text[0];
  const descendingPrices = sortParams.priceSort[0];
  const minPrice = sortParams.priceMin[0];
  const maxPrice = sortParams.priceMax[0];

  // start HERE

  useEffect(() => {
    const fetchData = async () => {
      // construction de la requete
      let url = "https://site--backend-vinted--gw6mlgwnmzwz.code.run/offers";
      //      page à afficher
      url += "?page=" + page;
      //      texte à rechercher (dans titre ou description)
      if (inputSearch) {
        url += "&title=" + inputSearch;
        // url += "&description=" + inputSearch;
      }
      //      prix minimum
      if (Number(minPrice) > 0) {
        url += "&priceMin=" + minPrice;
      }
      if (Number(maxPrice) > 0) {
        url += "&priceMax=" + maxPrice;
      }
      if (descendingPrices) {
        url += "&sort=price-desc";
      } else {
        url += "&sort=price-asc";
      }
      console.log(url);
      setIsLoading(true);
      try {
        const response = await axios.get(url);
        // const response = await axios.get(
        //   "https://lereacteur-vinted-api.herokuapp.com/offers"
        // );
        setOffers(response.data);
        // console.log(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [page, inputSearch, minPrice, maxPrice, descendingPrices]);

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
          <>
            <div className="handle-page container">
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
            </div>
            <div className="offers-list">
              {offers.offers.map((offer) => {
                return <MiniOffer key={offer._id} offer={offer} />;
              })}
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default Home;
