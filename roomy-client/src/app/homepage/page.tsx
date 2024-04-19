import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

import {
  CarouselItem,
  CarouselContent,
  Carousel,
} from "@/components/ui/carousel";

import { Card } from "@/components/ui/card";

export default function Component() {
  return (
    <div
      className="bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "\"url('/placeholder.svg')\"",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-8 pb-16">
          <div className="flex items-center max-w-lg mx-auto">
            <Input
              className="flex-1"
              placeholder="Enter an address, neighborhood, city, or ZIP code"
              type="text"
            />

            <Button className="ml-2" variant="default">
              <SearchIcon className="h-6 w-6" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-16">
          <Card className="flex flex-col items-center text-center space-y-4 p-4">
            <Carousel className="w-full max-w-md">
              <CarouselContent>
                <CarouselItem>
                  <img
                    alt="Rent a home"
                    className="object-cover h-36 w-full"
                    height="150"
                    src="/placeholder.svg"
                    style={{
                      aspectRatio: "300/150",

                      objectFit: "cover",
                    }}
                    width="300"
                  />
                </CarouselItem>

                <CarouselItem>
                  <img
                    alt="Rent a home"
                    className="object-cover h-36 w-full"
                    height="150"
                    src="/placeholder.svg"
                    style={{
                      aspectRatio: "300/150",

                      objectFit: "cover",
                    }}
                    width="300"
                  />
                </CarouselItem>

                <CarouselItem>
                  <img
                    alt="Rent a home"
                    className="object-cover h-36 w-full"
                    height="150"
                    src="/placeholder.svg"
                    style={{
                      aspectRatio: "300/150",

                      objectFit: "cover",
                    }}
                    width="300"
                  />
                </CarouselItem>
              </CarouselContent>
            </Carousel>

            <div>
              <h3 className="text-xl font-semibold">Rent a home</h3>

              <p className="text-sm text-gray-600">
                We’re creating a seamless online experience – from shopping on
                the largest rental network, to applying, to paying rent.
              </p>
            </div>

            <Button variant="secondary">Find rentals</Button>
          </Card>

          <Card className="flex flex-col items-center text-center space-y-4 p-4">
            <Carousel className="w-full max-w-md">
              <CarouselContent>
                <CarouselItem>
                  <img
                    alt="Browse homes"
                    className="object-cover h-36 w-full"
                    height="150"
                    src="/placeholder.svg"
                    style={{
                      aspectRatio: "300/150",

                      objectFit: "cover",
                    }}
                    width="300"
                  />
                </CarouselItem>

                <CarouselItem>
                  <img
                    alt="Browse homes"
                    className="object-cover h-36 w-full"
                    height="150"
                    src="/placeholder.svg"
                    style={{
                      aspectRatio: "300/150",

                      objectFit: "cover",
                    }}
                    width="300"
                  />
                </CarouselItem>

                <CarouselItem>
                  <img
                    alt="Browse homes"
                    className="object-cover h-36 w-full"
                    height="150"
                    src="/placeholder.svg"
                    style={{
                      aspectRatio: "300/150",

                      objectFit: "cover",
                    }}
                    width="300"
                  />
                </CarouselItem>
              </CarouselContent>
            </Carousel>

            <div>
              <h3 className="text-xl font-semibold">Browse homes</h3>

              <p className="text-sm text-gray-600">
                Find your place with an immersive photo experience and the most
                listings, including things you won’t find anywhere else.
              </p>
            </div>

            <Button variant="secondary">Browse homes</Button>
          </Card>

          <Card className="flex flex-col items-center text-center space-y-4 p-4">
            <Carousel className="w-full max-w-md">
              <CarouselContent>
                <CarouselItem>
                  <img
                    alt="Sell a home"
                    className="object-cover h-36 w-full"
                    height="150"
                    src="/placeholder.svg"
                    style={{
                      aspectRatio: "300/150",

                      objectFit: "cover",
                    }}
                    width="300"
                  />
                </CarouselItem>

                <CarouselItem>
                  <img
                    alt="Sell a home"
                    className="object-cover h-36 w-full"
                    height="150"
                    src="/placeholder.svg"
                    style={{
                      aspectRatio: "300/150",

                      objectFit: "cover",
                    }}
                    width="300"
                  />
                </CarouselItem>

                <CarouselItem>
                  <img
                    alt="Sell a home"
                    className="object-cover h-36 w-full"
                    height="150"
                    src="/placeholder.svg"
                    style={{
                      aspectRatio: "300/150",

                      objectFit: "cover",
                    }}
                    width="300"
                  />
                </CarouselItem>
              </CarouselContent>
            </Carousel>

            <div>
              <h3 className="text-xl font-semibold">Sell a home</h3>

              <p className="text-sm text-gray-600">
                No matter what path you take to sell your home, we can help you
                navigate a successful sale.
              </p>
            </div>

            <Button variant="secondary">See your options</Button>
          </Card>
        </div>
      </div>
    </div>
  );
}

function SearchIcon(props: any) {
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
      <circle cx="11" cy="11" r="8" />

      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
