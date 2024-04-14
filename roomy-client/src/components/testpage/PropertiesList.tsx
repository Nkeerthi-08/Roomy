"use client";
import { useGetProductsQuery } from "@/store/services/product-list";
import { useEffect } from "react";

export default function PropertiesList() {
  const {
    data: productData,
    isLoading: productLoading,
    isError: productError,
    refetch,
  } = useGetProductsQuery(undefined, {
    skip: false,
    refetchOnReconnect: true,
    refetchOnFocus: true,
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div>
      {productLoading ? (
        <div>Loading...</div>
      ) : productError ? (
        <div>Error: {productError.toString()}</div>
      ) : (
        <div>
          {productData?.map((product) => (
            <div key={product._id}>
              <p>{product.user}</p>
            </div>
          ))}
        </div>
      )}
      <button onClick={() => (window.location.href = "/login")}>Open New Page</button>
    </div>
  );
}
