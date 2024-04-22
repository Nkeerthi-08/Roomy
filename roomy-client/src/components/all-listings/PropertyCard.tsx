"use client"

import Link from "next/link";

interface CardProps {
  key: string;
  propertyId: string;
  title: string;
  description: string;
  price: string;
  imageSrc: string;
  isTag?: string;
  isApproved?: boolean;
}

export function PropertyCard({ propertyId, title, description, price, imageSrc, isTag, isApproved }: CardProps) {
  return (
    <>
      <div className="relative group overflow-hidden rounded-lg shadow-lg">
        <Link className="absolute inset-0 z-10" href={`/all-listings/${propertyId}`}>
          <span className="sr-only">View property</span>
        </Link>
        <img
          alt="Property 2"
          className="object-cover w-full h-60"
          height={300}
          src={imageSrc}
          style={{
            aspectRatio: "400/300",
            objectFit: "cover",
          }}
          width={400}
        />

        <div className="bg-white p-4 dark:bg-gray-950 relative flex items-center">
          <div>
            <h3 className="font-semibold text-lg md:text-xl">{title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{price}</p>
          </div>
          {isTag == "true" && (
            <span
              className={`${
                isApproved ? "bg-green-500" : "bg-red-500"
              } text-white text-xs font-semibold px-2 py-1 rounded-full ml-auto`}
            >
              {isApproved ? "Approved" : "Pending"}
            </span>
          )}
        </div>
      </div>
    </>
  );
}
