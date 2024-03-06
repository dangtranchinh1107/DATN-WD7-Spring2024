import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
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
