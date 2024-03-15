import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/auth";
import { userApi } from "./api/userApi";
import userReducer from "./features/userSlice";
import { productApi } from "./api/productsApi";
export const store = configureStore({
  reducer: {
    auth: userReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      userApi.middleware,
      productApi.middleware,
    ]),
});
