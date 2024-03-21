import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const colorsApi = createApi({
  reducerPath: "colorsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1",
  }),
  endpoints: (builder) => ({
    getColors: builder.query({
      query: (params) => ({
        url: "/colors",
        params: {
          color: params?.color,
        },
      }),
    }),
  }),
});
export const { useGetColorsQuery } = colorsApi;
