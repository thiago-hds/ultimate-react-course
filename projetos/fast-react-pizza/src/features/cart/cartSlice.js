import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseItemQuantity(state, action) {
      const pizza = state.cart.find((item) => item.pizzaId === action.payload);

      pizza.quantity--;
      pizza.totalPrice = pizza.quantity * pizza.unitPrice;

      if (pizza.quantity === 0) {
        cartSlice.caseReducers.deleteItem(state, action);
      }
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const getCart = (state) => state.cart.cart;

export const getTotalCartQuantity = (state) => {
  return state.cart.cart.reduce((sum, item) => item.quantity + sum, 0);
};

export const getTotalCartPrice = (state) => {
  return state.cart.cart.reduce((sum, item) => item.totalPrice + sum, 0);
};

export const getCurrentQuantityById = (id) => {
  return (state) =>
    state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;
};
