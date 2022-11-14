//ressources
import banner from "../img/banner-wide.jpg";
import tear from "../img/tear.svg";

//init
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Components
import MiniOffer from "../components/MiniOffer";

//functions
import fetchDataHome from "../functions/fetchDataHome";

const Home = ({ sortParams, page, setPage, setCreateOffer }) => {
  // USESTATES du composant
  const [offers, setOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [nbOffersPerPage, setNbOffersPerPage] = useState(10);

  // récupération des STATES passés en params
  const inputSearch = sortParams.text[0];
  const descendingPrices = sortParams.priceSort[0];
  const minPrice = sortParams.priceMin[0];
  const maxPrice = sortParams.priceMax[0];

  // start HERE

  useEffect(() => {
    fetchDataHome(
      page,
      inputSearch,
      minPrice,
      maxPrice,
      descendingPrices,
      nbOffersPerPage,
      setIsLoading,
      setOffers
    );
  }, [
    page,
    inputSearch,
    minPrice,
    maxPrice,
    descendingPrices,
    nbOffersPerPage,
  ]);

  const nbPages = Math.ceil(offers.count / nbOffersPerPage);
  const navigate = useNavigate();
  setCreateOffer(false);
  // RETURN Here
  return (
    <>
      <section className="home-hero">
        <img className="ban" src={banner} alt="banniere" />
        <img className="tear" src={tear} alt="dechirure" />
        <div className="action-box container">
          <p>Prêts à faire du tri dans vos placards ?</p>
          <button
            onClick={() => {
              navigate("/publish");
            }}
          >
            Commencer à vendre
          </button>
        </div>
      </section>
      <section className="offers container">
        {isLoading ? (
          <p className="is-loading">Chargement en cours</p>
        ) : (
          <>
            <div className="nb-offers-container">
              <span>Nombre d'offres : {offers.count}</span>
              <div>
                <span>Nombre d'offres par page : </span>
                <input
                  type="number"
                  value={nbOffersPerPage}
                  onChange={(event) => {
                    if (event.target.value >= 0) {
                      setNbOffersPerPage(event.target.value);
                      setPage(1);
                    } else {
                      setNbOffersPerPage(0);
                      setPage(1);
                    }
                  }}
                />
              </div>
            </div>
            <div className="offers-list">
              {offers.offers.map((offer) => {
                return <MiniOffer key={offer._id} offer={offer} />;
              })}
            </div>
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
          </>
        )}
      </section>
    </>
  );
};

export default Home;
