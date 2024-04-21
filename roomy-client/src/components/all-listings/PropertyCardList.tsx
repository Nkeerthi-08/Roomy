"use client";
import { selectTomTomData, useGetPostsQuery } from "@/store/services/post-service";
import { use, useEffect } from "react";
import { useSelector } from "react-redux";
import { get } from "http";
import { PropertyCard } from "./PropertyCard";
import Link from "next/link";

const PropertyCardSkeleton = () => (
  <div className="animate-pulse bg-gray-200 rounded-xl p-4">
    <div className="h-32 bg-gray-300 mb-4"></div>
    <div className="h-6 bg-gray-300 mb-2"></div>
    <div className="h-6 bg-gray-300 w-3/4"></div>
  </div>
);
const ErrorComponent = ({ message }: { message: string }) => <div className="text-red-500">{message}</div>;

export function PropertyCardList() {
  const bathCount = 3;
  const {
    data: posts,
    isLoading: postsLoading,
    isFetching: postsFetching,
    error: postsError,
  } = useGetPostsQuery(
    { bathCount: bathCount },
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const addressData = useSelector(selectTomTomData);
  useEffect(() => {
    console.log(addressData, "addressData");
    console.log(posts, "posts from property card list");
  }, [postsLoading]);

  if (postsLoading && !posts) {
    return (
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 md:p-6">
        {[...Array(6)].map((_, index) => (
          <PropertyCardSkeleton key={index} />
        ))}
      </section>
    );
  }

  if (postsError) {
    return <ErrorComponent message="Error fetching data. Please try again later." />;
  }

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 md:p-6">
      {posts?.map((property) => (
        <PropertyCard
          key={property._id}
          propertyId={property._id}
          title={property.title}
          description={`${property.bedCount || 0} bedrooms, ${property.bathCount || 0} baths`}
          price={`$${property.price || 0} per month`}
          imageSrc={property.photos[0]?.url || "/next.svg"}
        />
      ))}
    </section>
  );
}
