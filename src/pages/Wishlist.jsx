import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Heart, ArrowRight, Trash2 } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { clearWishlist } from '../features/wishlist/wishlistSlice';
import '../styles/wishlist.css';

export function Wishlist() {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);

  if (wishlistItems.length === 0) {
    return (
      <div className="wishlist-page-container container">
        <div className="wishlist-empty-container">
          <div className="wishlist-empty-icon-wrapper">
            <Heart size={36} />
          </div>
          <h2 className="wishlist-empty-title">Your Wishlist is Empty</h2>
          <p className="wishlist-empty-desc">
            Save your favorite pieces here to keep track of items you love and buy them whenever you're ready.
          </p>
          <Link to="/shop" className="checkout-btn" style={{ display: 'inline-flex', width: 'auto', padding: '0.875rem 2rem' }}>
            Discover Products <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-page-container container">
      <div className="page-header-row">
        <h1 className="page-title">Saved Items ({wishlistItems.length})</h1>
        <button 
          type="button" 
          className="clear-all-btn"
          onClick={() => dispatch(clearWishlist())}
        >
          Clear Wishlist
        </button>
      </div>

      <div className="wishlist-grid">
        {wishlistItems.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}