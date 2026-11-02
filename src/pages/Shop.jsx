import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { 
  fetchProducts, 
  fetchCategories, 
  setSelectedCategory, 
  setSortBy, 
  setSearchQuery, 
  setPage 
} from '../features/products/productSlice';
import { ProductCard } from '../components/ProductCard';
import { SearchBar } from '../components/SearchBar';
import { Loader } from '../components/Loader';
import { SlidersHorizontal, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';
import '../styles/shop.css';

export function Shop() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    items: products,
    categories,
    status,
    selectedCategory,
    sortBy,
    searchQuery,
    currentPage,
    itemsPerPage
  } = useSelector((state) => state.products);

  // Sync URL search params on mount or param changes
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      dispatch(setSelectedCategory(categoryParam));
    }
  }, [searchParams, dispatch]);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);

  // Filter products by search query and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                            product.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  // Sort filtered products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'name') return a.title.localeCompare(b.title);
    return 0; // 'featured' or default
  });

  // Pagination calculation
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = sortedProducts.slice(startIndex, startIndex + itemsPerPage);

  const handleCategorySelect = (categoryName) => {
    dispatch(setSelectedCategory(categoryName));
    dispatch(setPage(1));
    if (categoryName === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ category: categoryName });
    }
  };

  const handleClearFilters = () => {
    dispatch(setSelectedCategory('all'));
    dispatch(setSearchQuery(''));
    dispatch(setSortBy('featured'));
    dispatch(setPage(1));
    setSearchParams({});
  };

  return (
    <div className="shop-page-container container">
      {/* Header */}
      <div className="shop-header">
        <h1 className="shop-title">Shop Collection</h1>
        <p className="shop-subtitle">Explore our full luxury catalog with custom sorting and filters</p>
      </div>

      <div className="shop-layout">
        {/* Filter Sidebar */}
        <aside className="filter-sidebar">
          <div className="filter-section-title">
            <span>Filter By</span>
            <SlidersHorizontal size={18} />
          </div>

          <div className="filter-group">
            <h4 style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
              Categories
            </h4>
            <div className="category-filter-list">
              <button
                type="button"
                className={`category-filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
                onClick={() => handleCategorySelect('all')}
              >
                All Products
              </button>
              {categories.map((cat, idx) => {
                const catSlug = typeof cat === 'object' ? cat.slug || cat.name : cat;
                const catLabel = typeof cat === 'object' 
                  ? cat.name 
                  : String(cat).replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
                
                return (
                  <button
                    key={idx}
                    type="button"
                    className={`category-filter-btn ${selectedCategory.toLowerCase() === catSlug.toLowerCase() ? 'active' : ''}`}
                    onClick={() => handleCategorySelect(catSlug)}
                  >
                    {catLabel}
                  </button>
                );
              })}
            </div>
          </div>

          {(selectedCategory !== 'all' || searchQuery !== '' || sortBy !== 'featured') && (
            <button type="button" className="clear-filters-btn" onClick={handleClearFilters}>
              <RotateCcw size={14} style={{ marginRight: '0.5rem', display: 'inline' }} />
              Reset Filters
            </button>
          )}
        </aside>

        {/* Main Content Area */}
        <main>
          {/* Toolbar */}
          <div className="shop-toolbar">
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={(query) => {
                dispatch(setSearchQuery(query));
                dispatch(setPage(1));
              }}
              placeholder="Search in shop..."
            />

            <div className="sort-select-wrapper">
              <label htmlFor="sort-select" className="sort-label">Sort By:</label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => dispatch(setSortBy(e.target.value))}
                className="sort-select"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>
          </div>

          <div className="product-count-text" style={{ marginBottom: '1.5rem' }}>
            Showing {sortedProducts.length > 0 ? startIndex + 1 : 0}–
            {Math.min(startIndex + itemsPerPage, sortedProducts.length)} of {sortedProducts.length} results
          </div>

          {/* Product Grid */}
          {status === 'loading' && products.length === 0 ? (
            <Loader />
          ) : paginatedProducts.length > 0 ? (
            <div className="product-grid">
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="no-products-found">
              <h3>No Products Match Your Criteria</h3>
              <p>Try clearing your active filters or adjusting your search phrase.</p>
              <button 
                type="button" 
                className="clear-filters-btn" 
                style={{ width: 'auto', padding: '0.75rem 2rem', marginTop: '1.5rem' }}
                onClick={handleClearFilters}
              >
                Reset All Filters
              </button>
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="pagination-container">
              <button
                type="button"
                className="page-btn"
                disabled={currentPage === 1}
                onClick={() => dispatch(setPage(currentPage - 1))}
              >
                <ChevronLeft size={18} />
              </button>

              {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  type="button"
                  className={`page-btn ${currentPage === pageNum ? 'active' : ''}`}
                  onClick={() => dispatch(setPage(pageNum))}
                >
                  {pageNum}
                </button>
              ))}

              <button
                type="button"
                className="page-btn"
                disabled={currentPage === totalPages}
                onClick={() => dispatch(setPage(currentPage + 1))}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}