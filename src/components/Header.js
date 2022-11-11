import logoVinted from "../img/Vinted-logo.png";
import { useNavigate, Link } from "react-router-dom";

// Components
import SearchOffers from "./SearchOffers";

const Header = ({ token, handleToken, userName, sortParams, setPage }) => {
  // Init
  const navigate = useNavigate();

  // return HERE
  return (
    <header>
      <div className="container content">
        <section className="left">
          <Link to="/">
            <img src={logoVinted} alt="logo vinted" />
          </Link>
        </section>
        <section className="center">
          <SearchOffers
            sortParams={sortParams}
            setPage={setPage}
          ></SearchOffers>
        </section>
        <section className="right">
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
        </section>
      </div>
    </header>
  );
};

export default Header;
