import { configureStore } from "@reduxjs/toolkit";
<<<<<<< HEAD
import { productApi } from "./api/productsApi";
import cartReducer from "./features/cartSlice";
import { orderApi } from "./api/orderApi";
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [productApi.reducerPath]: productApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      productApi.middleware,
      orderApi.middleware,
    ]),
});
=======

import { productApi } from "./api/productsApi";

const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware),
});

export default store;
>>>>>>> 69c59227f07d28bce4fff8316b8f86d7438ac64c
