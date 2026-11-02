import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import '../styles/global.css';

export function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', padding: '5rem 0 2rem 0', color: 'var(--text-secondary)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '3rem', marginBottom: '4rem' }}>
          
          {/* Brand Column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{ width: '28px', height: '28px', backgroundColor: 'var(--accent)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontFamily: 'var(--font-serif)', borderRadius: '4px' }}>N</div>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-primary)', letterSpacing: '0.05em' }}>NOVIQUE</span>
            </div>
            <p style={{ fontSize: '0.9rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
              An editorial e-commerce destination for curated luxury apparel, premium accessories, and modern lifestyle essentials.
            </p>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              {/* Instagram Icon */}
              <a href="#instagram" aria-label="Instagram" style={{ color: 'var(--text-primary)', transition: 'var(--transition)', display: 'inline-flex' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              {/* Facebook Icon */}
              <a href="#facebook" aria-label="Facebook" style={{ color: 'var(--text-primary)', transition: 'var(--transition)', display: 'inline-flex' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              {/* Twitter / X Icon */}
              <a href="#twitter" aria-label="Twitter" style={{ color: 'var(--text-primary)', transition: 'var(--transition)', display: 'inline-flex' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '1.25rem' }}>Quick Links</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
              <li><Link to="/shop" style={{ transition: 'var(--transition)' }}>Shop All</Link></li>
              <li><Link to="/shop?category=mens-clothing" style={{ transition: 'var(--transition)' }}>Men's Collection</Link></li>
              <li><Link to="/shop?category=womens-dresses" style={{ transition: 'var(--transition)' }}>Women's Collection</Link></li>
              <li><Link to="/shop?category=fragrances" style={{ transition: 'var(--transition)' }}>Luxury Fragrances</Link></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '1.25rem' }}>Customer Care</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
              <li><a href="#shipping" style={{ transition: 'var(--transition)' }}>Shipping & Returns</a></li>
              <li><a href="#tracking" style={{ transition: 'var(--transition)' }}>Order Tracking</a></li>
              <li><a href="#faq" style={{ transition: 'var(--transition)' }}>Frequently Asked Questions</a></li>
              <li><a href="#terms" style={{ transition: 'var(--transition)' }}>Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '1.25rem' }}>Contact Us</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.9rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <MapPin size={18} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                <span>742 Evergreen Terrace, New York, NY</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Phone size={18} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                <span>+1 (800) 932-8421</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Mail size={18} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                <span>support@novique.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '2rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', fontSize: '0.85rem' }}>
          <p>&copy; {new Date().getFullYear()} NOVIQUE Inc. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <a href="#privacy">Privacy Policy</a>
            <a href="#cookies">Cookie Preferences</a>
          </div>
        </div>
      </div>
    </footer>
  );
}