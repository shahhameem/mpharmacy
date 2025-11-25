// src/redux/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Helper to get data from local storage
const loadCartFromStorage = () => {
  const savedCart = localStorage.getItem('madinaCart');
  return savedCart ? JSON.parse(savedCart) : [];
};

const initialState = {
  items: loadCartFromStorage(),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        // Redux Toolkit allows us to write "mutating" logic like this
        // because it uses Immer library under the hood.
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
      // Save to local storage
      localStorage.setItem('madinaCart', JSON.stringify(state.items));
    },

    removeFromCart: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
      localStorage.setItem('madinaCart', JSON.stringify(state.items));
    },

    clearCart: (state) => {
      state.items = [];
      localStorage.setItem('madinaCart', JSON.stringify(state.items));
    },
  },
});

// Export actions to use in components
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

// Export selectors (helper to get specific data)
export const selectCartItems = (state) => state.cart.items;
export const selectCartTotal = (state) => 
  state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

export default cartSlice.reducer;