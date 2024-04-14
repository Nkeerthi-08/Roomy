import { apiSlice } from "../baseApiSlice";

export interface Product {
  _id: number;
  title: string;
  description: string;
  user: string;
}

export const productListApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query<Product[], void>({
      query: () => ({
        url: "/posts/all-posts",
      }),
      providesTags: (result) =>
        result
          ? [...result.map(({ _id }) => ({ type: "Product" as const, _id })), { type: "Product", _id: "LIST" }]
          : [{ type: "Product", _id: "LIST" }],
    }),
  }),
});

export const { useGetProductsQuery } = productListApi;
