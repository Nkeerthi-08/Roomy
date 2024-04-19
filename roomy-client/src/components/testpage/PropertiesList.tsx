"use client";

import { useGetProductsQuery } from "@/store/services/productList-service";
import Link from "next/link";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import {
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select";
import { PopoverTrigger, PopoverContent, Popover } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { FilterIcon, SearchIcon } from "lucide-react";
import { useState } from "react";
import TomTomMap from "../shared/TomTomMap";

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
  const [date, setDate] = useState<Date | undefined>(new Date());

  // if (productLoading) return <div>Loading...</div>;
  if (productFetching) return <div>Loading...</div>;
  if (productError) return <div>Error</div>;

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="flex items-center justify-between h-16 px-4 md:px-6 border-b bg-white dark:bg-gray-950">
        <Link className="flex items-center gap-2" href="#">
          <MountainIcon className="h-6 w-6" />
          <span className="text-lg font-semibold">Acme Inc</span>
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="h-9 w-9">
              <AvatarImage alt="@shadcn" src="/placeholder-avatar.jpg" />
              <AvatarFallback>JP</AvatarFallback>
              <span className="sr-only">Toggle user menu</span>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>My Account</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <div className="flex flex-col md:flex-row">
        <TomTomMap></TomTomMap>
        <main className="flex-1 md:max-h-[100dvh] md:overflow-y-auto">
          <section className="bg-white dark:bg-gray-950 p-4 md:p-6">
            <div className="grid gap-4">
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <Input className="pl-8 w-full" placeholder="Search properties..." type="search" />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="px-4 py-2 rounded-md" variant="outline">
                      <FilterIcon className="w-4 h-4 mr-2" />
                      Filters
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-[300px] p-4 space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="price-min">Price (min)</Label>
                      <Input id="price-min" placeholder="$0" type="number" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="price-max">Price (max)</Label>
                      <Input id="price-max" placeholder="$1000" type="number" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="bedrooms">Bedrooms</Label>
                      <Select defaultValue="any">
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Any" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Any</SelectItem>
                          <SelectItem value="1">1+</SelectItem>
                          <SelectItem value="2">2+</SelectItem>
                          <SelectItem value="3">3+</SelectItem>
                          <SelectItem value="4">4+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="bathrooms">Bathrooms</Label>
                      <Select defaultValue="any">
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Any" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Any</SelectItem>
                          <SelectItem value="1">1+</SelectItem>
                          <SelectItem value="2">2+</SelectItem>
                          <SelectItem value="3">3+</SelectItem>
                          <SelectItem value="4">4+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="move-in-date">Move-in Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button className="w-full flex-col h-auto items-start" variant="outline">
                            <span className="font-semibold uppercase text-[0.65rem]">Move-in Date</span>
                            <span className="font-normal">Select a date</span>
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0 max-w-[276px]">
                          <Calendar selected={date} onSelect={setDate} id="move-in-date" />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline">Reset</Button>
                      <Button>Search</Button>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </section>
          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 md:p-6">
            {Card({
              title: "Beachfront Bungalow",
              description: "1 bedroom, 1 bath, sleeps 2",
              price: "$200 per night",
              imageSrc: "/nextimage.png",
            })}
            {Card({
              title: "Downtown Apartment",
              description: "2 bedrooms, 1 bath, sleeps 4",
              price: "$175 per night",
              imageSrc: "/nextimage.png",
            })}
            {Card({
              title: "Mountain Cabin",
              description: "3 bedrooms, 2 baths, sleeps 6",
              price: "$300 per night",
              imageSrc: "/nextimage.png",
            })}
            {Card({
              title: "Beachfront Bungalow",
              description: "1 bedroom, 1 bath, sleeps 2",
              price: "$200 per night",
              imageSrc: "/nextimage.png",
            })}
          </section>
        </main>
      </div>
    </div>
  );
}

function MountainIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}

interface CardProps {
  title: string;
  description: string;
  price: string;
  imageSrc: string;
}
function Card({ title, description, price, imageSrc }: CardProps) {
  return (
    <div className="relative group overflow-hidden rounded-lg shadow-lg">
      <Link className="absolute inset-0 z-10" href="#">
        <span className="sr-only">View property</span>
      </Link>
      <img
        alt={title}
        className="object-cover w-full h-60"
        height={300}
        src={imageSrc}
        style={{
          aspectRatio: "400/300",
          objectFit: "cover",
        }}
        width={400}
      />
      <div className="bg-white p-4 dark:bg-gray-950">
        <h3 className="font-semibold text-lg md:text-xl">{title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{price}</p>
      </div>
    </div>
  );
}
