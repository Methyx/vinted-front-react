import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

// Pages
import Home from "./pages/Home";
import OfferDetails from "./pages/OfferDetails";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";

// Components
import Header from "./components/Header";

function App() {
  // UseStates
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [userName, setUserName] = useState(Cookies.get("userName") || "");
  const [inputSearch, setInputSearch] = useState("");
  const [descendingPrices, setDescendingPrices] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [page, setPage] = useState(1);
  // Init d'un tableau de params pour passer en props
  const sortParams = {
    text: [inputSearch, setInputSearch],
    priceSort: [descendingPrices, setDescendingPrices],
    priceMin: [minPrice, setMinPrice],
    priceMax: [maxPrice, setMaxPrice],
  };
  // functions
  const handleToken = (token, userName) => {
    if (token) {
      setToken(token);
      setUserName(userName);
      Cookies.set("token", token, { expires: 7 });
      Cookies.set("userName", userName, { expires: 7 });
    } else {
      setToken(null);
      setUserName("");
      Cookies.remove("token");
      Cookies.remove("userName");
    }
  };

  return (
    <Router>
      <Header
        token={token}
        handleToken={handleToken}
        userName={userName}
        sortParams={sortParams}
        setPage={setPage}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home sortParams={sortParams} page={page} setPage={setPage} />
          }
        ></Route>
        <Route path="/offer/:id" element={<OfferDetails />}></Route>
        <Route
          path="/signup"
          element={<SignUp handleToken={handleToken} />}
        ></Route>
        <Route
          path="/login"
          element={<Login handleToken={handleToken} />}
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
