import React, { useState } from "react";
import Navbar from "../../components/common/Navbar";
import ProductList from "../../components/products/ProductList";
import "./ShopPage.css";

const sampleProducts = [
  {
    id: 1,
    name: "Elven Longbow",
    price: "285",
    image: "https://via.placeholder.com/400x300/3f2a1d/e8c080?text=Elven+Bow",
    category: "Weapon",
    description: "Finely crafted bow from Lothlórien."
  },
  {
    id: 2,
    name: "Mithril Chainmail",
    price: "1240",
    image: "https://via.placeholder.com/400x300/3f2a1d/e8c080?text=Mithril",
    category: "Armor",
    description: "Lightweight and nearly impenetrable."
  },
  {
    id: 3,
    name: "Dwarven War Axe",
    price: "420",
    image: "https://via.placeholder.com/400x300/3f2a1d/e8c080?text=War+Axe",
    category: "Weapon",
    description: "Forged in the fires of Khazad-dûm."
  },
  {
    id: 4,
    name: "Gondorian Steel Sword",
    price: "650",
    image: "https://via.placeholder.com/400x300/3f2a1d/e8c080?text=Steel+Sword",
    category: "Weapon",
    description: "Blade of the White Tree."
  },
  {
    id: 5,
    name: "Rohan Warhorse Saddle",
    price: "175",
    image: "https://via.placeholder.com/400x300/3f2a1d/e8c080?text=Saddle",
    category: "Gear",
    description: "Finest leather from the Riddermark."
  },
  {
    id: 6,
    name: "Ancient Spellbook",
    price: "390",
    image: "https://via.placeholder.com/400x300/3f2a1d/e8c080?text=Spellbook",
    category: "Magic",
    description: "Tome bound in dragon leather."
  },
  {
    id: 7,
    name: "Ranger's Cloak",
    price: "95",
    image: "https://via.placeholder.com/400x300/3f2a1d/e8c080?text=Cloak",
    category: "Gear",
    description: "Elven-made cloak for perfect camouflage."
  },
  {
    id: 8,
    name: "Palantír Viewing Stone",
    price: "5000",
    image: "https://via.placeholder.com/400x300/3f2a1d/e8c080?text=Palantir",
    category: "Magic",
    description: "See across the realms (use with caution)."
  }
];

export default function ShopPage({ onLogout }) {
  const [cartCount, setCartCount] = useState(0);

  const handleAddToCart = (productId) => {
    setCartCount(prev => prev + 1);
    alert(`⚔️ Item added to cart! (ID: ${productId})`);
  };

  const handleCartClick = () => {
    alert(`🛒 You have ${cartCount} item(s) in your cart`);
  };

  return (
    <div className="gc-shop-page">
      <Navbar 
        cartCount={cartCount}
        onCartClick={handleCartClick}
        onLogout={onLogout}
      />

      {/* Main Content */}
      <div className="gc-shop-container">
        <div className="gc-shop-title">
          <h2>Bienvenue à la Grande Forge-Marché</h2>
          <p>Équipez-vous pour la gloire de la Montagne</p>
          <div className="gc-shop-decoration">
            <span className="gc-shop-cross"></span>
            <span className="gc-shop-line"></span>
            <span className="gc-shop-cross"></span>
          </div>
        </div>

        <ProductList 
          products={sampleProducts} 
          onAddToCart={handleAddToCart}
        />
      </div>

      {/* Footer */}
      <footer className="gc-shop-footer">
        <div className="gc-footer-content">
          <p>⚔️ Grimthars • Forge-Cité • Troisième Âge ⚔️</p>
          <p>Tous les articles sont forgés avec honneur</p>
          <div className="gc-footer-runes">ᚱ ᚨ ᚢ ᚾ ᛟ</div>
        </div>
      </footer>
    </div>
  );
}