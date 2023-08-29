import { configureStore } from '@reduxjs/toolkit';

import userReducer from './features/user/userSlice';
import cartReducer from './features/cart/cartSlice';
import orderReducer from './features/order/orderSlice';
import menuReducer from './features/menu/menuSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    menu: menuReducer,
    cart: cartReducer,
    order: orderReducer,
  },
});

export default store;
