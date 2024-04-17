"use client";

import { useGetProductsQuery } from "@/store/services/product-list";
import Link from "next/link";

export default function PropertiesList() {
  const {
    data: productData,
    isLoading: productLoading,
    isError: productError,
    isFetching: productFetching,
  } = useGetProductsQuery(undefined, {
    skip: false,
    refetchOnMountOrArgChange: true,
  });

  // if (productLoading) return <div>Loading...</div>;
  if (productFetching) return <div>Loading...</div>;
  if (productError) return <div>Error</div>;

  return (
    <div>
      <h1>Products</h1>
      <div>
        {productData?.map((product) => (
          <div key={product._id}>
            <p>{product.user}</p>
          </div>
        ))}
      </div>
      <Link href={"/login"}>Login Button</Link>
    </div>
  );
}
