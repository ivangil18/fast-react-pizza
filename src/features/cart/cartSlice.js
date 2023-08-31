import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  shoppingCart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addNewItem(state, action) {
      // payload = newItem
      console.log(action.payload.pizzaId);
      const item = state.shoppingCart.find(
        (item) => item.pizzaId === action.payload.pizzaId,
      );
      if (item === undefined) {
        state.shoppingCart.push(action.payload);
      } else {
        item.quantity++;
        item.totalPrice = item.quantity * item.unitPrice;
      }
    },
    deleteItem(state, action) {
      // payload = pizzaId
      state.shoppingCart = state.shoppingCart.filter(
        (item) => item.pizzaId !== action.payload,
      );
    },
    increaseItemQuantity(state, action) {
      const item = state.shoppingCart.find(
        (item) => item.pizzaId === action.payload,
      );
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseItemQuantity(state, action) {
      // payload: pizzaId
      const item = state.shoppingCart.find(
        (item) => item.pizzaId === action.payload,
      );
      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;

      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
    },
    clearCart(state, action) {
      state.shoppingCart = [];
    },
  },
});

export const {
  addNewItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

//React Selector Functions (to optimize these type of fuctions - check reselect library)

export const getCart = (state) => state.cart.shoppingCart;

export const getCartTotalCount = (state) =>
  state.cart.shoppingCart.reduce((total, item) => total + item.quantity, 0);

export const getCartTotalPrice = (state) =>
  state.cart.shoppingCart.reduce((total, item) => total + item.totalPrice, 0);

export const getPizzaQuantityById = (id) => (state) =>
  state.cart.shoppingCart.find((item) => item.pizzaId === id)?.quantity ?? 0;
