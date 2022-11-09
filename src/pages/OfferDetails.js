import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const OfferDetails = () => {
  // PARAMS
  const { id } = useParams();

  // USESTATES
  const [offer, setOffer] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // functions

  // start HERE
  useEffect(() => {
    const fetchData = async (url) => {
      try {
        const response = await axios.get(url);
        setOffer(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    const url =
      "https://site--backend-vinted--gw6mlgwnmzwz.code.run/offer/" + id;
    fetchData(url);
  }, []);

  // RETURN Here
  return (
    <>
      {isLoading ? (
        <p className="container is-loading">Chargement en cours</p>
      ) : (
        <div className="background-color">
          <div className="container offer-detail">
            <section className="picture">
              {offer.product_image[0]?.secure_url && (
                <img src={offer.product_image[0].secure_url} alt="produit" />
              )}
            </section>
            <section className="offer-description">
              <h1>{offer.product_price.toFixed(2)} €</h1>
              <div className="main-details">
                <section className="title">
                  <p>MARQUE</p>
                  <p>TAILLE</p>
                  <p>ETAT</p>
                  <p>COULEUR</p>
                  <p>EMPLACEMENT</p>
                  <p>MODE DE PAIEMENT</p>
                </section>
                <section className="information">
                  {offer.product_details[2]?.MARQUE && (
                    <p>{offer.product_details[2].MARQUE}</p>
                  )}
                  {offer.product_details[4]?.TAILLE && (
                    <p>{offer.product_details[4].TAILLE}</p>
                  )}
                  {offer.product_details[0]?.ETAT && (
                    <p>{offer.product_details[0].ETAT}</p>
                  )}
                  {offer.product_details[3]?.COULEUR && (
                    <p>{offer.product_details[3].COULEUR}</p>
                  )}
                  {offer.product_details[1]?.EMPLACEMENT && (
                    <p>{offer.product_details[1].EMPLACEMENT}</p>
                  )}
                  {offer.product_details[5] && (
                    <p>{offer.product_details[5]["MODE DE PAIEMENT"]}</p>
                  )}
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
                  <p>{offer.owner.account.username}</p>
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
