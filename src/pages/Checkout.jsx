import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, CheckCircle2, ArrowRight, CreditCard, QrCode, Banknote } from 'lucide-react';
import { clearCart } from '../features/cart/cartSlice';
import { createOrder } from '../features/orders/orderSlice';
import '../styles/auth.css';

export function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const currentOrder = useSelector((state) => state.orders.currentOrder);

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' | 'upi' | 'cod'

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    cardNumber: '',
    expDate: '',
    cvv: '',
    upiId: '',
  });

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingFee = subtotal > 150 || subtotal === 0 ? 0 : 15;
  const grandTotal = subtotal + shippingFee;

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      alert('Your cart is empty.');
      navigate('/shop');
      return;
    }

    const orderPayload = {
      items: cartItems,
      subtotal,
      shippingFee,
      grandTotal,
      paymentMethod: paymentMethod.toUpperCase(),
      paymentStatus: paymentMethod === 'cod' ? 'Pending (Cash on Delivery)' : 'Paid',
      customer: {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        address: `${formData.address}, ${formData.city} - ${formData.postalCode}`,
      },
    };

    dispatch(createOrder(orderPayload));
    dispatch(clearCart());
    setOrderPlaced(true);
  };

  if (orderPlaced && currentOrder) {
    return (
      <div className="container" style={{ padding: '6rem 0', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '4rem 2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'center', color: '#10B981', marginBottom: '1.5rem' }}>
            <CheckCircle2 size={64} />
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', marginBottom: '0.5rem' }}>Order Placed Successfully!</h1>
          <p style={{ fontWeight: '600', color: 'var(--accent)', marginBottom: '1rem' }}>Order ID: {currentOrder.id}</p>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: '1.6' }}>
            Payment Method: <strong>{currentOrder.paymentMethod}</strong> ({currentOrder.paymentStatus})
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link to={`/track-order?id=${currentOrder.id}`} className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.875rem 1.5rem' }}>
              Track Shipment <ArrowRight size={18} />
            </Link>
            <Link to="/shop" style={{ display: 'inline-flex', alignItems: 'center', padding: '0.875rem 1.5rem', border: '1px solid var(--border-color)', borderRadius: '4px' }}>
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page-container container">
      <h1 className="page-title" style={{ marginBottom: '2rem' }}>Secure Checkout</h1>

      <form onSubmit={handlePlaceOrder} className="checkout-grid">
        <div>
          {/* Shipping Address */}
          <div className="checkout-section-card">
            <h2 className="checkout-section-title">1. Shipping Address</h2>
            <div className="form-row" style={{ marginBottom: '1.5rem' }}>
              <div className="form-group">
                <label className="form-label">First Name</label>
                <input type="text" name="firstName" required value={formData.firstName} onChange={handleChange} placeholder="Jane" className="form-input" />
              </div>
              <div className="form-group">
                <label className="form-label">Last Name</label>
                <input type="text" name="lastName" required value={formData.lastName} onChange={handleChange} placeholder="Doe" className="form-input" />
              </div>
            </div>
            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label className="form-label">Email Address</label>
              <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="jane.doe@example.com" className="form-input" />
            </div>
            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label className="form-label">Street Address</label>
              <input type="text" name="address" required value={formData.address} onChange={handleChange} placeholder="742 Evergreen Terrace" className="form-input" />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">City</label>
                <input type="text" name="city" required value={formData.city} onChange={handleChange} placeholder="New York" className="form-input" />
              </div>
              <div className="form-group">
                <label className="form-label">Postal / Zip Code</label>
                <input type="text" name="postalCode" required value={formData.postalCode} onChange={handleChange} placeholder="10001" className="form-input" />
              </div>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="checkout-section-card">
            <h2 className="checkout-section-title">2. Select Payment Method</h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                style={{
                  padding: '1rem',
                  borderRadius: '6px',
                  border: `2px solid ${paymentMethod === 'card' ? 'var(--accent)' : 'var(--border-color)'}`,
                  background: paymentMethod === 'card' ? 'var(--bg-secondary)' : 'transparent',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.5rem',
                  cursor: 'pointer'
                }}
              >
                <CreditCard size={24} />
                <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>Credit/Debit</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                style={{
                  padding: '1rem',
                  borderRadius: '6px',
                  border: `2px solid ${paymentMethod === 'upi' ? 'var(--accent)' : 'var(--border-color)'}`,
                  background: paymentMethod === 'upi' ? 'var(--bg-secondary)' : 'transparent',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.5rem',
                  cursor: 'pointer'
                }}
              >
                <QrCode size={24} />
                <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>UPI / QR</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('cod')}
                style={{
                  padding: '1rem',
                  borderRadius: '6px',
                  border: `2px solid ${paymentMethod === 'cod' ? 'var(--accent)' : 'var(--border-color)'}`,
                  background: paymentMethod === 'cod' ? 'var(--bg-secondary)' : 'transparent',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.5rem',
                  cursor: 'pointer'
                }}
              >
                <Banknote size={24} />
                <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>Cash on Delivery</span>
              </button>
            </div>

            {/* Card Inputs */}
            {paymentMethod === 'card' && (
              <div>
                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                  <label className="form-label">Card Number</label>
                  <input type="text" name="cardNumber" required maxLength="19" value={formData.cardNumber} onChange={handleChange} placeholder="4532 •••• •••• ••••" className="form-input" />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Expiration Date</label>
                    <input type="text" name="expDate" required value={formData.expDate} onChange={handleChange} placeholder="MM/YY" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">CVV</label>
                    <input type="password" name="cvv" required maxLength="4" value={formData.cvv} onChange={handleChange} placeholder="123" className="form-input" />
                  </div>
                </div>
              </div>
            )}

            {/* UPI Inputs */}
            {paymentMethod === 'upi' && (
              <div>
                <div className="form-group">
                  <label className="form-label">Virtual Payment Address (VPA / UPI ID)</label>
                  <input type="text" name="upiId" required value={formData.upiId} onChange={handleChange} placeholder="username@upi / mobile@paytm" className="form-input" />
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.75rem' }}>
                  You will receive a payment request notification on your UPI app (Google Pay, PhonePe, Paytm).
                </p>
              </div>
            )}

            {/* COD Details */}
            {paymentMethod === 'cod' && (
              <div style={{ padding: '1rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '6px', fontSize: '0.9rem', lineHeight: '1.6' }}>
                <p style={{ fontWeight: '600', marginBottom: '0.25rem' }}>Pay cash when your shipment arrives.</p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                  Please keep exact cash ready upon delivery. An SMS OTP will be requested by the delivery courier.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Order Summary Column */}
        <div>
          <div className="checkout-section-card" style={{ position: 'sticky', top: '100px' }}>
            <h2 className="checkout-section-title">Order Summary</h2>

            <div style={{ maxHeight: '240px', overflowY: 'auto', marginBottom: '1.5rem' }}>
              {cartItems.map((item) => (
                <div key={item.id} className="order-review-item" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <div>
                    <h4 style={{ fontSize: '0.85rem', fontWeight: '600' }}>{item.title}</h4>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Qty: {item.quantity}</span>
                  </div>
                  <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span>Shipping</span>
                <span>{shippingFee === 0 ? 'Free' : `$${shippingFee.toFixed(2)}`}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.15rem', fontWeight: '700', marginTop: '0.75rem' }}>
                <span>Total Amount</span>
                <span>${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <button type="submit" className="checkout-btn" style={{ width: '100%', padding: '1rem' }}>
              <ShieldCheck size={18} />
              <span>Place Order ({paymentMethod.toUpperCase()})</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}