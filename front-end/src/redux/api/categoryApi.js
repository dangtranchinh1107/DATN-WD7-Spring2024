import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1",
  }),
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: (params) => ({
        url: "/categories",
        params: {
          category: params?.category,
        },
      }),
    }),
  }),
});
export const { useGetCategoriesQuery } = categoryApi;
