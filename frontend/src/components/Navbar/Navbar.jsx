import { useContext, useState, useRef, useEffect } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from './../context/StoreContext';
import PropTypes from 'prop-types';
import { FaShoppingCart, FaUserCircle, FaSearch, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState('home');
  const [mobileMenu, setMobileMenu] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const searchRef = useRef();

  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchText.trim() !== '') {
      console.log('Searching for:', searchText);
      // You can later replace this with an API search call or filter logic
    }
  };

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <Link to="/" className="logo">Foodii</Link>

      {/* Menu */}
      <ul className={`navbar-menu ${mobileMenu ? 'active' : ''}`}>
        <li><Link to="/" onClick={() => setMenu('home')} className={menu === 'home' ? 'active' : ''}>Home</Link></li>
        <li><a href="#explore-menu" onClick={() => setMenu('menu')} className={menu === 'menu' ? 'active' : ''}>Menu</a></li>
        <li><a href="#app-download" onClick={() => setMenu('mobile-app')} className={menu === 'mobile-app' ? 'active' : ''}>Mobile App</a></li>
        <li><a href="#footer" onClick={() => setMenu('contact-us')} className={menu === 'contact-us' ? 'active' : ''}>Contact Us</a></li>
      </ul>

      {/* Right Section */}
      <div className="navbar-right">
        {/* Search (inside navbar, before cart) */}
        <div ref={searchRef} className={`navbar-search ${searchOpen ? 'open' : ''}`}>
          <form onSubmit={handleSearch}>
            {searchOpen && (
              <input
                type="text"
                className="search-input"
                placeholder="Search food..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                autoFocus
              />
            )}
          </form>
          <FaSearch className="search-icon" onClick={() => setSearchOpen(!searchOpen)} />
        </div>

        {/* Cart */}
        <div className="navbar-cart">
          <Link
            to="/cart"
            onClick={() => setMenu('cart')}
            className={menu === 'cart' ? 'active' : ''}
          >
            <FaShoppingCart className="cart-icon" />
            {getTotalCartAmount() > 0 && <span className="cart-dot">{getTotalCartAmount()}</span>}
          </Link>
        </div>

        {/* Auth */}
        {!token ? (
          <button onClick={() => setShowLogin(true)}>Sign In</button>
        ) : (
          <div className="navbar-profile">
            <FaUserCircle className="profile-icon" />
            <ul className="nav-profile-dropdown">
              <li onClick={() => navigate('/myorders')}>Orders</li>
              <hr />
              <li onClick={logout}>Logout</li>
            </ul>
          </div>
        )}

        {/* Hamburger */}
        <div className="hamburger" onClick={() => setMobileMenu(!mobileMenu)}>
          {mobileMenu ? <FaTimes /> : <FaBars />}
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  setShowLogin: PropTypes.func.isRequired,
};

export default Navbar;
