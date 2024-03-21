import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ramApi = createApi({
  reducerPath: "ramsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1",
  }),
  endpoints: (builder) => ({
    getRams: builder.query({
      query: (params) => ({
        url: "/rams",
        params: {
          ram: params?.ram,
        },
      }),
    }),
  }),
});
export const { useGetRamsQuery } = ramApi;
