import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Truck, RotateCcw, Award } from 'lucide-react';
import { fetchProducts, fetchCategories } from '../features/products/productSlice';
import { ProductCard } from '../components/ProductCard';
import { CategoryCard } from '../components/CategoryCard';
import { Loader } from '../components/Loader';
import '../styles/home.css';

export function Home() {
  const dispatch = useDispatch();
  const { items: products, categories, status } = useSelector((state) => state.products);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);

  // Featured categories mapping with high quality curated placeholder images
  const categoryImages = {
    'beauty': 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80',
    'fragrances': 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=80',
    'furniture': 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80',
    'groceries': 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80'
  };

  const featuredCategories = categories.slice(0, 4);
  const featuredProducts = products.slice(0, 8);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-content">
            <span className="hero-subtitle">Autumn / Winter Collection 2026</span>
            <h1 className="hero-title">Refine Your Everyday Aesthetic.</h1>
            <p className="hero-description">
              Discover curated luxury essentials, minimalist apparel, and lifestyle pieces crafted with high-grade material standards.
            </p>
            <div className="hero-actions">
              <Link to="/shop" className="btn-primary">
                Shop Collection <ArrowRight size={18} />
              </Link>
              <Link to="/shop" className="btn-secondary">
                Explore Categories
              </Link>
            </div>
          </div>

          <div className="hero-image-wrapper">
            <img
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80"
              alt="NOVIQUE Editorial"
              className="hero-image"
            />
          </div>
        </div>
      </section>

      {/* Featured Categories Section */}
      <section className="section container">
        <div className="section-header">
          <div>
            <h2 className="section-title">Curated Collections</h2>
            <p className="section-subtitle">Explore timeless categories selected for modern living</p>
          </div>
          <Link to="/shop" className="view-all-link">
            View All Categories <ArrowRight size={16} />
          </Link>
        </div>

        {status === 'loading' && categories.length === 0 ? (
          <Loader />
        ) : (
          <div className="categories-grid">
            {featuredCategories.map((cat, idx) => {
              const catName = typeof cat === 'object' ? cat.slug || cat.name : cat;
              const imgUrl = categoryImages[catName] || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=600&q=80';
              return <CategoryCard key={idx} category={cat} image={imgUrl} />;
            })}
          </div>
        )}
      </section>

      {/* Featured Products Section */}
      <section className="section container">
        <div className="section-header">
          <div>
            <h2 className="section-title">Trending Essentials</h2>
            <p className="section-subtitle">Our most coveted pieces available this season</p>
          </div>
          <Link to="/shop" className="view-all-link">
            Shop All Products <ArrowRight size={16} />
          </Link>
        </div>

        {status === 'loading' && products.length === 0 ? (
          <Loader />
        ) : (
          <div className="product-grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Editorial Promotional Banner */}
      <section className="container">
        <div className="promo-banner">
          <div className="promo-content">
            <span className="promo-tag">Limited Release</span>
            <h2 className="promo-title">Minimalist Modernism for Living Spaces</h2>
            <p className="promo-desc">
              Elevate your personal space with handcrafted furniture and architectural accents designed for maximum elegance.
            </p>
            <Link to="/shop?category=furniture" className="btn-primary">
              Discover Furniture
            </Link>
          </div>
        </div>
      </section>

      {/* Value Propositions / Why Choose Us */}
      <section className="section container">
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon-box">
              <Truck size={28} />
            </div>
            <h3 className="feature-title">Global Express Delivery</h3>
            <p className="feature-desc">Complimentary doorstep delivery on all orders exceeding $150 worldwide.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-box">
              <ShieldCheck size={28} />
            </div>
            <h3 className="feature-title">Authenticity Guaranteed</h3>
            <p className="feature-desc">Every piece is verified and sourced directly from authentic manufacturer artisans.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-box">
              <RotateCcw size={28} />
            </div>
            <h3 className="feature-title">Seamless Returns</h3>
            <p className="feature-desc">30-day hassle-free exchange and full refund policy with pre-paid return tags.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-box">
              <Award size={28} />
            </div>
            <h3 className="feature-title">Premium Support</h3>
            <p className="feature-desc">Dedicated concierge service ready to assist you 24/7 with fit and order details.</p>
          </div>
        </div>
      </section>
    </div>
  );
}