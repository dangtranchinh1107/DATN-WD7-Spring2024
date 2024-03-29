import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setIsAuthenticated, setUser } from "../features/userSlice";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1" }),
  tagTypes: ["User", "AdminUsers", "AdminUser"],
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => `/me`,
      transformResponse: (result) => result.user,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
          dispatch(setIsAuthenticated(true));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    getAdminUsers: builder.query({
      query: () => `/admin/users`,
      providesTags: ["AdminUsers"],
    }),
    getUserDetails: builder.query({
      query: (id) => `/admin/users/${id}`,
      providesTags: ["AdminUser"],
    }),
    updateUser: builder.mutation({
      query({ id, body }) {
        return {
          url: `/admin/users/${id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["AdminUsers"],
    }),
    updateStatusUser: builder.mutation({
      query({ id, body }) {
        return {
          url: `/admin/users/status/${id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["AdminUsers"],
    }),
    deleteUser: builder.mutation({
      query(id) {
        return {
          url: `/admin/users/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["AdminUsers"],
    }),
  }),
});

export const {
  useGetMeQuery,
  useGetAdminUsersQuery,
  useGetUserDetailsQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useUpdateStatusUserMutation,
} = userApi;
