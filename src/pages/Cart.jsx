import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ShoppingBag, Trash2, ArrowRight, Minus, Plus, ShoppingCart } from 'lucide-react';
import { updateQuantity, removeFromCart, clearCart } from '../features/cart/cartSlice';
import '../styles/cart.css';

export function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingFee = subtotal > 150 || subtotal === 0 ? 0 : 15;
  const grandTotal = subtotal + shippingFee;

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;
    dispatch(updateQuantity({ id, quantity: newQuantity }));
  };

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-page-container container">
        <div className="empty-state">
          <div className="empty-state-icon" style={{ display: 'flex', justifyContent: 'center' }}>
            <ShoppingCart size={64} />
          </div>
          <h3>Your Bag is Empty</h3>
          <p>Explore our curated collections and add your favorite pieces to the bag.</p>
          <Link to="/shop" className="checkout-btn" style={{ display: 'inline-flex', width: 'auto', padding: '0.875rem 2rem' }}>
            Explore Shop <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page-container container">
      <div className="page-header-row">
        <h1 className="page-title">Shopping Bag ({cartItems.reduce((a, b) => a + b.quantity, 0)})</h1>
        <button type="button" className="clear-all-btn" onClick={handleClearCart}>
          Clear Shopping Bag
        </button>
      </div>

      <div className="cart-layout">
        {/* Cart Item List */}
        <div className="cart-items-list">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item-card">
              <img
                src={item.thumbnail || (item.images && item.images[0]) || ''}
                alt={item.title}
                className="cart-item-image"
              />
              <div className="cart-item-details">
                <h3 className="cart-item-title">{item.title}</h3>
                <div className="cart-item-price">${item.price.toFixed(2)}</div>
                
                <div className="cart-item-controls">
                  <div className="cart-quantity-box">
                    <button
                      type="button"
                      className="cart-qty-btn"
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      aria-label="Decrease quantity"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="cart-qty-value">{item.quantity}</span>
                    <button
                      type="button"
                      className="cart-qty-btn"
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      aria-label="Increase quantity"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <button
                    type="button"
                    className="remove-item-btn"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    <Trash2 size={16} />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Sidebar */}
        <div className="order-summary-card">
          <h2 className="summary-title">Order Summary</h2>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <div className="summary-row">
            <span>Estimated Shipping</span>
            <span>{shippingFee === 0 ? 'Free' : `$${shippingFee.toFixed(2)}`}</span>
          </div>

          {subtotal < 150 && subtotal > 0 && (
            <p style={{ fontSize: '0.8rem', color: 'var(--accent)', marginTop: '-0.5rem', marginBottom: '1rem' }}>
              Add ${(150 - subtotal).toFixed(2)} more to qualify for Free Shipping!
            </p>
          )}

          <div className="summary-row total">
            <span>Total</span>
            <span>${grandTotal.toFixed(2)}</span>
          </div>

          <button
            type="button"
            className="checkout-btn"
            onClick={() => navigate('/checkout')}
          >
            <span>Proceed to Checkout</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}