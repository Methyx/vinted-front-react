import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const Login = ({ handleToken, setModalVisible }) => {
  // STATES
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  //Init
  const navigate = useNavigate();
  // functions
  const handleSubmit = (event) => {
    const fetchData = async () => {
      setError("");
      const user = {
        email: mail,
        password: password,
      };
      try {
        const response = await axios.post(
          "https://site--backend-vinted--gw6mlgwnmzwz.code.run/user/login",
          user
        );
        // console.log(response.data);
        if (response.data.token) {
          handleToken(response.data.token, response.data.account.username);
          setModalVisible("");
          document.body.style.overflow = "auto";
        } else {
          setError("Désolé, une erreur s'est produite. Veuillez réessayer SVP");
        }
      } catch (error) {
        console.log("erreur 1 : ", error.message);
        if (error.response?.data.message === "Unauthorized") {
          setError("Ces données ne correspondent à aucun compte");
        }
      }
    };
    event.preventDefault();
    fetchData();
  };

  // RETURN
  return (
    <form className="modal" onSubmit={handleSubmit}>
      <h1>Se connecter</h1>
      <input
        className="text"
        type="email"
        placeholder="Email"
        value={mail}
        onChange={(event) => {
          setMail(event.target.value);
        }}
      />
      <input
        className="text"
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      {error && <p className="info">{error}</p>}
      <button type="submit" className="validation">
        Se connecter
      </button>

      <p
        onClick={() => {
          setModalVisible("signup");
        }}
        className="link"
      >
        Pas encore de compte ? Inscris toi !
      </p>
      <h6
        onClick={() => {
          setModalVisible("");
          document.body.style.overflow = "auto";
          navigate("/");
        }}
      >
        retour sur la page d'accueil
      </h6>
    </form>
  );
};

export default Login;
