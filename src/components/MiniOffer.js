import { Link } from "react-router-dom";

const MiniOffer = ({ offer }) => {
  return (
    <Link to={`/offer/${offer._id}`}>
      <div className="mini-offer">
        {offer.owner && (
          <div className="owner">
            {offer.owner.account.avatar?.secure_url && (
              <img src={offer.owner.account.avatar.secure_url} alt="avatar" />
            )}
            <p>{offer.owner.account.username}</p>
          </div>
        )}
        {offer.product_image[0]?.secure_url && (
          <img
            className="product-img"
            src={offer.product_image[0].secure_url}
            alt="produit vendu"
          />
        )}
        {offer.product_price && (
          <p className="price">{offer.product_price.toFixed(2)} €</p>
        )}
        {offer.product_details[4]?.TAILLE && (
          <p className="details">{offer.product_details[4].TAILLE}</p>
        )}
        {offer.product_details[2]?.MARQUE}
        <p className="details">{offer.product_details[2].MARQUE}</p>
      </div>
    </Link>
  );
};
export default MiniOffer;
