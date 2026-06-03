// ProductList.jsx — Gondor Chic · Édition Élevée
import { useState, useEffect } from 'react';
import styles from './ProductList.module.css';
import ProductCard from './ProductCard';

const ProductList = ({
  products,
  loading,
  pagination,
  filters,
  onAddToCart,
  onQuickView,
  onFilterChange,
  onPageChange
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [categorySearchQuery, setCategorySearchQuery] = useState('');
  const [localSearch, setLocalSearch] = useState(filters.search || '');
  const [localMinPrice, setLocalMinPrice] = useState(filters.minPrice || '');
  const [localMaxPrice, setLocalMaxPrice] = useState(filters.maxPrice || '');
  const [localInStock, setLocalInStock] = useState(filters.inStock || null);

  useEffect(() => {
    const id = setTimeout(() => {
      if (localSearch !== filters.search) onFilterChange({ search: localSearch, page: 0 });
    }, 500);
    return () => clearTimeout(id);
  }, [localSearch]);

  useEffect(() => {
    const id = setTimeout(() => {
      if (localMinPrice !== filters.minPrice) onFilterChange({ minPrice: localMinPrice, page: 0 });
    }, 500);
    return () => clearTimeout(id);
  }, [localMinPrice]);

  useEffect(() => {
    const id = setTimeout(() => {
      if (localMaxPrice !== filters.maxPrice) onFilterChange({ maxPrice: localMaxPrice, page: 0 });
    }, 500);
    return () => clearTimeout(id);
  }, [localMaxPrice]);

  const getAllCategories = () => {
    const all = new Set();
    products.forEach(p => {
      if (p.category) all.add(p.category);
      if (p.categories?.length) p.categories.forEach(c => all.add(c));
    });
    return Array.from(all).sort();
  };

  const availableCategories = getAllCategories();
  const filteredCategories = availableCategories.filter(c =>
    c.toLowerCase().includes(categorySearchQuery.toLowerCase())
  );

  const handleCategoryToggle = (cat) => {
    const newCat = filters.category === cat ? '' : cat;
    onFilterChange({ category: newCat, page: 0 });
  };

  const handleStockFilter = (status) => {
    const newStatus = localInStock === status ? null : status;
    setLocalInStock(newStatus);
    onFilterChange({ inStock: newStatus, page: 0 });
  };

  const handleSortChange = (e) => {
    const [sortBy, sortDir] = e.target.value.split('-');
    onFilterChange({ sortBy, sortDir, page: 0 });
  };

  const clearFilters = () => {
    setLocalSearch('');
    setLocalMinPrice('');
    setLocalMaxPrice('');
    setLocalInStock(null);
    setCategorySearchQuery('');
    onFilterChange({ search: '', category: '', minPrice: '', maxPrice: '', inStock: null, page: 0, sortBy: 'name', sortDir: 'asc' });
  };

  const hasActiveFilters =
    filters.search || filters.category || filters.minPrice ||
    filters.maxPrice || filters.inStock !== null || filters.sortBy !== 'name';

  const allPrices = products.map(p => parseFloat(p.price)).filter(p => !isNaN(p));
  const maxPossiblePrice = allPrices.length > 0 ? Math.max(...allPrices) : 1000;

  if (loading && products.length === 0) {
    return (
      <div className={styles['gc-loading']}>
        <div className={styles['gc-loading-sigil']}>
          <div className={styles['gc-loading-ring']}></div>
          <div className={styles['gc-loading-ring']} style={{ animationDelay: '-0.4s' }}></div>
          <div className={styles['gc-loading-core']}></div>
        </div>
        <p className={styles['gc-loading-text']}>Invocation des Artéfacts…</p>
      </div>
    );
  }

  return (
    <div className={styles['gc-shop-container']}>
      {/* Couches d'arrière-plan ambiant */}
      <div className={styles['gc-bg-layer']} aria-hidden="true">
        <div className={styles['gc-bg-glow-left']}></div>
        <div className={styles['gc-bg-glow-right']}></div>
        <div className={styles['gc-bg-noise']}></div>
      </div>

      {/* Bouton mobile */}
      <button
        className={styles['gc-mobile-filter-toggle']}
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Basculer les filtres"
      >
        <span className={styles['gc-toggle-icon']}>⚔</span>
        <span>Filtres</span>
        {hasActiveFilters && <span className={styles['gc-toggle-badge']}></span>}
      </button>

      <div className={styles['gc-shop-layout']}>
        {/* ── BARRE LATÉRALE ── */}
        <aside className={`${styles['gc-sidebar']} ${sidebarOpen ? styles['open'] : ''}`}>
          {/* Barre décorative supérieure */}
          <div className={styles['gc-sidebar-topbar']} aria-hidden="true">
            <span></span><span></span><span></span>
          </div>

          <div className={styles['gc-sidebar-header']}>
            <div className={styles['gc-sidebar-emblem']} aria-hidden="true">✦</div>
            <h3 className={styles['gc-sidebar-title']}>Armurerie de Filtres</h3>
            <p className={styles['gc-sidebar-subtitle']}>Affinez votre quête</p>
          </div>

          {/* Catégories */}
          <div className={styles['gc-filter-section']}>
            <div className={styles['gc-filter-section-header']}>
              <span className={styles['gc-section-icon']}>◈</span>
              <h4>Royaumes & Collections</h4>
            </div>
            <div className={styles['gc-category-search']}>
              <span className={styles['gc-cat-search-icon']}>⌕</span>
              <input
                type="text"
                placeholder="Rechercher une catégorie…"
                value={categorySearchQuery}
                onChange={e => setCategorySearchQuery(e.target.value)}
                className={styles['gc-category-search-input']}
              />
            </div>
            <div className={styles['gc-categories-list']}>
              {filteredCategories.length > 0 ? (
                filteredCategories.map(cat => (
                  <label key={cat} className={`${styles['gc-category-checkbox']} ${filters.category === cat ? styles['checked'] : ''}`}>
                    <input
                      type="checkbox"
                      checked={filters.category === cat}
                      onChange={() => handleCategoryToggle(cat)}
                    />
                    <span className={styles['gc-checkmark']} aria-hidden="true"></span>
                    <span className={styles['gc-category-name']}>{cat}</span>
                    <span className={styles['gc-category-count']}>
                      {products.filter(p => p.category === cat || p.categories?.includes(cat)).length}
                    </span>
                  </label>
                ))
              ) : (
                <div className={styles['gc-no-categories']}>
                  <span>☽</span> Aucun royaume trouvé…
                </div>
              )}
            </div>
          </div>

          {/* Prix */}
          <div className={styles['gc-filter-section']}>
            <div className={styles['gc-filter-section-header']}>
              <span className={styles['gc-section-icon']}>◈</span>
              <h4>Fourchette de Prix</h4>
            </div>
            <div className={styles['gc-price-range']}>
              <div className={styles['gc-price-input-group']}>
                <span className={styles['gc-price-currency']}>$</span>
                <input
                  type="number"
                  placeholder="Min"
                  className={styles['gc-price-input']}
                  value={localMinPrice}
                  onChange={e => setLocalMinPrice(e.target.value)}
                />
              </div>
              <span className={styles['gc-price-separator']}>—</span>
              <div className={styles['gc-price-input-group']}>
                <span className={styles['gc-price-currency']}>$</span>
                <input
                  type="number"
                  placeholder="Max"
                  className={styles['gc-price-input']}
                  value={localMaxPrice}
                  onChange={e => setLocalMaxPrice(e.target.value)}
                />
              </div>
            </div>
            {/* <div className={styles['gc-price-slider']}>
              <input
                type="range"
                min="0"
                max={maxPossiblePrice}
                value={localMaxPrice || maxPossiblePrice}
                onChange={e => setLocalMaxPrice(e.target.value)}
                className={styles['gc-slider']}
              />
              <div className={styles['gc-slider-track-fill']}
                style={{ width: `${((localMaxPrice || maxPossiblePrice) / maxPossiblePrice) * 100}%` }}
              ></div>
            </div> */}
          </div>

          {/* Disponibilité */}
          <div className={styles['gc-filter-section']}>
            <div className={styles['gc-filter-section-header']}>
              <span className={styles['gc-section-icon']}>◈</span>
              <h4>Disponibilité</h4>
            </div>
            <div className={styles['gc-availability-options']}>
              <button
                className={`${styles['gc-avail-btn']} ${localInStock === true ? styles['active'] : ''}`}
                onClick={() => handleStockFilter(true)}
              >
                <span className={styles['gc-avail-dot']} data-state="in"></span> En Stock Uniquement
              </button>
              <button
                className={`${styles['gc-avail-btn']} ${localInStock === false ? styles['active'] : ''}`}
                onClick={() => handleStockFilter(false)}
              >
                <span className={styles['gc-avail-dot']} data-state="out"></span> Rupture de Stock
              </button>
            </div>
          </div>

          {/* Filtres actifs */}
          {hasActiveFilters && (
            <div className={styles['gc-active-filters-sidebar']}>
              <div className={styles['gc-active-header']}>
                <span>Filtres actifs</span>
                <button onClick={clearFilters} className={styles['gc-clear-all-btn']}>
                  ✕ Tout effacer
                </button>
              </div>
              <div className={styles['gc-active-tags']}>
                {filters.search && (
                  <span className={styles['gc-active-tag']}>
                    "{filters.search}"
                    <button onClick={() => { setLocalSearch(''); onFilterChange({ search: '', page: 0 }); }}>×</button>
                  </span>
                )}
                {filters.category && (
                  <span className={styles['gc-active-tag']}>
                    {filters.category}
                    <button onClick={() => onFilterChange({ category: '', page: 0 })}>×</button>
                  </span>
                )}
                {filters.minPrice && (
                  <span className={styles['gc-active-tag']}>
                    À partir de ${filters.minPrice}
                    <button onClick={() => { setLocalMinPrice(''); onFilterChange({ minPrice: '', page: 0 }); }}>×</button>
                  </span>
                )}
                {filters.maxPrice && (
                  <span className={styles['gc-active-tag']}>
                    Jusqu'à ${filters.maxPrice}
                    <button onClick={() => { setLocalMaxPrice(''); onFilterChange({ maxPrice: '', page: 0 }); }}>×</button>
                  </span>
                )}
                {filters.inStock === true && (
                  <span className={styles['gc-active-tag']}>
                    En Stock
                    <button onClick={() => { setLocalInStock(null); onFilterChange({ inStock: null, page: 0 }); }}>×</button>
                  </span>
                )}
                {filters.inStock === false && (
                  <span className={styles['gc-active-tag']}>
                    Rupture
                    <button onClick={() => { setLocalInStock(null); onFilterChange({ inStock: null, page: 0 }); }}>×</button>
                  </span>
                )}
              </div>
            </div>
          )}

          <div className={styles['gc-sidebar-footer']} aria-hidden="true">
            <div className={styles['gc-sidebar-runes']}>ᚱ ᚨ ᚢ ᚾ ᛟ</div>
          </div>
        </aside>

        {/* ── CONTENU PRINCIPAL ── */}
        <main className={styles['gc-main-content']}>
          {/* En-tête principal */}
          <div className={styles['gc-content-header']}>
            {/* Barre de recherche */}
            <div className={styles['gc-search-bar']}>
              <div className={styles['gc-search-input-wrapper']}>
                <span className={styles['gc-search-icon']}>⌕</span>
                <input
                  type="text"
                  placeholder="Recherchez un trésor par nom, description ou catégorie…"
                  value={localSearch}
                  onChange={e => setLocalSearch(e.target.value)}
                  className={styles['gc-global-search']}
                />
                {localSearch && (
                  <button
                    className={styles['gc-search-clear']}
                    onClick={() => { setLocalSearch(''); onFilterChange({ search: '', page: 0 }); }}
                    aria-label="Effacer la recherche"
                  >×</button>
                )}
              </div>
            </div>

            {/* Barre de tri */}
            <div className={styles['gc-sorting-bar']}>
              <div className={styles['gc-results-stats']}>
                <span className={styles['gc-stats-gem']}>◆</span>
                <span>
                  <strong>{pagination.totalElements || products.length}</strong>
                  {' '}pièce{products.length !== 1 ? 's' : ''} noble{products.length !== 1 ? 's' : ''}
                </span>
              </div>
              <div className={styles['gc-sort-group']}>
                <label className={styles['gc-sort-label']}>Trier par</label>
                <select
                  className={styles['gc-sort-select']}
                  value={`${filters.sortBy}-${filters.sortDir}`}
                  onChange={handleSortChange}
                >
                  <option value="name-asc">Nom : A → Z</option>
                  <option value="name-desc">Nom : Z → A</option>
                  <option value="price-asc">Prix : Croissant</option>
                  <option value="price-desc">Prix : Décroissant</option>
                </select>
              </div>
            </div>
          </div>

          {/* Grille de produits */}
          {products.length > 0 ? (
            <>
              <div className={styles['gc-product-grid']}>
                {products.map((product, index) => (
                  <div
                    key={product.id}
                    className={styles['gc-grid-item']}
                    style={{ '--animation-order': index }}
                  >
                    <ProductCard
                      id={product.id}
                      name={product.name}
                      price={product.price}
                      image={product.image || product.imageUrl}
                      description={product.description}
                      categories={product.categories || [product.category]}
                      rating={product.rating || 4.5}
                      inStock={product.stock > 0}
                      stock={product.stock}
                      discount={product.discount}
                      onAddToCart={onAddToCart}
                      onQuickView={onQuickView}
                    />
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <nav className={styles['gc-pagination']} aria-label="Navigation des pages">
                  <button
                    onClick={() => onPageChange(0)}
                    disabled={pagination.currentPage === 0}
                    className={`${styles['gc-page-btn']} ${styles['gc-page-edge']}`}
                    aria-label="Première page"
                  >«</button>
                  <button
                    onClick={() => onPageChange(pagination.currentPage - 1)}
                    disabled={pagination.currentPage === 0}
                    className={styles['gc-page-btn']}
                    aria-label="Page précédente"
                  >‹</button>

                  <span className={styles['gc-page-info']}>
                    <strong>{pagination.currentPage + 1}</strong>
                    <span className={styles['gc-page-divider']}>/</span>
                    {pagination.totalPages}
                  </span>

                  <button
                    onClick={() => onPageChange(pagination.currentPage + 1)}
                    disabled={pagination.currentPage === pagination.totalPages - 1}
                    className={styles['gc-page-btn']}
                    aria-label="Page suivante"
                  >›</button>
                  <button
                    onClick={() => onPageChange(pagination.totalPages - 1)}
                    disabled={pagination.currentPage === pagination.totalPages - 1}
                    className={`${styles['gc-page-btn']} ${styles['gc-page-edge']}`}
                    aria-label="Dernière page"
                  >»</button>
                </nav>
              )}
            </>
          ) : (
            <div className={styles['gc-empty-state']}>
              <div className={styles['gc-empty-sigil']} aria-hidden="true">
                <span>♛</span>
              </div>
              <p className={styles['gc-empty-text']}>Aucun trésor trouvé dans ces royaumes…</p>
              <p className={styles['gc-empty-hint']}>
                Modifiez vos filtres ou explorez d'autres collections
              </p>
              <button className={styles['gc-empty-btn']} onClick={clearFilters}>
                ↺ Effacer tous les filtres
              </button>
            </div>
          )}

          <footer className={styles['gc-main-footer']} aria-hidden="true">
            <div className={styles['gc-footer-ornament']}>
              <span></span><span>✦</span><span></span>
            </div>
          </footer>
        </main>
      </div>

      {sidebarOpen && (
        <div
          className={styles['gc-sidebar-overlay']}
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        ></div>
      )}
    </div>
  );
};

export default ProductList;