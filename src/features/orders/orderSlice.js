import { createSlice } from '@reduxjs/toolkit';

// Load initial orders from localStorage
const loadOrdersFromStorage = () => {
  try {
    const saved = localStorage.getItem('novique_orders');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const initialState = {
  orders: loadOrdersFromStorage(),
  currentOrder: null,
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    createOrder: (state, action) => {
      const newOrder = {
        id: `NOV-${Math.floor(100000 + Math.random() * 900000)}`,
        date: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }),
        estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
        }),
        status: 'Processing', // 'Placed' | 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered'
        statusStep: 2, // 1 to 5
        ...action.payload,
      };

      state.orders.unshift(newOrder);
      state.currentOrder = newOrder;
      localStorage.setItem('novique_orders', JSON.stringify(state.orders));
    },
    setCurrentOrder: (state, action) => {
      state.currentOrder = state.orders.find((o) => o.id === action.payload) || null;
    },
  },
});

export const { createOrder, setCurrentOrder } = orderSlice.actions;
export default orderSlice.reducer;