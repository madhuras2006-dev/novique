import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Search, CheckCircle, Package, Truck, Home, ArrowLeft } from 'lucide-react';

export function TrackOrder() {
  const [searchParams] = useSearchParams();
  const [searchId, setSearchId] = useState('');
  const [activeOrder, setActiveOrder] = useState(null);

  const orders = useSelector((state) => state.orders.orders);

  useEffect(() => {
    const idParam = searchParams.get('id');
    if (idParam) {
      setSearchId(idParam);
      const match = orders.find((o) => o.id.toLowerCase() === idParam.toLowerCase());
      if (match) setActiveOrder(match);
    } else if (orders.length > 0) {
      setActiveOrder(orders[0]);
      setSearchId(orders[0].id);
    }
  }, [searchParams, orders]);

  const handleSearch = (e) => {
    e.preventDefault();
    const match = orders.find((o) => o.id.toLowerCase() === searchId.trim().toLowerCase());
    setActiveOrder(match || null);
  };

  const steps = [
    { title: 'Order Placed', icon: CheckCircle },
    { title: 'Processing', icon: Package },
    { title: 'Shipped', icon: Truck },
    { title: 'Out for Delivery', icon: Truck },
    { title: 'Delivered', icon: Home },
  ];

  return (
    <div className="container" style={{ padding: '4rem 0' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.25rem' }}>Track Your Order</h1>
          <Link to="/shop" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent)' }}>
            <ArrowLeft size={16} /> Back to Shop
          </Link>
        </div>

        {/* Lookup Bar */}
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.75rem', marginBottom: '3rem' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <input
              type="text"
              placeholder="Enter Order ID (e.g., NOV-849201)"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="form-input"
              style={{ width: '100%', paddingLeft: '2.5rem' }}
            />
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
          </div>
          <button type="submit" className="btn-primary" style={{ padding: '0 2rem' }}>Search</button>
        </form>

        {activeOrder ? (
          <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '2.5rem' }}>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1.5rem', marginBottom: '2.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700' }}>{activeOrder.id}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Placed on {activeOrder.date}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Estimated Delivery:</span>
                <div style={{ fontWeight: '700', color: 'var(--accent)', fontSize: '1.1rem' }}>{activeOrder.estimatedDelivery}</div>
              </div>
            </div>

            {/* Stepper Visual */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.5rem', marginBottom: '3rem', position: 'relative' }}>
              {steps.map((step, idx) => {
                const IconComponent = step.icon;
                const isCompleted = idx + 1 <= activeOrder.statusStep;

                return (
                  <div key={idx} style={{ textAlign: 'center', opacity: isCompleted ? 1 : 0.4 }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: isCompleted ? 'var(--accent)' : 'var(--bg-secondary)',
                      color: isCompleted ? '#FFF' : 'var(--text-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 0.75rem auto'
                    }}>
                      <IconComponent size={20} />
                    </div>
                    <span style={{ fontSize: '0.8rem', fontWeight: isCompleted ? '700' : '400', display: 'block' }}>
                      {step.title}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Order Details Grid */}
            <div style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '6px', fontSize: '0.9rem' }}>
              <div style={{ marginBottom: '1rem' }}>
                <strong>Shipping Address:</strong> {activeOrder.customer?.address}
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <strong>Payment Method:</strong> {activeOrder.paymentMethod} ({activeOrder.paymentStatus})
              </div>
              <div>
                <strong>Total Amount:</strong> ${activeOrder.grandTotal?.toFixed(2)}
              </div>
            </div>

          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '3rem', background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
            <h3>No Order Found</h3>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
              Please verify the Order ID or place a new order at checkout.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}