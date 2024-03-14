import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "./api/productsApi";
import { categoryApi } from "./api/categoryApi";
import { authApi } from "./api/authApi";
import userReducer from "./features/userSlice";
import { userApi } from "./api/userApi";
import cartReducer from "./features/cartSlice";
import { orderApi } from "./api/orderApi";
const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: userReducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productApi.middleware,
      categoryApi.middleware,
      authApi.middleware,
      userApi.middleware,
      orderApi.middleware
    ),
});

export default store;
