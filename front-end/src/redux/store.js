import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./api/userApi";
import { authApi } from "./api/authApi";
import userReducer from "./features/userSlice";

export const store = configureStore({
    reducer: {

        auth: userReducer,
        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer,

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(

            authApi.middleware, userApi.middleware

        ),
},
)
