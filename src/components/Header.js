import logoVinted from "../img/Vinted-logo.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  // Init
  const navigate = useNavigate();

  //STATES
  const [inputSearch, setInputSearch] = useState("");

  // functions
  const handleSubmitSearch = (event) => {
    event.preventDefault();
    console.log("recherche demandée : ", inputSearch);
    setInputSearch("");
  };

  return (
    <header>
      <div className="container content">
        <div className="left">
          <img src={logoVinted} alt="logo vinted" />
        </div>
        <div className="center">
          <form onSubmit={handleSubmitSearch}>
            <input
              type="text"
              placeholder="Recherche des articles"
              value={inputSearch}
              onChange={(event) => {
                setInputSearch(event.target.value);
              }}
            />
          </form>
        </div>
        <div className="right">
          <button
            onClick={() => {
              navigate("/signup");
            }}
          >
            S'inscrire
          </button>
          <button
            onClick={() => {
              navigate("/login");
            }}
          >
            Se connecter
          </button>
          <button>Vends tes articles</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
