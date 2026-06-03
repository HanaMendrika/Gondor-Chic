// ShopPage.jsx
import { useState, useEffect } from "react"; // Enlevez useRef
import Navbar from "../../components/common/Navbar";
import ProductList from "../../components/products/ProductList";
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
    size: 5,
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
    alert(`⚔️ ${product.name} ajouté au panier !`);
  };

  const handleCartClick = () => {
    alert(`🛒 Vous avez ${cartCount} article(s) dans votre panier`);
  };

  const handleQuickView = (productId) => {
    console.log("Vue rapide du produit:", productId);
  };

  const handleFilterChange = (newFilters) => {
    console.log('Changement de filtres:', newFilters);
    setFilters(prev => ({
      ...prev,
      ...newFilters,
      page: 0 // Reset à la première page
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

  if (loading && products.length === 0) {
    return (
      <div className={styles["gc-shop-page"]}>
        <Navbar 
          cartCount={cartCount}
          onCartClick={handleCartClick}
          onLogout={onLogout}
        />
        <div className={styles["gc-loading-container"]}>
          <div className={styles["gc-loading-spinner"]}></div>
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
          <p>❌ {error}</p>
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

      <div className={styles["gc-shop-container"]}>
        <div className={styles["gc-shop-title"]}>
          <h2>Bienvenue à la Grande Forge-Marché</h2>
          <p>Équipez-vous pour la gloire de la Montagne</p>
          <div className={styles["gc-shop-decoration"]}>
            <span className={styles["gc-shop-cross"]}></span>
            <span className={styles["gc-shop-line"]}></span>
            <span className={styles["gc-shop-cross"]}></span>
          </div>
        </div>

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
        <div className={styles["gc-footer-content"]}>
          <p>⚔️ Grimthars • Forge-Cité • Troisième Âge ⚔️</p>
          <p>Tous les articles sont forgés avec honneur</p>
          <div className={styles["gc-footer-runes"]}>ᚱ ᚨ ᚢ ᚾ ᛟ</div>
        </div>
      </footer>
    </div>
  );
}