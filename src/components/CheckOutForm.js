import axios from "axios";
import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ offerToBuy }) => {
  // STATES
  const [message, setMessage] = useState("");
  const [blockClic, setBlockClic] = useState(false);
  // Init
  const navigate = useNavigate();
  // init Stripe
  const stripe = useStripe();
  const elements = useElements();
  // functions
  const handleSubmit = async () => {
    setBlockClic(true);
    const userToken = Cookies.get("token");
    // const userToken = "BG-cQUOqKjfhZZx-";
    const userName = Cookies.get("userName");

    try {
      // verification de la carte
      const cardElement = elements.getElement(CardElement);
      const stripeResponse = await stripe.createToken(cardElement, {
        name: userName,
      });
      const stripeToken = stripeResponse.token.id;
      //   console.log("stripeToken = ", stripeToken);
      if (!stripeToken) {
        setMessage("les données de carte ne sont pas correctes");
        setBlockClic(false);
        return;
      }
      // interrogation du back-end
      setMessage("interrogation de votre banque en cours ...");
      const response = await axios.post(
        "https://site--backend-vinted--gw6mlgwnmzwz.code.run/payment",
        {
          stripeToken: stripeToken,
          offerId: offerToBuy._id,
          offerAmount: offerToBuy.product_price,
          globalAmount: (offerToBuy.product_price + 2.9).toFixed(2),
        },
        {
          headers: {
            authorization: "Bearer " + userToken,
          },
        }
      );
      if (response.data.message !== "payment succeeded") {
        setMessage("un problème est survenu pendant le paiement");
        setBlockClic(false);
        return;
      }
      setMessage("Félicitations pour votre achat !");
      setTimeout(() => {
        setBlockClic(false);
        navigate("/");
      }, 2000);
      //   console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  //Return
  return (
    <div className="container">
      <br />
      <p style={{ textAlign: "center", color: "green" }}>
        Résumé de la commande
      </p>
      <div className="payment">
        <section className="recap">
          <div className="ligne">
            <p>Commande</p>
            <p>{offerToBuy.product_price.toFixed(2)} €</p>
          </div>
          <div className="ligne">
            <p>Frais protection acheteurs</p>
            <p>0,40 €</p>
          </div>
          <div className="ligne">
            <p>Frais de port</p>
            <p>2,50 €</p>
          </div>
        </section>
        <div className="ligne total">
          <h2>TOTAL</h2>
          <span>{(offerToBuy.product_price + 2.9).toFixed(2)} €</span>
        </div>
        <p className="invitation">
          Veuillez entrer les informations de votre carte bancaire pour
          finaliser la commande.
        </p>
        <div className="card-elements">
          <CardElement />
        </div>
        {!blockClic && (
          <button onClick={handleSubmit} className="pay">
            <h3>PAYER</h3>
          </button>
        )}
        <h3 className="message">{message}</h3>
      </div>
    </div>
  );
};

export default CheckoutForm;
