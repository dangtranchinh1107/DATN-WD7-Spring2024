import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { userApi } from "./userApi";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/v1",
    prepareHeaders: (headers) => {
      // Thêm token vào header nếu có

      headers.set(
        "Cookie",
        "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZTc4ZjA1ZDBkOWI5NzliNzE0Nzg5NSIsImlhdCI6MTcwOTc0MDgzNywiZXhwIjoxNzEwMzQ1NjM3fQ.sdL1lXeiIY1Zoi5PZ5i3ntn1wONt8JXmHGcGbqvGETQ"
      );

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => `/profile`,
    }),
  }),
});

export const { useGetMeQuery } = userApi;
