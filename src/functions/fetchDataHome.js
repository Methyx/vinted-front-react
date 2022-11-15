import axios from "axios";

const fetchDataHome = async (
  page,
  inputSearch,
  minPrice,
  maxPrice,
  descendingPrices,
  nbOffersPerPage,
  setIsLoading,
  setOffers
) => {
  // construction de la requete
  let url = "https://site--backend-vinted--gw6mlgwnmzwz.code.run/offers";
  //      page à afficher
  url += "?page=" + page;
  //      texte à rechercher (dans titre ou description)
  if (inputSearch) {
    url += "&title=" + inputSearch;
    // url += "&description=" + inputSearch;
  }
  //      prix minimum / maximum
  if (Number(minPrice) > 0) {
    url += "&priceMin=" + minPrice;
  }
  if (Number(maxPrice) > 0) {
    url += "&priceMax=" + maxPrice;
  }
  //      prix ascending / descending
  if (descendingPrices) {
    url += "&sort=price-desc";
  } else {
    url += "&sort=price-asc";
  }
  //     Nombre d'offres par page
  url += "&nbOffersPerPage=" + nbOffersPerPage;

  // console.log(url);
  setIsLoading(true);
  try {
    const response = await axios.get(url);
    setOffers(response.data);
    setIsLoading(false);
  } catch (error) {
    console.log(error.message);
  }
};

export default fetchDataHome;
