import React, { useState } from "react";
import Navbar from "../../components/common/Navbar";
import ProductList from "../../components/products/ProductList";
import "./ShopPage.css";

const sampleProducts = [
  {
    id: 1,
    name: "Elven Longbow",
    price: "285",
    image: "https://cdna.artstation.com/p/assets/images/images/008/960/692/large/stone-perales-16-ranger01.jpg?1516314574",
    category: "Weapon",
    description: "Finely crafted bow from Lothlórien."
  },
  {
    id: 2,
    name: "Mithril Chainmail",
    price: "1240",
    image: "https://static.wikia.nocookie.net/medievaluniverses/images/8/8f/Chain-mail-shirt.jpg/revision/latest?cb=20121213142526",
    category: "Armor",
    description: "Lightweight and nearly impenetrable."
  },
{
    id: 3,
    name: "Dwarven War Axe",
    price: "420",
    image: "https://images.uesp.net/thumb/0/09/BL-item-Dwarven_War_Axe.jpg/1200px-BL-item-Dwarven_War_Axe.jpg", // Hache de combat forgée
    category: "Weapon",
    description: "Forged in the fires of Khazad-dûm."
  },
  {
    id: 4,
    name: "Gondorian Steel Sword",
    price: "650",
    image: "https://www.medievalcollectibles.com/wp-content/uploads/2024/12/UC3516_3.jpg", // Épée médiévale classique
    category: "Weapon",
    description: "Blade of the White Tree."
  },
  {
    id: 5,
    name: "Rohan Warhorse Saddle",
    price: "175",
    image: "https://images.unsplash.com/photo-1601987077677-5346c0c57d3f?auto=format&fit=crop&w=400&h=300&q=80", // Selle et équipement en cuir rustique
    category: "Gear",
    description: "Finest leather from the Riddermark."
  },
  {
    id: 6,
    name: "Ancient Spellbook",
    price: "390",
    image: "https://img.atlasobscura.com/4eHEO5jCk1wmvITAlAKqueixdaXI_Em95oQwMXlXKIY/rs:fill:12000:12000/q:81/sm:1/scp:1/ar:1/aHR0cHM6Ly9hdGxh/cy1kZXYuczMuYW1h/em9uYXdzLmNvbS91/cGxvYWRzL2Fzc2V0/cy85MzJkZWZlYzhi/NDJiZjdjOTBfMTE3/NXB4LUVkd2luX1Nt/aXRoX1BhcHlydXNf/djIuanBn.jpg", // Vieux grimoire authentique avec reliure ancienne
    category: "Magic",
    description: "Tome bound in dragon leather."
  },
  {
    id: 7,
    name: "Ranger's Cloak",
    price: "95",
    image: "https://shop.fellandfair.com/cdn/shop/products/il_fullxfull.2766944681_dm9s_3b1c8f19-8a61-4662-8f65-fb453fca6eb1.jpg?v=1737047020", // Silhouette mystérieuse avec une grande cape texturée
    category: "Gear",
    description: "Elven-made cloak for perfect camouflage."
  },
  {
    id: 8,
    name: "Palantír Viewing Stone",
    price: "5000",
    image: "https://tolkiengateway.net/w/images/f/f6/John_Howe_-_Saruman%27s_Palantir.jpg", // Sphère de cristal sombre et mystique
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