import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cpuApi = createApi({
  reducerPath: "cpusApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1",
  }),
  endpoints: (builder) => ({
    getCpu: builder.query({
      query: (params) => ({
        url: "/cpus",
        params: {
          cpu: params?.cpu,
        },
      }),
    }),
  }),
});
export const { useGetCpuQuery } = cpuApi;
