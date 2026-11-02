import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/components.css';

export function CategoryCard({ category, image }) {
  const navigate = useNavigate();

  const handleCategoryClick = () => {
    // Navigate to shop page filtered by this category name
    const categoryName = typeof category === 'object' ? category.slug || category.name : category;
    navigate(`/shop?category=${encodeURIComponent(categoryName)}`);
  };

  // Capitalize display label
  const displayName = typeof category === 'object' 
    ? category.name 
    : String(category).replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="category-card" onClick={handleCategoryClick}>
      <img src={image} alt={displayName} className="category-card-img" loading="lazy" />
      <div className="category-card-overlay">
        <h3 className="category-card-title">{displayName}</h3>
        <span className="category-card-subtitle">Explore Collection &rarr;</span>
      </div>
    </div>
  );
}