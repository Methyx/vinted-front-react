import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const OfferDetails = () => {
  // PARAMS
  const { id } = useParams();

  // USESTATES
  const [offer, setOffer] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // start HERE
  useEffect(() => {
    const fetchData = async () => {
      //eslint - disable - next - line;
      const url =
        "https://site--backend-vinted--gw6mlgwnmzwz.code.run/offer/" + id;
      try {
        const response = await axios.get(url);
        setOffer(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [id]);

  // init
  const caracteristics = [];

  // RETURN Here
  return (
    <>
      {isLoading ? (
        <p className="container is-loading">Chargement en cours</p>
      ) : (
        <div className="background-color">
          <div className="container offer-details">
            <section className="picture">
              {offer.product_image[0]?.secure_url && (
                <img src={offer.product_image[0].secure_url} alt="produit" />
              )}
            </section>
            <section className="offer-description">
              <h1>{offer.product_price.toFixed(2)} €</h1>
              <div className="main-details">
                <section className="title">
                  {caracteristics.map((item, index) => {
                    return <p>{item.name}</p>;
                  })}
                  {offer.product_details.map((item, index) => {
                    const key = Object.keys(item)[0];
                    caracteristics.push(item[key]);
                    return <p key={index}>{key}</p>;
                  })}
                </section>
                <section className="information">
                  {caracteristics.map((item, index) => {
                    return <p key={index}>{item}</p>;
                  })}
                </section>
              </div>
              <h2>{offer.product_name && offer.product_name}</h2>
              <h3>{offer.product_description && offer.product_description}</h3>

              {offer.owner && (
                <div className="owner">
                  {offer.owner.account.avatar?.secure_url && (
                    <img
                      src={offer.owner.account.avatar.secure_url}
                      alt="avatar"
                    />
                  )}
                  <span>{offer.owner.account.username}</span>
                </div>
              )}
              <button className="buy">Acheter</button>
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default OfferDetails;
