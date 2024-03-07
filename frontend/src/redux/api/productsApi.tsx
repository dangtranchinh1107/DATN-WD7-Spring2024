import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
<<<<<<< HEAD
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000/api/v1",
    }),
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: (params) => "/products",
        }),
        getProductDetails: builder.query({
            query: (id) => `/product/${id}`,
        }),
    }),
});
export const { useGetProductsQuery, useGetProductDetailsQuery } = productApi
=======
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/v1",
  }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (params) => "/products",
    }),
    getProductsDetails: builder.query({
      query: (id) => `/product/${id}`,
    }),
  }),
});
export const { useGetProductsQuery, useGetProductsDetailsQuery } = productApi;
>>>>>>> 69c59227f07d28bce4fff8316b8f86d7438ac64c
