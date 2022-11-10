import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const Login = ({ handleToken }) => {
  // STATES
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // INIT
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
        console.log(response.data);
        handleToken(response.data.token, response.data.account.username);
        navigate("/");
      } catch (error) {
        console.log("erreur 1 : ", error.message);
        if (error.response?.data.message === "Unauthorized") {
          setError("Attention, ces données ne correspondent à aucun compte");
        }
      }
    };
    event.preventDefault();
    fetchData();
  };

  // RETURN
  return (
    <form className="signup" onSubmit={handleSubmit}>
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
      <button type="submit" className="validation">
        Se connecter
      </button>
      <Link to="/signup">
        <p className="link">Pas encore de compte ? Inscris toi !</p>
      </Link>
      {error && <p className="info">{error}</p>}
    </form>
  );
};

export default Login;
