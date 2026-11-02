import { createSlice } from '@reduxjs/toolkit';

// Helper to get initial cart from localStorage safely
const getInitialCart = () => {
  if (typeof window === 'undefined') return [];
  try {
    const item = window.localStorage.getItem('novique_cart');
    return item ? JSON.parse(item) : [];
  } catch (error) {
    console.error('Error reading cart from localStorage:', error);
    return [];
  }
};

// Helper to save cart to localStorage safely
const saveCartToStorage = (cartItems) => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem('novique_cart', JSON.stringify(cartItems));
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
};

const initialItems = getInitialCart();

const initialState = {
  items: initialItems,
  totalQuantity: initialItems.reduce((total, item) => total + item.quantity, 0),
  totalAmount: initialItems.reduce((total, item) => total + item.price * item.quantity, 0),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const quantityToAdd = newItem.quantity || 1;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          title: newItem.title,
          price: newItem.price,
          thumbnail: newItem.thumbnail || (newItem.images && newItem.images[0]) || '',
          quantity: quantityToAdd,
        });
      } else {
        existingItem.quantity += quantityToAdd;
      }

      state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
      state.totalAmount = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
      saveCartToStorage(state.items);
    },

    removeFromCart: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);

      state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
      state.totalAmount = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
      saveCartToStorage(state.items);
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        if (quantity > 0) {
          existingItem.quantity = quantity;
        } else {
          state.items = state.items.filter((item) => item.id !== id);
        }
      }

      state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
      state.totalAmount = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
      saveCartToStorage(state.items);
    },

    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
      saveCartToStorage([]);
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;