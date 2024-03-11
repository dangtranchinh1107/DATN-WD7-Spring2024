import { configureStore } from "@reduxjs/toolkit";
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
    getDefaultMiddleware().concat([productApi.middleware, orderApi.middleware]),
});
