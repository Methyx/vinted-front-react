import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Publish = ({ setModalVisible, setMaskSearch }) => {
  const navigate = useNavigate();
  setMaskSearch(true);

  // STATES
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState();
  const [pictures, setPictures] = useState();
  const [alert, setAlert] = useState("");

  const handlePostOffer = async (event) => {
    event.preventDefault();
    setAlert("");
    if (!title || !description || !price) {
      setAlert(
        "Merci de bien vouloir remplir au minimum 1 titre, 1 description et 1 prix pour publier"
      );
    }
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("brand", brand);
      formData.append("size", size);
      formData.append("color", color);
      formData.append("condition", state);
      formData.append("city", city);
      formData.append("price", price);
      formData.append("picture", pictures[0]);
      const response = await axios.post(
        "https://site--backend-vinted--gw6mlgwnmzwz.code.run/offer/publish",
        formData,
        {
          headers: {
            authorization: "Bearer " + Cookies.get("token"),
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data) {
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      {Cookies.get("token") ? (
        <form className="background-color" onSubmit={handlePostOffer}>
          <div className="container new-offer">
            <h1>Vends ton article</h1>
            <div className="new-offer-upload">
              <h2>Ajoute une photo</h2>
              <div className="upload-container">
                {pictures ? (
                  <img
                    src={URL.createObjectURL(pictures[0])}
                    alt="product"
                    className="object-img"
                  ></img>
                ) : (
                  <>
                    <label htmlFor="offer-picture">Choisis une image</label>
                    <input
                      id="offer-picture"
                      type="file"
                      style={{ display: "none" }}
                      //   multiple
                      accept="image/*"
                      onChange={(event) => {
                        const tabKeys = Object.keys(event.target.files);
                        const tabPictures = tabKeys.map((item) => {
                          return event.target.files[item];
                        });
                        setPictures(tabPictures);
                      }}
                    />
                  </>
                )}
              </div>
            </div>
            <div className="new-offer-description">
              <section>
                <p>Titre</p>
                <input
                  type="text"
                  placeholder="ex: Chemise Sézane verte"
                  value={title}
                  onChange={(event) => {
                    setTitle(event.target.value);
                  }}
                />
              </section>
              <section className="description">
                <p>Décris ton article</p>
                <textarea
                  rows="5"
                  placeholder="ex: porté quelquefois, taille correctement"
                  value={description}
                  onChange={(event) => {
                    setDescription(event.target.value);
                  }}
                ></textarea>
              </section>
            </div>
            <div className="new-offer-details">
              <section>
                <p>Marque</p>
                <input
                  type="text"
                  placeholder="ex: Zara"
                  value={brand}
                  onChange={(event) => {
                    setBrand(event.target.value);
                  }}
                />
              </section>
              <section>
                <p>Taille</p>
                <input
                  type="text"
                  placeholder="ex: L / 40 / 12"
                  value={size}
                  onChange={(event) => {
                    setSize(event.target.value);
                  }}
                />
              </section>
              <section>
                <p>Couleur</p>
                <input
                  type="text"
                  placeholder="ex: Fushia"
                  value={color}
                  onChange={(event) => {
                    setColor(event.target.value);
                  }}
                />
              </section>
              <section>
                <p>Etat</p>
                <input
                  type="text"
                  placeholder="ex: Neuf avec étiquette"
                  value={state}
                  onChange={(event) => {
                    setState(event.target.value);
                  }}
                />
              </section>
              <section>
                <p>Lieu</p>
                <input
                  type="text"
                  placeholder="ex: Paris"
                  value={city}
                  onChange={(event) => {
                    setCity(event.target.value);
                  }}
                />
              </section>
            </div>
            <div className="new-offer-price">
              <section>
                <p>Prix</p>
                <input
                  type="number"
                  placeholder="0,00 €"
                  value={price}
                  onChange={(event) => {
                    setPrice(event.target.value);
                  }}
                />
              </section>
            </div>
            <article className="form-footer">
              {alert && <p className="alert">{alert}</p>}
              <button className="publish" type="submit">
                Publier
              </button>
            </article>
          </div>
        </form>
      ) : (
        <div>
          <p>Vous devez être connecté pour publier</p>
          {setModalVisible("login")}
        </div>
      )}
    </>
  );
};

export default Publish;
