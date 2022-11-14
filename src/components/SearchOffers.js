import { FormControlLabel } from "@mui/material";
import Switch from "@mui/material/Switch";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

const SearchOffers = ({ sortParams, setPage }) => {
  // récupération des STATES passés en params
  const [inputSearch, setInputSearch] = sortParams.text;
  const [descendingPrices, setDescendingPrices] = sortParams.priceSort;
  const [minPrice, setMinPrice] = sortParams.priceMin;
  const [maxPrice, setMaxPrice] = sortParams.priceMax;

  // functions
  const handleSubmitSearch = (event) => {
    event.preventDefault();
    console.log("recherche demandée : ", inputSearch);
    setInputSearch("");
  };

  // RETURN here
  return (
    <form onSubmit={handleSubmitSearch} className="search-form">
      <div className="top">
        <input
          type="text"
          placeholder="Recherche des articles"
          value={inputSearch}
          onChange={(event) => {
            setInputSearch(event.target.value);
            setPage(1);
          }}
        />
      </div>
      <div className="bottom">
        <div className="check">
          <span>↗</span>
          <FormControlLabel
            control={
              <Switch
                // defaultChecked
                value={descendingPrices}
                size="small"
                onChange={(event) => {
                  setDescendingPrices(!descendingPrices);
                  setPage(1);
                }}
              />
            }
            label="prix"
            labelPlacement="top"
          />
          <span>↘</span>
        </div>
        <div className="slider">
          <p>Fourchette de prix</p>
          <br></br>
          <Box sx={{ width: 8 / 10 }}>
            <Slider
              value={[minPrice, maxPrice]}
              min={0}
              max={1000}
              step={50}
              size="small"
              onChange={(event) => {
                setMinPrice(event.target.value[0]);
                setMaxPrice(event.target.value[1]);
                setPage(1);
              }}
              valueLabelDisplay="on"
            />
          </Box>
        </div>
      </div>
    </form>
  );
};
export default SearchOffers;
