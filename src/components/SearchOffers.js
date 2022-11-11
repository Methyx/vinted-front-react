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
          <input
            type="checkbox"
            checked={descendingPrices}
            onChange={() => {
              setDescendingPrices(!descendingPrices);
              setPage(1);
            }}
          />
          <span>prix ↘</span>
        </div>
        <input
          type="text"
          placeholder="prix min"
          value={minPrice}
          onChange={(event) => {
            setMinPrice(event.target.value);
            setPage(1);
          }}
        />
        <input
          type="text"
          placeholder="prix max"
          value={maxPrice}
          onChange={(event) => {
            setMaxPrice(event.target.value);
            setPage(1);
          }}
        />
      </div>
    </form>
  );
};
export default SearchOffers;
