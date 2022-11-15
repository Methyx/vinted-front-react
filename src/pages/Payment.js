import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

//functions
import fetchDataOffer from "../functions/fetchDataOffer";
import CheckoutForm from "../components/CheckOutForm";

// Init Stripe
const stripePromise = loadStripe(
  "pk_test_51M4PsbGIHR25sy8oxUgHYndseauUB5MF18xv0Yrmrsr7bQ6vBTufDSKyhfmhulz0IxLycreDqiCmOI5lH2bL1UUq00bfzvkdpl"
);

const Payment = ({ setMaskSearch, setModalVisible }) => {
  // STATES
  const [offerToBuy, setOfferToBuy] = useState("");
  const [isBusy, setIsBusy] = useState(true);

  //init
  setMaskSearch(true);
  const offerId = useLocation().state.offerId;

  // USEEFFECT
  useEffect(() => {
    fetchDataOffer(offerId, setOfferToBuy, setIsBusy); // requete au back pour récupérer l'offer
  }, [offerId]);

  //Return
  return (
    <div className="background-color">
      {Cookies.get("token") ? (
        isBusy ? (
          <div className="container">Chargement...</div>
        ) : (
          <Elements stripe={stripePromise}>
            <CheckoutForm offerToBuy={offerToBuy} />
          </Elements>
        )
      ) : (
        <div>
          {setModalVisible("login")}Vous devez être connecté pour acheter
        </div>
      )}
    </div>
  );
};

export default Payment;
