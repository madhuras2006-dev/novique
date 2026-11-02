import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ShoppingBag, Heart, Sun, Moon, Menu, X, User, PackageSearch } from 'lucide-react';
import { toggleTheme } from '../features/theme/themeSlice';
import '../styles/navbar.css';

export function Navbar() {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Total quantity calculation for cart items
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalWishlistCount = wishlistItems.length;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="navbar-container">
      <div className="container navbar-content">
        {/* Brand Logo */}
        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
          <div className="logo-icon">N</div>
          <span className="logo-text">NOVIQUE</span>
        </Link>

        {/* Desktop Links */}
        <div className="navbar-links">
          <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Home
          </NavLink>
          <NavLink to="/shop" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Shop
          </NavLink>
          <NavLink to="/track-order" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Track Order
          </NavLink>
        </div>

        {/* Action Controls */}
        <div className="navbar-actions">
          {/* Theme Switcher */}
          <button
            type="button"
            className="action-btn"
            onClick={() => dispatch(toggleTheme())}
            aria-label="Toggle Theme"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Wishlist Link */}
          <Link to="/wishlist" className="action-btn" aria-label="Wishlist">
            <Heart size={20} />
            {totalWishlistCount > 0 && <span className="badge-count">{totalWishlistCount}</span>}
          </Link>

          {/* Cart Link */}
          <Link to="/cart" className="action-btn" aria-label="Shopping Bag">
            <ShoppingBag size={20} />
            {totalCartCount > 0 && <span className="badge-count">{totalCartCount}</span>}
          </Link>

          {/* Account Link */}
          <Link to="/login" className="account-btn">
            <User size={18} />
            <span>Account</span>
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className="mobile-menu-toggle"
            onClick={toggleMobileMenu}
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div className={`mobile-drawer ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-drawer-header">
          <span className="logo-text">NOVIQUE</span>
          <button type="button" className="action-btn" onClick={closeMobileMenu}>
            <X size={22} />
          </button>
        </div>
        <div className="mobile-drawer-links">
          <Link to="/" onClick={closeMobileMenu}>Home</Link>
          <Link to="/shop" onClick={closeMobileMenu}>Shop</Link>
          <Link to="/track-order" onClick={closeMobileMenu}>Track Order</Link>
          <Link to="/wishlist" onClick={closeMobileMenu}>Wishlist ({totalWishlistCount})</Link>
          <Link to="/cart" onClick={closeMobileMenu}>Bag ({totalCartCount})</Link>
          <Link to="/login" onClick={closeMobileMenu}>Account</Link>
        </div>
      </div>
    </nav>
  );
}