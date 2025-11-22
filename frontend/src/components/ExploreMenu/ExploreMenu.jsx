import { useRef } from 'react';
import PropTypes from 'prop-types';
import './ExploreMenu.css';
import { menu_list } from '../../assets/assets';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ExploreMenu = ({ category, setCategory }) => {
  const scrollRef = useRef();

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -300 : 300,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore Our Delicious Indian Menu 🇮🇳</h1>
      <p className="explore-menu-text">
        Experience the best of Indian flavors — from spicy curries and biryanis
        to mouth-watering desserts — all freshly prepared and delivered hot to
        your doorstep. Prices are shown in ₹ (INR).
      </p>

      <div className="explore-menu-wrapper">
        <button className="scroll-btn left" onClick={() => scroll('left')}>
          <FaChevronLeft />
        </button>

        <div className="explore-menu-list" ref={scrollRef}>
          {menu_list.map((item, index) => (
            <div
              key={index}
              onClick={() =>
                setCategory((prev) =>
                  prev === item.menu_name ? 'All' : item.menu_name
                )
              }
              className={`explore-menu-list-item ${
                category === item.menu_name ? 'active' : ''
              }`}
            >
              <img src={item.menu_image} alt={item.menu_name} />
              <p>{item.menu_name}</p>
            </div>
          ))}
        </div>

        <button className="scroll-btn right" onClick={() => scroll('right')}>
          <FaChevronRight />
        </button>
      </div>

      <hr />
    </div>
  );
};

ExploreMenu.propTypes = {
  category: PropTypes.string.isRequired,
  setCategory: PropTypes.func.isRequired,
};

export default ExploreMenu;
