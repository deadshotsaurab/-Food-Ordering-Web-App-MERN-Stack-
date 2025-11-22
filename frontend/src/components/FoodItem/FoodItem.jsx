import { useContext } from "react";
import { assets } from "../../assets/assets";
import "./FoodItem.css";
import { StoreContext } from '../context/StoreContext';
import PropTypes from 'prop-types';

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);
  const quantity = cartItems[id] || 0;

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img src={image} alt={name} className="food-item-image" />

        {quantity === 0 ? (
          <img
            className="add-icon"
            src={assets.add_icon_white}
            alt="Add to cart"
            onClick={() => addToCart(id)}
          />
        ) : (
          <div className="food-item-counter">
            <img
              src={assets.remove_icon_red}
              alt="Remove from cart"
              onClick={() => removeFromCart(id)}
            />
            <p>{quantity}</p>
            <img
              src={assets.add_icon_green}
              alt="Add more"
              onClick={() => addToCart(id)}
            />
          </div>
        )}
      </div>

      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p className="food-item-name">{name}</p>
          <div className="food-item-rating">
            <img src={assets.rating_starts} alt="Rating" />
          </div>
        </div>

        <p className="food-item-desc">{description}</p>

        <p className="food-item-price">₹ {parseFloat(price).toLocaleString("en-IN")}</p>
      </div>
    </div>
  );
};

FoodItem.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default FoodItem;
