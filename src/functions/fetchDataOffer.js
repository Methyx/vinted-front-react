import axios from "axios";

const fetchDataOffer = async (id, setOffer, setIsLoading) => {
  const url = "https://site--backend-vinted--gw6mlgwnmzwz.code.run/offer/" + id;
  try {
    const response = await axios.get(url);
    setOffer(response.data);
    setIsLoading(false);
  } catch (error) {
    console.log(error.message);
  }
};

export default fetchDataOffer;
