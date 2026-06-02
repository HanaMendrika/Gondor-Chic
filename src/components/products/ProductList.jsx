import React, { useState } from 'react';
import ProductCard from './ProductCard';
import './ProductList.css';

const ProductList = ({ products, onAddToCart, onQuickView }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [filterInStock, setFilterInStock] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categorySearchQuery, setCategorySearchQuery] = useState('');

  // Get all unique categories from products
  const getAllCategories = () => {
    const allCategories = new Set();
    products.forEach(product => {
      if (product.categories && Array.isArray(product.categories)) {
        product.categories.forEach(cat => allCategories.add(cat));
      }
    });
    return Array.from(allCategories).sort();
  };

  const availableCategories = getAllCategories();

  // Filter categories based on search
  const filteredCategories = availableCategories.filter(category =>
    category.toLowerCase().includes(categorySearchQuery.toLowerCase())
  );

  // Check if product matches selected categories
  const matchesCategoryFilter = (product) => {
    if (selectedCategories.length === 0) return true;
    if (!product.categories || !Array.isArray(product.categories)) return false;
    return selectedCategories.some(selectedCat => product.categories.includes(selectedCat));
  };

  // Check if product matches search query
  const matchesSearchQuery = (product) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase().trim();
    return (
      product.name?.toLowerCase().includes(query) ||
      product.description?.toLowerCase().includes(query) ||
      (product.categories && product.categories.some(cat => cat.toLowerCase().includes(query)))
    );
  };

  const applyFilters = (productsList) => {
    let filtered = [...productsList];

    // Global search filter
    filtered = filtered.filter(matchesSearchQuery);

    // Multi-category filter
    filtered = filtered.filter(matchesCategoryFilter);

    // Stock filter
    if (filterInStock === 'in-stock') {
      filtered = filtered.filter(p => p.inStock !== false);
    } else if (filterInStock === 'out-of-stock') {
      filtered = filtered.filter(p => p.inStock === false);
    }

    // Price filter
    if (priceRange.min !== '') {
      const minPrice = parseFloat(priceRange.min);
      if (!isNaN(minPrice)) {
        filtered = filtered.filter(p => parseFloat(p.price) >= minPrice);
      }
    }
    if (priceRange.max !== '') {
      const maxPrice = parseFloat(priceRange.max);
      if (!isNaN(maxPrice)) {
        filtered = filtered.filter(p => parseFloat(p.price) <= maxPrice);
      }
    }

    return filtered;
  };

  const applySorting = (productsList) => {
    const sorted = [...productsList];
    
    switch(sortBy) {
      case 'price-asc':
        return sorted.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
      case 'price-desc':
        return sorted.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
      case 'name-asc':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      case 'rating-desc':
        return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      default:
        return sorted;
    }
  };

  const filteredProducts = applyFilters(products);
  const sortedProducts = applySorting(filteredProducts);

  const toggleCategory = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setFilterInStock('all');
    setSortBy('default');
    setPriceRange({ min: '', max: '' });
    setSearchQuery('');
    setCategorySearchQuery('');
  };

  const hasActiveFilters = selectedCategories.length > 0 || filterInStock !== 'all' || sortBy !== 'default' || priceRange.min !== '' || priceRange.max !== '' || searchQuery !== '';

  // Get price range for display
  const allPrices = products.map(p => parseFloat(p.price)).filter(p => !isNaN(p));
  const maxPossiblePrice = allPrices.length > 0 ? Math.max(...allPrices) : 1000;

  return (
    <div className="gc-shop-container">
      {/* Mobile filter toggle button */}
      <button 
        className="gc-mobile-filter-toggle"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <i className="fas fa-sliders-h"></i> Filters & Categories
      </button>

      <div className="gc-shop-layout">
        {/* LEFT SIDEBAR - Beautiful filter panel */}
        <aside className={`gc-sidebar ${sidebarOpen ? 'open' : ''}`}>
          <div className="gc-sidebar-header">
            <h3 className="gc-sidebar-title">Filter Armory</h3>
            <p className="gc-sidebar-subtitle">Refine your quest</p>
          </div>

          {/* Categories Section with Search */}
          <div className="gc-filter-section">
            <div className="gc-filter-section-header">
              <i className="fas fa-tags"></i>
              <h4>Realms & Collections</h4>
            </div>
            
            {/* Category search input */}
            <div className="gc-category-search">
              <i className="fas fa-search"></i>
              <input
                type="text"
                placeholder="Search categories..."
                value={categorySearchQuery}
                onChange={(e) => setCategorySearchQuery(e.target.value)}
                className="gc-category-search-input"
              />
              {categorySearchQuery && (
                <button 
                  className="gc-category-search-clear"
                  onClick={() => setCategorySearchQuery('')}
                >
                  ×
                </button>
              )}
            </div>

            <div className="gc-categories-list">
              {filteredCategories.length > 0 ? (
                filteredCategories.map(category => (
                  <label key={category} className="gc-category-checkbox">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() => toggleCategory(category)}
                    />
                    <span className="gc-checkmark"></span>
                    <span className="gc-category-name">{category}</span>
                    <span className="gc-category-count">
                      {products.filter(p => p.categories?.includes(category)).length}
                    </span>
                  </label>
                ))
              ) : (
                <div className="gc-no-categories">
                  <i className="fas fa-skull"></i>
                  <span>No realms found...</span>
                </div>
              )}
            </div>
          </div>

          {/* Price Range Section */}
          <div className="gc-filter-section">
            <div className="gc-filter-section-header">
              <i className="fas fa-coins"></i>
              <h4>Price Range</h4>
            </div>
            <div className="gc-price-range">
              <div className="gc-price-input-group">
                <span className="gc-price-currency">$</span>
                <input
                  type="number"
                  placeholder="Min"
                  className="gc-price-input"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                />
              </div>
              <span className="gc-price-separator">—</span>
              <div className="gc-price-input-group">
                <span className="gc-price-currency">$</span>
                <input
                  type="number"
                  placeholder="Max"
                  className="gc-price-input"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                />
              </div>
            </div>
            <div className="gc-price-slider">
              <input
                type="range"
                min="0"
                max={maxPossiblePrice}
                value={priceRange.max || maxPossiblePrice}
                onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                className="gc-slider"
              />
            </div>
          </div>

          {/* Availability Section */}
          <div className="gc-filter-section">
            <div className="gc-filter-section-header">
              <i className="fas fa-box-check"></i>
              <h4>Availability</h4>
            </div>
            <div className="gc-availability-options">
              <button
                className={`gc-avail-btn ${filterInStock === 'all' ? 'active' : ''}`}
                onClick={() => setFilterInStock('all')}
              >
                All Items
              </button>
              <button
                className={`gc-avail-btn ${filterInStock === 'in-stock' ? 'active' : ''}`}
                onClick={() => setFilterInStock('in-stock')}
              >
                <i className="fas fa-check-circle"></i> In Stock
              </button>
              <button
                className={`gc-avail-btn ${filterInStock === 'out-of-stock' ? 'active' : ''}`}
                onClick={() => setFilterInStock('out-of-stock')}
              >
                <i className="fas fa-hourglass-end"></i> Out of Stock
              </button>
            </div>
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="gc-active-filters-sidebar">
              <div className="gc-active-header">
                <i className="fas fa-filter"></i>
                <span>Active filters</span>
                <button onClick={clearFilters} className="gc-clear-all-btn">
                  <i className="fas fa-times"></i> Clear all
                </button>
              </div>
              <div className="gc-active-tags">
                {searchQuery && (
                  <span className="gc-active-tag">
                    Search: "{searchQuery}"
                    <button onClick={() => setSearchQuery('')}>×</button>
                  </span>
                )}
                {selectedCategories.map(cat => (
                  <span key={cat} className="gc-active-tag">
                    {cat}
                    <button onClick={() => toggleCategory(cat)}>×</button>
                  </span>
                ))}
                {filterInStock !== 'all' && (
                  <span className="gc-active-tag">
                    {filterInStock === 'in-stock' ? 'In Stock' : 'Out of Stock'}
                    <button onClick={() => setFilterInStock('all')}>×</button>
                  </span>
                )}
                {(priceRange.min || priceRange.max) && (
                  <span className="gc-active-tag">
                    ${priceRange.min || 0} - ${priceRange.max || '∞'}
                    <button onClick={() => setPriceRange({ min: '', max: '' })}>×</button>
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Decorative footer */}
          <div className="gc-sidebar-footer">
            <div className="gc-sidebar-runes">ᚱ ᚨ ᚢ ᚾ ᛟ</div>
          </div>
        </aside>

        {/* RIGHT CONTENT - Product grid and sorting */}
        <main className="gc-main-content">
          {/* Header & Sorting Bar */}
          <div className="gc-content-header">
            <div className="gc-title-section">
              <h1 className="gc-shop-title">Armory of Gondor</h1>
              <p className="gc-shop-description">Forged in the fires of the White City — modern heirlooms for legendary homes</p>
            </div>
            
            {/* Global Search Bar */}
            <div className="gc-search-bar">
              <div className="gc-search-input-wrapper">
                <i className="fas fa-search gc-search-icon"></i>
                <input
                  type="text"
                  placeholder="Search for treasures by name, description, or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="gc-global-search"
                />
                {searchQuery && (
                  <button 
                    className="gc-search-clear"
                    onClick={() => setSearchQuery('')}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                )}
              </div>
              {searchQuery && (
                <div className="gc-search-results-info">
                  <i className="fas fa-scroll"></i>
                  <span>Found {sortedProducts.length} result{sortedProducts.length !== 1 ? 's' : ''} for "{searchQuery}"</span>
                </div>
              )}
            </div>

            <div className="gc-sorting-bar">
              <div className="gc-results-stats">
                <i className="fas fa-gem"></i>
                <span>{sortedProducts.length} noble piece{sortedProducts.length !== 1 ? 's' : ''}</span>
              </div>
              
              <div className="gc-sort-group">
                <label className="gc-sort-label">
                  <i className="fas fa-arrow-up-wide-short"></i> Sort by
                </label>
                <select className="gc-sort-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="default">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name-asc">Name: A to Z</option>
                  <option value="name-desc">Name: Z to A</option>
                  <option value="rating-desc">Highest Rated</option>
                </select>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          {sortedProducts.length > 0 ? (
            <div className="gc-product-grid">
              {sortedProducts.map((product, index) => (
                <div 
                  key={product.id} 
                  className="gc-grid-item"
                  style={{ '--animation-order': index }}
                >
                  <ProductCard
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    image={product.image}
                    description={product.description}
                    categories={product.categories}
                    rating={product.rating}
                    inStock={product.inStock}
                    discount={product.discount}
                    variant={product.variant || 'default'}
                    onAddToCart={onAddToCart}
                    onQuickView={onQuickView}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="gc-empty-state">
              <div className="gc-empty-icon">
                <i className="fas fa-crown"></i>
              </div>
              <div className="gc-empty-cross"></div>
              <p className="gc-empty-text">No treasures found in these realms...</p>
              <p className="gc-empty-hint">
                {searchQuery 
                  ? `No results matching "${searchQuery}". Try a different search or adjust your filters.`
                  : "Try adjusting your filters or explore other collections"}
              </p>
              <button className="gc-empty-btn" onClick={clearFilters}>
                <i className="fas fa-undo-alt"></i> Clear All Filters
              </button>
            </div>
          )}

          {/* Decorative footer */}
          <div className="gc-main-footer">
            <div className="gc-footer-line"></div>
            <p>© Gondor Chic — Where legend meets interior craft</p>
          </div>
        </main>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div className="gc-sidebar-overlay" onClick={() => setSidebarOpen(false)}></div>
      )}
    </div>
  );
};

export default ProductList;