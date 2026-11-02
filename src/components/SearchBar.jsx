import React from 'react';
import { Search } from 'lucide-react';
import '../styles/components.css';

export function SearchBar({ searchQuery, setSearchQuery, placeholder = "Search products..." }) {
  return (
    <div className="search-bar-wrapper">
      <Search size={18} className="search-icon-inside" />
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder={placeholder}
        className="search-input"
      />
    </div>
  );
}