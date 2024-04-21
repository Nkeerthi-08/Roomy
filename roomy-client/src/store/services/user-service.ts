import { apiSlice } from "../baseApiSlice";

export interface User {
  _id: string;
  email: string;
  name: string;
  phone: string;
}
export interface UpdateUserReq {
  name: string;
  phone: string;
}

const AUTH_TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MjFhZWNmYmQ2YWZjNTU4ZGQyNjM2YyIsImVtYWlsIjoidGVzdHVzZXJuZXdAZ21haWwuY29tIiwiaWF0IjoxNzEzNDgzNDk0LCJleHAiOjE3MTYwNzU0OTR9.EYvoWnGm0Tn7GzUcQ7AZduXm39huLgw1Xt18ShH14Ls";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getUser: build.query<User, void>({
      query: () => ({
        url: "/users/context",
        headers: {
          Authorization: AUTH_TOKEN,
        },
      }),
      transformResponse: (response: User) => {
        const resTrans: User = {
          _id: response._id,
          email: response.email,
          name: response.name,
          phone: response.phone,
        };
        return resTrans;
      },
    }),
    updateUser: build.mutation<any, UpdateUserReq>({
      query: (body) => ({
        url: "/users/update",
        method: "PUT",
        body,
        headers: {
          Authorization: AUTH_TOKEN,
        },
      }),
    }),
  }),
});

export const { useGetUserQuery, useUpdateUserMutation } = userApi;
