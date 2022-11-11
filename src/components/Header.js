import logoVinted from "../img/Vinted-logo.png";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Header = ({ token, handleToken, userName }) => {
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

  // return HERE
  return (
    <header>
      <div className="container content">
        <div className="left">
          <Link to="/">
            <img src={logoVinted} alt="logo vinted" />
          </Link>
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
          {token ? (
            <>
              <span className="user">{userName}</span>
              <button
                onClick={() => {
                  handleToken(null);
                }}
              >
                Se déconnecter
              </button>
            </>
          ) : (
            <>
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
            </>
          )}
          <button>Vends tes articles</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
