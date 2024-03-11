import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
<<<<<<< HEAD
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/v1" }),

=======
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/v1",
  }),
>>>>>>> 69c59227f07d28bce4fff8316b8f86d7438ac64c
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (params) => "/products",
    }),
<<<<<<< HEAD
    getProductDetails: builder.query({
      query: (id) => `/products/${id}`,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductDetailsQuery } = productApi;
=======
    getProductsDetails: builder.query({
      query: (id) => `/product/${id}`,
    }),
  }),
});
export const { useGetProductsQuery, useGetProductsDetailsQuery } = productApi;
>>>>>>> 69c59227f07d28bce4fff8316b8f86d7438ac64c
