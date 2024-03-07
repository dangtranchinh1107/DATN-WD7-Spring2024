import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "./api/productsApi";
import { categoryApi } from "./api/categoryApi";

const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productApi.middleware,
      categoryApi.middleware
    ),
});

export default store;
