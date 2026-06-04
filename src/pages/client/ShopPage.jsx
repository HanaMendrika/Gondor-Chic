// ShopPage.jsx
import { useState, useEffect } from "react";
import Navbar from "../../components/common/Navbar";
import ProductList from "../../components/products/ProductList";
import ProductCard from '../../components/products/ProductCard';
import productService from "../../services/productService";
import styles from './ShopPage.module.css';

export default function ShopPage({ onLogout }) {
  const [cartCount, setCartCount] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    minPrice: '',
    maxPrice: '',
    page: 0,
    size: 12,
    sortBy: 'name',
    sortDir: 'asc'
  });
  const [pagination, setPagination] = useState({
    currentPage: 0,
    totalPages: 0,
    totalElements: 0,
    size: 12
  });

  const loadProducts = async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('Chargement avec filtres:', filters);
      const response = await productService.getProducts(filters);
      console.log('Réponse reçue:', response);
      
      setProducts(response.content || []);
      setPagination({
        currentPage: response.currentPage || 0,
        totalPages: response.totalPages || 0,
        totalElements: response.totalElements || 0,
        size: response.size || 12
      });
    } catch (err) {
      console.error('Erreur de chargement:', err);
      setError(err.message || 'Impossible de charger les produits');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [filters]);

  const handleAddToCart = (product) => {
    setCartCount(prev => prev + 1);
    console.log(`⚔️ ${product.name} ajouté au panier !`);
  };

  const handleCartClick = () => {
    console.log(`🛒 Vous avez ${cartCount} article(s) dans votre panier`);
  };

  const handleQuickView = (productId) => {
    console.log("Vue rapide du produit:", productId);
  };

  var username = localStorage.getItem("userName");

  const handleFilterChange = (newFilters) => {
    console.log('Changement de filtres:', newFilters);
    setFilters(prev => ({
      ...prev,
      ...newFilters,
      page: 0
    }));
  };

  const handlePageChange = (newPage) => {
    console.log('Changement de page:', newPage);
    setFilters(prev => ({
      ...prev,
      page: newPage
    }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Récupérer les 3 premiers produits
  const TodayProduct = products.slice(0, 1);

  if (loading && products.length === 0) {
    return (
      <div className={styles["gc-shop-page"]}>
        <Navbar 
          cartCount={cartCount}
          onCartClick={handleCartClick}
          onLogout={onLogout}
        />
        <div className={styles["gc-loading-container"]}>
          <div className={styles["gc-loading-spinner"]}>
            <div className={styles["gc-spinner-rune"]}>⚔️</div>
          </div>
          <p>Chargement des équipements de la forge...</p>
        </div>
      </div>
    );
  }

  if (error && products.length === 0) {
    return (
      <div className={styles["gc-shop-page"]}>
        <Navbar 
          cartCount={cartCount}
          onCartClick={handleCartClick}
          onLogout={onLogout}
        />
        <div className={styles["gc-error-container"]}>
          <div className={styles["gc-error-icon"]}>⚔️❌⚔️</div>
          <p>{error}</p>
          <button onClick={loadProducts} className={styles["gc-retry-btn"]}>
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles["gc-shop-page"]}>
      <Navbar 
        cartCount={cartCount}
        onCartClick={handleCartClick}
        onLogout={onLogout}
      />

      {/* Hero Banner */}
      <div className={styles["gc-shop-hero"]}>
        <div className={styles["gc-hero-overlay"]}></div>
        <div className={styles["gc-hero-content"]}>
          <div className={styles["gc-hero-runes-left"]}>ᚱ ᚨ ᚢ</div>
          <h1>Bienvenue à la forge, {username || "guerrier"}!</h1>
          <div className={styles["gc-hero-divider"]}>
            <span className={styles["gc-hero-cross"]}></span>
            <span className={styles["gc-hero-line"]}></span>
            <span className={styles["gc-hero-cross"]}></span>
          </div>
          <p>Équipez-vous pour la gloire de la Montagne</p>
          <div className={styles["gc-hero-runes-right"]}>ᚾ ᛟ ᛗ</div>

        </div>
      </div>
          {/* Affichage des 3 premiers produits */}
          <section className={styles["gc-featured-products"]}>
            <h2>Équipements du jour</h2>
            <div className={styles["gc-featured-grid"]}>
              {TodayProduct.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  image={"https://buxtrade.de/cdn/shop/files/mandeln_4_1200x.jpg?v=1778618805"}
                  description={product.description}
                  categories={product.categories || [product.category]}
                  rating={product.rating || 4.5}
                  inStock={product.stock > 0}
                  stock={product.stock}
                  discount={product.discount}
                  onAddToCart={handleAddToCart}
                  onQuickView={handleQuickView}
                />
              ))}
            </div>
          </section>

      <div className={styles["gc-shop-container"]}>
        <ProductList 
          products={products}
          loading={loading}
          pagination={pagination}
          filters={filters}
          onAddToCart={handleAddToCart}
          onQuickView={handleQuickView}
          onFilterChange={handleFilterChange}
          onPageChange={handlePageChange}
        />
      </div>

      <footer className={styles["gc-shop-footer"]}>
        <div className={styles["gc-footer-glow"]}></div>
        <div className={styles["gc-footer-content"]}>
          <div className={styles["gc-footer-sigil"]}>⚔️</div>
          <p>Grimthars • Forge-Cité • Troisième Âge</p>
          <p>Tous les articles sont forgés avec honneur</p>
          <div className={styles["gc-footer-runes"]}>ᚱ ᚨ ᚢ ᚾ ᛟ</div>
        </div>
      </footer>
    </div>
  );
}