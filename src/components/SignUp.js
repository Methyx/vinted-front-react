import { useState } from "react";
// import { useNavigate } from "react-router-dom";

import axios from "axios";

// import avatarDefault from "../img/avatar2.png";
// import convertToBase64 from "../functions/convertToBase64";

const SignUp = ({ handleToken, setModalVisible }) => {
  // STATES
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [newsLetter, setNewsletter] = useState(false);
  const [result, setResult] = useState("");

  // INIT
  // const navigate = useNavigate();
  // const returnHome = () => {
  //   setModalVisible("");
  // };

  // functions
  const handleSubmit = (event) => {
    const fetchData = async () => {
      setResult("");
      // const formData = new FormData();
      let data = {};
      if (name && mail && password) {
        // formData.append("username", name);
        // formData.append("email", mail);
        // formData.append("password", password);
        // formData.append("newsletter", newsLetter);
        // formData.append("picture", convertToBase64(avatarDefault));
        data = {
          username: name,
          email: mail,
          password: password,
          newsletter: newsLetter,
        };
      } else {
        setResult("Veuillez remplir tous les champs, SVP");
        return;
      }
      try {
        const response = await axios.post(
          "https://site--backend-vinted--gw6mlgwnmzwz.code.run/user/signup",
          // formData
          data
        );
        if (response.data.token) {
          setResult("Félicitation, votre compte a bien été créé.");
          handleToken(response.data.token, name);
          setTimeout(() => {
            setModalVisible("");
            document.body.style.overflow = "auto";
          }, 2000);
        } else {
          setResult("Désolé, un problème a eu lieu. Veuillez réessayez SVP");
        }
      } catch (error) {
        console.log("erreur 1 : ", error.message);
        if (error.response?.data.message === "email already exists") {
          setResult("Désolé : Cet email existe déjà !");
        }
      }
    };
    event.preventDefault();
    fetchData();
  };

  // RETURN
  return (
    <form className="modal" onSubmit={handleSubmit}>
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
          checked={newsLetter}
          onChange={(event) => setNewsletter(!newsLetter)}
        ></input>
        <span>S'inscrire à notre NewsLetter</span>
        <p>
          En m'inscrivant, je confirme avoir lu et accepté les Termes &
          Conditions et Politique de Confidentialité de Vinted. Je confirme
          avoir au moins 18 ans.
        </p>
      </div>
      {result && <p className="info">{result}</p>}
      <button type="submit" className="validation">
        S'inscrire
      </button>

      <p
        onClick={() => {
          setModalVisible("login");
        }}
        className="link"
      >
        Tu as déjà un compte ? Connecte toi !
      </p>
    </form>
  );
};

export default SignUp;
