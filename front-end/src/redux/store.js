import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/authApi";
import { userApi } from "./api/userApi";


export const store = configureStore({
    reducer: {


        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer,

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(

            authApi.middleware, userApi.middleware

        ),
},
)