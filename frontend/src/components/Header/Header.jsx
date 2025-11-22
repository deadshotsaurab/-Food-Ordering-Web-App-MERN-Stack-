import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();

  // Each slide: image, title, description
  const slides = [
    {
      image:
        "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1600&q=80",
      title: "Savor the Best Dishes in Town 🍝",
      desc: "Freshly cooked meals made from the finest ingredients — just for you.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80&ixlib=rb-4.0.3",
      title: "Delight in Every Bite 🍕",
      desc: "From crispy pizzas to cheesy pastas — your cravings end here.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1600&q=80&ixlib=rb-4.0.3",
      title: "Taste Happiness on a Plate 🍔",
      desc: "Delicious, comforting, and crafted with love for every mood.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?auto=format&fit=crop&w=1600&q=80&ixlib=rb-4.0.3",
      title: "Fuel Your Day with Flavor 🍜",
      desc: "Healthy, vibrant, and packed with taste — just a click away.",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Preload images for smooth transition
  useEffect(() => {
    slides.forEach((slide) => {
      const img = new Image();
      img.src = slide.image;
    });
  }, []);

  // Auto change images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleViewMenu = () => {
    const menuSection = document.getElementById("explore-menu");
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/#explore-menu");
    }
  };

  return (
    <div
      className="header"
      style={{
        backgroundImage: `url('${slides[currentSlide].image}')`,
      }}
    >
      <div className="header-overlay" />
      <div className="header-contents fade">
        <h2>{slides[currentSlide].title}</h2>
        <p>{slides[currentSlide].desc}</p>
        <button onClick={handleViewMenu}>View Menu</button>
      </div>
    </div>
  );
};

export default Header;
