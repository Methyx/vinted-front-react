import logoVinted from "../img/Vinted-logo.png";
import { useState } from "react";

const Header = () => {
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
          <button>S'inscrire</button>
          <button>Se connecter</button>
          <button>Vends tes articles</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
