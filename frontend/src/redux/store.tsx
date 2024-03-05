import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "./api/productsApi";
import cartReducer from "./features/cartSlice";
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([productApi.middleware]),
});
