import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import fetchDataOffer from "../functions/fetchDataOffer";

const OfferDetails = ({ setMaskSearch }) => {
  // PARAMS
  const { id } = useParams();
  const navigate = useNavigate();
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  // USESTATES
  const [offer, setOffer] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // start HERE
  useEffect(() => {
    fetchDataOffer(id, setOffer, setIsLoading);
  }, [id]);

  // init
  const caracteristics = [];
  setMaskSearch(false);

  // RETURN Here
  return (
    <>
      {isLoading ? (
        <p className="container is-loading">Chargement en cours</p>
      ) : (
        <div className="background-color">
          <div className="container offer-details">
            <section className="offer-details-picture-container">
              <Carousel
                responsive={responsive}
                // ssr
                showDots={true}
                slidesToSlide={1}
                swipeable={true}
                containerClass="carousel-container"
                deviceType={""}
              >
                {offer.product_image.map((picture, index) => {
                  return (
                    <img
                      className="carousel-image-item"
                      key={index}
                      src={picture.secure_url}
                      alt="produit"
                    />
                  );
                })}
              </Carousel>
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
                    if (item[key]) {
                      caracteristics.push(item[key]);
                    } else {
                      caracteristics.push("-unknown-");
                    }
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
              <button
                className="buy"
                onClick={() =>
                  navigate("/payment", {
                    state: {
                      offerId: id,
                    },
                  })
                }
              >
                Acheter
              </button>
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default OfferDetails;
