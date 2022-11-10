import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import avatarDefault from "../img/avatar2.png";

const SignUp = ({ handleToken }) => {
  // STATES
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [newsLetter, setNewsletter] = useState(false);
  const [result, setResult] = useState("");

  // INIT
  const navigate = useNavigate();
  const returnHome = () => {
    navigate("/");
  };

  // functions
  const handleSubmit = (event) => {
    const fetchData = async () => {
      const formData = new FormData();
      setResult("");
      formData.append("username", name);
      formData.append("email", mail);
      formData.append("password", password);
      formData.append("newsletter", newsLetter);
      formData.append("picture", avatarDefault);
      try {
        const response = await axios.post(
          "https://site--backend-vinted--gw6mlgwnmzwz.code.run/user/signup",
          formData
        );
        setResult("Félicitation, votre compte a bien été créé.");
        handleToken(response.data.token, name);
        setTimeout(returnHome, 2000);
      } catch (error) {
        console.log("erreur 1 : ", error.message);
        if (error.response?.data.message === "email already exists") {
          setResult("Impossible : Cet email existe déjà !");
        }
      }
    };
    event.preventDefault();
    fetchData();
  };

  // RETURN
  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h1>S'inscrire</h1>
      <input
        className="text"
        type="text"
        placeholder="Nom d'utilisateur"
        value={name}
        onChange={(event) => {
          setName(event.target.value);
        }}
      />
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
      <div className="newsletter">
        <input
          className="check"
          type="checkbox"
          value={newsLetter}
          onChange={(event) => setNewsletter(!newsLetter)}
        ></input>
        <span>S'inscrire à notre NewsLetter</span>
        <p>
          En m'inscrivant, je confirme avoir lu et accepté les Termes &
          Conditions et Politique de Confidentialité de Vinted. Je confirme
          avoir au moins 18 ans.
        </p>
      </div>
      <button type="submit" className="validation">
        S'inscrire
      </button>
      <Link to="/login">
        <p className="link">Tu as déjà un compte ? Connecte toi !</p>
      </Link>
      {result && <p className="info">{result}</p>}
    </form>
  );
};

export default SignUp;
