import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const hardDiskApi = createApi({
  reducerPath: "hardDisksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1",
  }),
  endpoints: (builder) => ({
    gethardDisks: builder.query({
      query: (params) => ({
        url: "/hardDisks",
        params: {
          hardDisk: params?.hardDisk,
        },
      }),
    }),
  }),
});
export const { useGethardDisksQuery } = hardDiskApi;
