import { apiSlice } from "../baseApiSlice";

export interface Post {
  title: string;
  phoneNumber: string;
  streetAddress: string;
  unitNo: string;
  city: string;
  stateCode: string;
  zipCode: string;
  latitude: number;
  longitude: number;
  startDateRange: Date;
  price: number;
  bedCount: number;
  bathCount: number;
}

const AUTH_TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MjFhZWNmYmQ2YWZjNTU4ZGQyNjM2YyIsImVtYWlsIjoidGVzdHVzZXJuZXdAZ21haWwuY29tIiwiaWF0IjoxNzEzNDgzNDk0LCJleHAiOjE3MTYwNzU0OTR9.EYvoWnGm0Tn7GzUcQ7AZduXm39huLgw1Xt18ShH14Ls";

export const postApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getPosts: build.query<any, Post>({
      query: () => ({
        url: "/posts/all-posts",
      }),
    }),
    createPost: build.mutation<any, FormData>({
      query: (body) => ({
        url: "/posts/create",
        method: "POST",
        body,
        headers: {
          Authorization: AUTH_TOKEN,
        },
        formdata: true,
      }),
    }),
  }),
});

export const { useCreatePostMutation, useGetPostsQuery } = postApi;
