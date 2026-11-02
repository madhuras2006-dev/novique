import React from 'react';
import '../styles/components.css';

export function Loader() {
  return (
    <div className="loader-container">
      <div className="spinner"></div>
      <p>Loading NOVIQUE collection...</p>
    </div>
  );
}