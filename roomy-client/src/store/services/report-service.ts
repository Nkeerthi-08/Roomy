import { apiSlice } from "../baseApiSlice";

export interface CreateReportRequest {
  description: string;
  postId: string;
}
const AUTH_TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MjFhZWNmYmQ2YWZjNTU4ZGQyNjM2YyIsImVtYWlsIjoidGVzdHVzZXJuZXdAZ21haWwuY29tIiwiaWF0IjoxNzEzNDgzNDk0LCJleHAiOjE3MTYwNzU0OTR9.EYvoWnGm0Tn7GzUcQ7AZduXm39huLgw1Xt18ShH14Ls";

export const reportApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    createReport: build.mutation<any, CreateReportRequest>({
      query: (body) => ({
        url: "/reports/create",
        method: "POST",
        body,
        headers: {
          Authorization: AUTH_TOKEN,
        },
      }),
    }),
  }),
});

export const { useCreateReportMutation } = reportApi;
