"use client";

import { Input } from "@/components/ui/input";
import { FilterIcon, SearchIcon } from "lucide-react";
import Link from "next/link";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import {
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select";
import { PopoverTrigger, PopoverContent, Popover } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

export default function FilterListings() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <>
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
    </>
  );
}
