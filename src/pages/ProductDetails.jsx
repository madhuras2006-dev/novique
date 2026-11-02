import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Heart, 
  Star, 
  ShoppingBag, 
  Minus, 
  Plus, 
  ChevronRight, 
  Truck, 
  ShieldCheck, 
  RotateCcw 
} from 'lucide-react';
import { fetchProductById } from '../services/productService';
import { addToCart } from '../features/cart/cartSlice';
import { toggleWishlist } from '../features/wishlist/wishlistSlice';
import { ProductCard } from '../components/ProductCard';
import { Loader } from '../components/Loader';
import '../styles/product-details.css';

export function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const wishlistItems = useSelector((state) => state.wishlist.items);
  const allProducts = useSelector((state) => state.products.items);

  const isWishlisted = product ? wishlistItems.some((item) => item.id === product.id) : false;

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);
    setQuantity(1);

    fetchProductById(id)
      .then((data) => {
        if (isMounted) {
          setProduct(data);
          setSelectedImage(data.thumbnail || (data.images && data.images[0]) || '');
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError('Failed to load product details.');
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="container" style={{ padding: '5rem 0' }}>
        <Loader />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container" style={{ padding: '5rem 0', textAlign: 'center' }}>
        <h2>Product Not Found</h2>
        <p style={{ color: 'var(--text-secondary)', margin: '1rem 0 2rem 0' }}>
          The product you are looking for does not exist or has been removed.
        </p>
        <Link to="/shop" className="btn-primary" style={{ display: 'inline-flex' }}>
          Back to Shop
        </Link>
      </div>
    );
  }

  const discountPercentage = product.discountPercentage ? Math.round(product.discountPercentage) : 0;
  const originalPrice = discountPercentage > 0 
    ? (product.price / (1 - discountPercentage / 100)).toFixed(2) 
    : null;

  // Filter related products from the same category
  const relatedProducts = allProducts
    .filter((item) => item.category === product.category && item.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity }));
  };

  const handleWishlistToggle = () => {
    dispatch(toggleWishlist(product));
  };

  return (
    <div className="product-details-container container">
      {/* Breadcrumb Navigation */}
      <nav className="breadcrumb-nav">
        <Link to="/" className="breadcrumb-link">Home</Link>
        <ChevronRight size={14} />
        <Link to="/shop" className="breadcrumb-link">Shop</Link>
        <ChevronRight size={14} />
        <span style={{ color: 'var(--text-primary)', textTransform: 'capitalize' }}>
          {product.category}
        </span>
      </nav>

      <div className="product-details-grid">
        {/* Gallery Column */}
        <div className="product-gallery">
          <div className="main-image-wrapper">
            <img src={selectedImage} alt={product.title} className="main-image" />
          </div>

          {product.images && product.images.length > 1 && (
            <div className="thumbnail-list">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`thumbnail-btn ${selectedImage === img ? 'active' : ''}`}
                  onClick={() => setSelectedImage(img)}
                >
                  <img src={img} alt={`${product.title} view ${idx + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info Column */}
        <div className="product-info-panel">
          <span className="product-info-category">{product.category}</span>
          <h1 className="product-info-title">{product.title}</h1>

          <div className="product-info-meta">
            <div className="rating-badge">
              <Star size={16} className="star-icon" />
              <span>{product.rating ? product.rating.toFixed(1) : '4.5'}</span>
            </div>
            <span style={{ color: 'var(--border-color)' }}>|</span>
            <span className="stock-status">
              {product.stock ? `In Stock (${product.stock})` : 'In Stock'}
            </span>
          </div>

          <div className="product-info-price">
            <span className="price-main">${product.price.toFixed(2)}</span>
            {originalPrice && (
              <>
                <span className="original-price" style={{ fontSize: '1.25rem' }}>${originalPrice}</span>
                <span className="price-discount-tag">Save {discountPercentage}%</span>
              </>
            )}
          </div>

          <p className="product-info-desc">{product.description}</p>

          {/* Quantity & CTA Buttons */}
          <div className="purchase-controls">
            <div className="quantity-selector">
              <button
                type="button"
                className="quantity-btn"
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                aria-label="Decrease Quantity"
              >
                <Minus size={16} />
              </button>
              <span className="quantity-display">{quantity}</span>
              <button
                type="button"
                className="quantity-btn"
                onClick={() => setQuantity((prev) => prev + 1)}
                aria-label="Increase Quantity"
              >
                <Plus size={16} />
              </button>
            </div>

            <button type="button" className="btn-add-cart-large" onClick={handleAddToCart}>
              <ShoppingBag size={20} />
              <span>Add to Bag</span>
            </button>

            <button
              type="button"
              className={`btn-wishlist-large ${isWishlisted ? 'active' : ''}`}
              onClick={handleWishlistToggle}
              aria-label="Save to Wishlist"
            >
              <Heart size={20} fill={isWishlisted ? 'currentColor' : 'none'} />
            </button>
          </div>

          {/* Guarantee Badges */}
          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Truck size={18} style={{ color: 'var(--accent)' }} />
              <span>Free standard shipping on orders over $150</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <ShieldCheck size={18} style={{ color: 'var(--accent)' }} />
              <span>Authenticity guaranteed & 2-year warranty</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <RotateCcw size={18} style={{ color: 'var(--accent)' }} />
              <span>Complimentary 30-day return policy</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="related-products-section">
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '2rem' }}>
            You May Also Like
          </h2>
          <div className="product-grid">
            {relatedProducts.map((relProduct) => (
              <ProductCard key={relProduct.id} product={relProduct} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}