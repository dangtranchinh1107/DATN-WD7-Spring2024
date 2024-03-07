<<<<<<< HEAD
import { configureStore } from '@reduxjs/toolkit'
import { productApi } from "./api/productsApi"
import { authApi } from './api/authApi'
import { userApi } from './api/userApi'

export const store = configureStore({
    reducer: {

        [productApi.reducerPath]: productApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            productApi.middleware,
            authApi.middleware,
            userApi.middleware
        ),
},
)
=======
import { configureStore } from "@reduxjs/toolkit";

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
