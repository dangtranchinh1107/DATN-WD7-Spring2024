import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "./api/productsApi";
import cartReducer from "./features/cartSlice";
import { orderApi } from "./api/orderApi";
import { authApi } from "./api/authApi";
import { userApi } from "./api/userApi";
import userReducer from "./features/userSlice"
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: userReducer,
    [productApi.reducerPath]: productApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([productApi.middleware, orderApi.middleware, authApi.middleware,userApi.middleware]),
});
