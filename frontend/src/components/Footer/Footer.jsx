import './Footer.css';
import { assets } from '../../assets/assets';

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <h1 className="footer-logo-text">Foodii</h1>
                <p>
                  Foodii brings delicious meals straight to your doorstep. Explore a wide variety of fresh, tasty, and healthy food items to satisfy every craving.
                </p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="Facebook" />
                    <img src={assets.twitter_icon} alt="Twitter" />
                    <img src={assets.linkedin_icon} alt="LinkedIn" />
                </div>
            </div>

            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                    <li>Terms & Conditions</li>
                </ul>
            </div>

            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+91 98765 43210</li>
                    <li>support@foodii.com</li>
                    <li>123, Food Street, Mumbai, India</li>
                </ul>
            </div>
        </div>

        <hr />

        <p className="footer-copyright">
            Copyright 2025 &copy; Foodii - All Rights Reserved.
        </p>
    </div>
  )
}

export default Footer;
