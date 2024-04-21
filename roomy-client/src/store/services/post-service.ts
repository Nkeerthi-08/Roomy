import { createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../baseApiSlice";
import { TomTomDetailsPopup } from "./address-service";

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
  utilities?: string[];
}
interface CompletePostDetails extends Post {
  _id: string;
  active: boolean;
  photos: Photo[];
}
interface Photo {
  url: string;
  _id: string;
}
const AUTH_TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MjFhZWNmYmQ2YWZjNTU4ZGQyNjM2YyIsImVtYWlsIjoidGVzdHVzZXJuZXdAZ21haWwuY29tIiwiaWF0IjoxNzEzNDgzNDk0LCJleHAiOjE3MTYwNzU0OTR9.EYvoWnGm0Tn7GzUcQ7AZduXm39huLgw1Xt18ShH14Ls";

export const postApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getPosts: build.query<CompletePostDetails[], any>({
      query: ({ bathCount }) => ({
        url: `/posts`,
        headers: {
          Authorization: AUTH_TOKEN,
        },
        params: { bathCount },
      }),
      transformResponse: (response: any) => {
        return response.map((post: any) => ({
          _id: post._id,
          title: post.title,
          phoneNumber: post.phoneNumber,
          streetAddress: post.streetAddress,
          unitNo: post.unitNo,
          city: post.city,
          stateCode: post.stateCode,
          zipCode: post.zipCode,
          latitude: post.latitude,
          longitude: post.longitude,
          startDateRange: new Date(post.startDateRange),
          price: post.price,
          bedCount: post.bedCount,
          bathCount: post.bathCount,
          active: post.active,
          photos: post.photos,
        })) as CompletePostDetails[];
      },
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
    getPostById: build.query<CompletePostDetails, string>({
      query: (id) => ({
        url: `/posts/${id}`,
        headers: {
          Authorization: AUTH_TOKEN,
        },
      }),
      transformResponse: (response: any) => {
        console.log(response, "response");
        return {
          _id: response._id,
          title: response.title,
          phoneNumber: response.phoneNumber,
          streetAddress: response.streetAddress,
          unitNo: response.unitNo,
          city: response.city,
          stateCode: response.stateCode,
          zipCode: response.zipCode,
          latitude: response.latitude,
          longitude: response.longitude,
          startDateRange: new Date(response.startDateRange),
          price: response.price,
          bedCount: response.bedCount,
          bathCount: response.bathCount,
          active: response.active,
          photos: response.photos,
          utilities: response.utilities,
        } as CompletePostDetails;
      },
    }),
  }),
});

export const { useCreatePostMutation, useGetPostsQuery, useGetPostByIdQuery } = postApi;

export const selectPostsResult = postApi.endpoints.getPosts.select({ bathCount: 0 });
export const selectTomTomData = createSelector(selectPostsResult, (postsResult) => {
  const { data, ...rest } = postsResult;
  const extractedData = data?.map((post) => ({
    key: post._id,
    title: post.title,
    description: `${post.bedCount || 0} bedrooms, ${post.bathCount || 0} baths`,
    price: post.price?.toString() || "0",
    imageSrc: post.photos[0]?.url || "/next.svg",
    latitute: post.latitude || 0,
    longitude: post.longitude || 0,
  })) as TomTomDetailsPopup[];
  return { ...rest, data: extractedData };
});
