import React from 'react';
import './Navbar.css';

const Navbar = ({ cartCount, onCartClick, onLogout }) => {
  return (
    <header className="gc-navbar">
      <div className="gc-navbar-content">
        <div className="gc-logo">
          <h1 className="gc-title">
            <span className="gc-title-gondor">G</span>rimthars
          </h1>
          <p className="gc-subtitle">Forge-Cité • Marché</p>
        </div>

        <nav className="gc-nav-links">
          <a href="#home" className="gc-nav-link">Accueil</a>
          <a href="#shop" className="gc-nav-link active">Boutique</a>
          <a href="#about" className="gc-nav-link">À Propos</a>
          <a href="#contact" className="gc-nav-link">Contact</a>
        </nav>

        <div className="gc-nav-actions">
          <button className="gc-cart-button" onClick={onCartClick}>
            <span className="gc-cart-icon">🛒</span>
            Cart 
            <span className="gc-cart-count">({cartCount})</span>
          </button>
          <button className="gc-logout-button" onClick={onLogout}>
            <span className="gc-logout-icon">⚔️</span>
            Se déconnecter
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;