import { apiSlice } from "../baseApiSlice";

const AUTH_TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MWIzMTVmM2NjZjE4MjAxMzNkYzM2ZSIsImVtYWlsIjoianV0dHVhbnVyYWdAZ21haWwuY29tIiwiaWF0IjoxNzEzNjk3OTIzLCJleHAiOjE3MTYyODk5MjN9.BktoPuuAmo6CocCb1Ip5YiPArxoQHpmMbFef5hGiacc";

interface SubscriptionStatus {
  active: boolean;
}

const striptApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    createCheckoutSession: build.mutation<any, void>({
      query: () => ({
        url: "payments/create-stripe-session-subscription",
        method: "POST",
        headers: {
          Authorization: AUTH_TOKEN,
        },
      }),
    }),
    getActiveSubscription: build.query<SubscriptionStatus, void>({
      query: () => ({
        url: "payments/get-active-subscription",
        headers: {
          Authorization: AUTH_TOKEN,
        },
      }),
      transformResponse: (response: any) => {
        const active: SubscriptionStatus = {
          active: response.success,
        };
        return active;
      },
    }),
  }),
});

export const {
  useCreateCheckoutSessionMutation,
  useGetActiveSubscriptionQuery,
  useLazyGetActiveSubscriptionQuery,
} = striptApi;
