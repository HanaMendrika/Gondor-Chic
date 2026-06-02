import React, { useState } from 'react';
import ProductCard from './ProductCard';
import './ProductList.css';

const ProductList = ({ products, onAddToCart }) => {
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');

  // Get unique categories from products
  const categories = ['all', ...new Set(products.map(p => p.category).filter(Boolean))];

  // Filter products
  const filteredProducts = filterCategory === 'all'
    ? products
    : products.filter(p => p.category === filterCategory);

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return parseFloat(a.price) - parseFloat(b.price);
    if (sortBy === 'price-desc') return parseFloat(b.price) - parseFloat(a.price);
    if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
    if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
    return 0;
  });

  return (
    <div className="gc-product-list">
      {/* Header with decorative elements */}
      <div className="gc-list-header">
        <div className="gc-header-decoration">
          <span className="gc-header-cross"></span>
          <span className="gc-header-line"></span>
          <span className="gc-header-cross"></span>
        </div>
        <h2 className="gc-list-title">Armory of Gondor</h2>
        <p className="gc-list-subtitle">Forged in the fires of the White City</p>
        <div className="gc-header-decoration">
          <span className="gc-header-cross"></span>
          <span className="gc-header-line"></span>
          <span className="gc-header-cross"></span>
        </div>
      </div>

      {/* Filter and Sort Controls */}
      <div className="gc-list-controls">
        {/* Category Filter */}
        <div className="gc-filter-group">
          <label className="gc-filter-label">Filter by Realm</label>
          <div className="gc-filter-buttons">
            {categories.map(cat => (
              <button
                key={cat}
                className={`gc-filter-btn ${filterCategory === cat ? 'active' : ''}`}
                onClick={() => setFilterCategory(cat)}
              >
                {cat === 'all' ? 'All Treasures' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Sort Dropdown */}
        <div className="gc-sort-group">
          <label className="gc-filter-label">Sort by</label>
          <select
            className="gc-sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="default">Default</option>
            <option value="price-asc">Price (Low to High)</option>
            <option value="price-desc">Price (High to Low)</option>
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="gc-results-count">
        <span className="gc-count-text">
          {sortedProducts.length} item{sortedProducts.length !== 1 ? 's' : ''} found
        </span>
        <div className="gc-count-decoration"></div>
      </div>

      {/* Product Grid */}
      {sortedProducts.length > 0 ? (
        <div className="gc-product-grid">
          {sortedProducts.map(product => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
              description={product.description}
              category={product.category}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      ) : (
        <div className="gc-empty-state">
          <div className="gc-empty-cross"></div>
          <p className="gc-empty-text">No treasures found in this realm...</p>
          <button
            className="gc-empty-btn"
            onClick={() => setFilterCategory('all')}
          >
            View All Treasures
          </button>
        </div>
      )}

      {/* Decorative bottom border */}
      <div className="gc-list-footer">
        <div className="gc-footer-runes">ᚱ ᚨ ᚢ ᚾ ᛟ</div>
      </div>
    </div>
  );
};

export default ProductList;