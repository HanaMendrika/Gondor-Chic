// ProductList.jsx — Gondor Chic · Elevated Edition
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
        <p className={styles['gc-loading-text']}>Summoning Artefacts…</p>
      </div>
    );
  }

  return (
    <div className={styles['gc-shop-container']}>
      {/* Ambient background layers */}
      <div className={styles['gc-bg-layer']} aria-hidden="true">
        <div className={styles['gc-bg-glow-left']}></div>
        <div className={styles['gc-bg-glow-right']}></div>
        <div className={styles['gc-bg-noise']}></div>
      </div>

      {/* Mobile toggle */}
      <button
        className={styles['gc-mobile-filter-toggle']}
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Toggle filters"
      >
        <span>Filters</span>
        {hasActiveFilters && <span className={styles['gc-toggle-badge']}></span>}
      </button>

      <div className={styles['gc-shop-layout']}>
        {/* ── SIDEBAR ── */}
        <aside className={`${styles['gc-sidebar']} ${sidebarOpen ? styles['open'] : ''}`}>
          {/* Decorative top bar */}
          <div className={styles['gc-sidebar-topbar']} aria-hidden="true">
            <span></span><span></span><span></span>
          </div>

          <div className={styles['gc-sidebar-header']}>
            <div className={styles['gc-sidebar-emblem']} aria-hidden="true">✦</div>
            <h3 className={styles['gc-sidebar-title']}>Filter Armory</h3>
            <p className={styles['gc-sidebar-subtitle']}>Refine your quest</p>
          </div>

          {/* Categories */}
          <div className={styles['gc-filter-section']}>
            <div className={styles['gc-filter-section-header']}>
              <span className={styles['gc-section-icon']}>⬡</span>
              <h4>Realms & Collections</h4>
            </div>
            <div className={styles['gc-category-search']}>
              <span className={styles['gc-cat-search-icon']}>⌕</span>
              <input
                type="text"
                placeholder="Search categories…"
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
                  <span>☽</span> No realms found…
                </div>
              )}
            </div>
          </div>

          {/* Price */}
          <div className={styles['gc-filter-section']}>
            <div className={styles['gc-filter-section-header']}>
              <span className={styles['gc-section-icon']}>◈</span>
              <h4>Price Range</h4>
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
            <div className={styles['gc-price-slider']}>
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
            </div>
          </div>

          {/* Availability */}
          <div className={styles['gc-filter-section']}>
            <div className={styles['gc-filter-section-header']}>
              <span className={styles['gc-section-icon']}>⬟</span>
              <h4>Availability</h4>
            </div>
            <div className={styles['gc-availability-options']}>
              <button
                className={`${styles['gc-avail-btn']} ${localInStock === true ? styles['active'] : ''}`}
                onClick={() => handleStockFilter(true)}
              >
                <span className={styles['gc-avail-dot']} data-state="in"></span> In Stock Only
              </button>
              <button
                className={`${styles['gc-avail-btn']} ${localInStock === false ? styles['active'] : ''}`}
                onClick={() => handleStockFilter(false)}
              >
                <span className={styles['gc-avail-dot']} data-state="out"></span> Out of Stock
              </button>
            </div>
          </div>

          {/* Active filters */}
          {hasActiveFilters && (
            <div className={styles['gc-active-filters-sidebar']}>
              <div className={styles['gc-active-header']}>
                <span>Active filters</span>
                <button onClick={clearFilters} className={styles['gc-clear-all-btn']}>
                  ✕ Clear all
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
                    From ${filters.minPrice}
                    <button onClick={() => { setLocalMinPrice(''); onFilterChange({ minPrice: '', page: 0 }); }}>×</button>
                  </span>
                )}
                {filters.maxPrice && (
                  <span className={styles['gc-active-tag']}>
                    To ${filters.maxPrice}
                    <button onClick={() => { setLocalMaxPrice(''); onFilterChange({ maxPrice: '', page: 0 }); }}>×</button>
                  </span>
                )}
                {filters.inStock === true && (
                  <span className={styles['gc-active-tag']}>
                    In Stock
                    <button onClick={() => { setLocalInStock(null); onFilterChange({ inStock: null, page: 0 }); }}>×</button>
                  </span>
                )}
                {filters.inStock === false && (
                  <span className={styles['gc-active-tag']}>
                    Out of Stock
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

        {/* ── MAIN CONTENT ── */}
        <main className={styles['gc-main-content']}>
          {/* Hero header */}
          <div className={styles['gc-content-header']}>
            <div className={styles['gc-title-section']}>
              <div className={styles['gc-title-ornament']} aria-hidden="true">
                <span></span><span>✦</span><span></span>
              </div>
              <h1 className={styles['gc-shop-title']}>Armory of Gondor</h1>
              <p className={styles['gc-shop-description']}>
                Forged in the fires of the White City — modern heirlooms for legendary homes
              </p>
            </div>

            {/* Search */}
            <div className={styles['gc-search-bar']}>
              <div className={styles['gc-search-input-wrapper']}>
                <span className={styles['gc-search-icon']}>⌕</span>
                <input
                  type="text"
                  placeholder="Search for treasures by name, description, or category…"
                  value={localSearch}
                  onChange={e => setLocalSearch(e.target.value)}
                  className={styles['gc-global-search']}
                />
                {localSearch && (
                  <button
                    className={styles['gc-search-clear']}
                    onClick={() => { setLocalSearch(''); onFilterChange({ search: '', page: 0 }); }}
                    aria-label="Clear search"
                  >×</button>
                )}
              </div>
            </div>

            {/* Sort bar */}
            <div className={styles['gc-sorting-bar']}>
              <div className={styles['gc-results-stats']}>
                <span className={styles['gc-stats-gem']}>◆</span>
                <span>
                  <strong>{pagination.totalElements || products.length}</strong>
                  {' '}noble piece{products.length !== 1 ? 's' : ''}
                </span>
              </div>
              <div className={styles['gc-sort-group']}>
                <label className={styles['gc-sort-label']}>Sort by</label>
                <select
                  className={styles['gc-sort-select']}
                  value={`${filters.sortBy}-${filters.sortDir}`}
                  onChange={handleSortChange}
                >
                  <option value="name-asc">Name: A → Z</option>
                  <option value="name-desc">Name: Z → A</option>
                  <option value="price-asc">Price: Low → High</option>
                  <option value="price-desc">Price: High → Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Product Grid */}
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
                <nav className={styles['gc-pagination']} aria-label="Page navigation">
                  <button
                    onClick={() => onPageChange(0)}
                    disabled={pagination.currentPage === 0}
                    className={`${styles['gc-page-btn']} ${styles['gc-page-edge']}`}
                    aria-label="First page"
                  >«</button>
                  <button
                    onClick={() => onPageChange(pagination.currentPage - 1)}
                    disabled={pagination.currentPage === 0}
                    className={styles['gc-page-btn']}
                    aria-label="Previous page"
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
                    aria-label="Next page"
                  >›</button>
                  <button
                    onClick={() => onPageChange(pagination.totalPages - 1)}
                    disabled={pagination.currentPage === pagination.totalPages - 1}
                    className={`${styles['gc-page-btn']} ${styles['gc-page-edge']}`}
                    aria-label="Last page"
                  >»</button>
                </nav>
              )}
            </>
          ) : (
            <div className={styles['gc-empty-state']}>
              <div className={styles['gc-empty-sigil']} aria-hidden="true">
                <span>♛</span>
              </div>
              <p className={styles['gc-empty-text']}>No treasures found in these realms…</p>
              <p className={styles['gc-empty-hint']}>
                Adjust your filters or explore other collections
              </p>
              <button className={styles['gc-empty-btn']} onClick={clearFilters}>
                ↺ Clear All Filters
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