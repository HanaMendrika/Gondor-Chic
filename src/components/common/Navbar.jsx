import React from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ cartCount, onCartClick }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <header className="gc-navbar">
      <div className="gc-navbar-content">
        <div className="gc-logo">
          <img className="gc-logo-img" src='./favicon.ico' />
          <h1 className="gc-title">
            <div>
              <span className="gc-title-gondor">G</span>ondor{" "}
              <span className="gc-title-of">or</span>{" "}
            </div>
            <span className="gc-title-chic">Chic</span>
          </h1>
        </div>

        <nav className="gc-nav-links">
          <Link to="/home" className="gc-nav-link">Accueil</Link>
          <Link to="/home" className="gc-nav-link active">Boutique</Link>
          {/* <Link to="/about" className="gc-nav-link">À Propos</Link> */}
          <Link to="/home" className="gc-nav-link">Contact</Link>
        </nav>

        <div className="gc-nav-actions">
          <button className="gc-cart-button" onClick={onCartClick}>
            <span className="gc-cart-icon">🛒</span>
            Cart
            <span className="gc-cart-count">({cartCount})</span>
          </button>
          <button className="gc-logout-button" onClick={handleLogout}>
            <span className="gc-logout-icon">⚔️</span>
            Se déconnecter
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;