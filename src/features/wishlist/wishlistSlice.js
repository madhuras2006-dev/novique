import { createSlice } from '@reduxjs/toolkit';

// Helper to get initial wishlist from localStorage safely
const getInitialWishlist = () => {
  if (typeof window === 'undefined') return [];
  try {
    const item = window.localStorage.getItem('novique_wishlist');
    return item ? JSON.parse(item) : [];
  } catch (error) {
    console.error('Error reading wishlist from localStorage:', error);
    return [];
  }
};

// Helper to save wishlist to localStorage safely
const saveWishlistToStorage = (wishlistItems) => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem('novique_wishlist', JSON.stringify(wishlistItems));
  } catch (error) {
    console.error('Error saving wishlist to localStorage:', error);
  }
};

const initialItems = getInitialWishlist();

const initialState = {
  items: initialItems,
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    toggleWishlist: (state, action) => {
      const product = action.payload;
      const existingIndex = state.items.findIndex((item) => item.id === product.id);

      if (existingIndex >= 0) {
        // Remove if already in wishlist
        state.items.splice(existingIndex, 1);
      } else {
        // Add if not in wishlist
        state.items.push({
          id: product.id,
          title: product.title,
          price: product.price,
          thumbnail: product.thumbnail || (product.images && product.images[0]) || '',
          rating: product.rating,
          category: product.category,
        });
      }
      saveWishlistToStorage(state.items);
    },

    removeFromWishlist: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
      saveWishlistToStorage(state.items);
    },

    clearWishlist: (state) => {
      state.items = [];
      saveWishlistToStorage([]);
    },
  },
});

export const { toggleWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;