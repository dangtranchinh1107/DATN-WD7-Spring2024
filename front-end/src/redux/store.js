import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/auth";
import { userApi } from "./api/userApi";
import userReducer from "./features/userSlice";
import cartReducer from "./features/cartSlice";
import { productApi } from "./api/productsApi";
import { orderApi } from "./api/orderApi";
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: userReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      userApi.middleware,
      productApi.middleware,
      orderApi.middleware,
    ]),
});
