import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  //   userName: '',
  cartItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: {
      prepare(id, name, unitPrice) {
        return {
          payload: {
            pizzaId: id,
            name,
            quantity: 1,
            unitPrice,
            totalPrice: unitPrice,
          },
        };
      },
      reducer(state, action) {
        state.cartItems.push(action.payload);
      },
    },
    deleteItem(state, action) {
      state.cartItems.filter((item) => item.pizzaId !== action.payload);
    },
    clearCart(state) {
      state.cartItems = [];
    },
  },
});

export const { addItem, deleteItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
