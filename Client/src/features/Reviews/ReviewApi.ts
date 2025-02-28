import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Review {
  review_id: number;
  property_type: string; // 'house', 'land', or 'vehicle'
  property_id: number;
  user_id: number;
  rating: number;
  comment?: string;
  created_at: string;
}

export const reviewApi = createApi({
  reducerPath: "reviewApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }), // Replace with your actual API URL
  tagTypes: ["Reviews"],
  endpoints: (builder) => ({
    getReviews: builder.query<Review[], void>({
      query: () => "/reviews",
        providesTags: ["Reviews"],
    }),
    deleteReview: builder.mutation<void, number>({
      query: (review_id) => ({
        url: `/reviews/${review_id}`,
        method: "DELETE",
        providesTags: ["Reviews"],
      }),
    }),
  }),
});

export const { useGetReviewsQuery, useDeleteReviewMutation } = reviewApi;
