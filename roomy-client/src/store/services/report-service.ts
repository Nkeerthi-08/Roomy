import { apiSlice } from "../baseApiSlice";

export interface CreateReportRequest {
  description: string;
  postId: string;
}
const AUTH_TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MDlmOWI1NTRkYzJlNTNhY2JlNWYyOCIsImVtYWlsIjoiaHV6YWlmYW1hbGlrNDdAZ21haWwuY29tIiwiaWF0IjoxNzEzNzYxMDk0LCJleHAiOjE3MTYzNTMwOTR9.jxfbFf4WN96asJRv-jpuileIePiWsSq47Y0UKlFgpGE";

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
