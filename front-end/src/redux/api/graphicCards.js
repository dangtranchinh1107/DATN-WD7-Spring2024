import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const graphicCardApi = createApi({
  reducerPath: "graphicCardsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1",
  }),
  endpoints: (builder) => ({
    getGraphicCards: builder.query({
      query: (params) => ({
        url: "/graphicCards",
        params: {
          graphicCard: params?.graphicCard,
        },
      }),
    }),
  }),
});
export const { useGetGraphicCardsQuery } = graphicCardApi;
