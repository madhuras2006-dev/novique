import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Heart, Star, ShoppingBag } from 'lucide-react';
import { toggleWishlist } from '../features/wishlist/wishlistSlice';
import { addToCart } from '../features/cart/cartSlice';
import '../styles/components.css';

export function ProductCard({ product }) {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);
  
  // Check if product is in wishlist
  const isWishlisted = wishlistItems.some((item) => item.id === product.id);

  // Fallbacks for product properties
  const imageUrl = product.thumbnail || (product.images && product.images[0]) || '';
  const discountPercentage = product.discountPercentage ? Math.round(product.discountPercentage) : 0;
  
  // Calculate original price if discount exists
  const originalPrice = discountPercentage > 0 
    ? (product.price / (1 - discountPercentage / 100)).toFixed(2) 
    : null;

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleWishlist(product));
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart(product));
  };

  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <div className="product-card-image-wrapper">
        <img src={imageUrl} alt={product.title} className="product-card-image" loading="lazy" />
        
        {discountPercentage > 0 && (
          <span className="discount-badge">-{discountPercentage}%</span>
        )}

        <button 
          type="button"
          className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
          onClick={handleWishlistClick}
          aria-label="Save to Wishlist"
        >
          <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="product-card-content">
        <span className="product-card-category">{product.category}</span>
        <h3 className="product-card-title" title={product.title}>{product.title}</h3>
        
        <div className="product-card-rating">
          <Star size={14} className="star-icon" />
          <span>{product.rating ? product.rating.toFixed(1) : '4.5'}</span>
        </div>

        <div className="product-card-price-row">
          <span className="current-price">${product.price.toFixed(2)}</span>
          {originalPrice && (
            <span className="original-price">${originalPrice}</span>
          )}
        </div>

        <button 
          type="button" 
          className="add-to-cart-btn"
          onClick={handleAddToCart}
        >
          <ShoppingBag size={16} />
          <span>Add to Bag</span>
        </button>
      </div>
    </Link>
  );
}