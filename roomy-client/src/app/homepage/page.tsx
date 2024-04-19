import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardContent, Card } from "@/components/ui/card";
import Link from "next/link";

export default function Component() {
  return (
    <div className="relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-28">
        <div className="grid grid-cols-2 gap-8">
          <div className="text-center py-16 md:py-24">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">Rooms for Rent</h1>
            <p className="mt-4 text-xl text-gray-500">Find and rent your perfect room</p>
            <div className="mt-8 flex justify-center">
              <div className="w-full max-w-md">
                <Select>
                  <SelectTrigger
                    aria-label="Search for an address, neighborhood, city or ZIP code"
                    className="w-full relative"
                    id="address"
                  >
                    <SelectValue placeholder="Enter an address, neighborhood, city or ZIP code" />
                    <ChevronDownIcon className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="address1">123 Fake St, Springfield</SelectItem>
                    <SelectItem value="address2">456 Elm St, Shelbyville</SelectItem>
                    <SelectItem value="address3">789 Oak St, Capital City</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <img
            src="https://cdn-assets.roomster.com/dist/65a6ebfefa0cf4b3afe8346a5d4d8fac.svg"
            alt="Placeholder"
            className="w-full h-auto"
            style={{ maxWidth: "100%", height: "auto", maxHeight: "350px" }}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-8 px-4 sm:px-6 lg:px-8 pb-16 md:pb-24 mt-40">
        <Card>
          <CardContent
            style={{
              backgroundImage: `url('https://cdn-assets.roomster.com/dist/c83dfbcd25508573fb5efac548702beb.png')`,
              backgroundRepeat: "no-repeat center 49% / 100% !important",
              height: "300px",
              width: "550px",
              borderTopLeftRadius: "0px",
              borderTopRightRadius: "100px",
              borderBottomRightRadius: "0px",
              borderBottomLeftRadius: "100px",
              backgroundPositionX: "center",
              backgroundPositionY: "100%",
              backgroundSize: "102%",
              backgroundAttachment: "initial",
              backgroundOrigin: "initial",
              backgroundClip: "initial",
              backgroundColor: "rgb(211, 211, 211)",
            }}
            className="flex flex-col items-center justify-center bg-white p-6 rounded-md"
          >
            <div className="flex items-center justify-center space-x-4">
              <Badge
                className="h-16 w-16 rounded-full bg-[#f3f4f6] flex items-center justify-center"
                variant="secondary"
              >
                <HomeIcon className="h-8 w-8 text-gray-500" />
              </Badge>
              <h2 className="text-lg font-semibold">List a place</h2>
            </div>
            <Link href="/add-listing">
              <Button className="mt-4 text-lg font-semibold border rounded-lg">List a place</Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardContent
            style={{
              backgroundImage: `url('https://cdn-assets.roomster.com/dist/3bc37a2da21ca15523d031141ed4535b.png')`,
              backgroundRepeat: "no-repeat center 49% / 100% !important",
              height: "300px",
              width: "550px",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "0px",
              borderBottomRightRadius: "100px",
              borderBottomLeftRadius: "0px",
              backgroundPositionX: "center",
              backgroundPositionY: "49%",
              backgroundSize: "100%",
              backgroundAttachment: "initial",
              backgroundOrigin: "initial",
              backgroundClip: "initial",
              backgroundColor: "rgb(211, 211, 211)",
            }}
            className="flex flex-col items-center justify-center bg-white p-6 rounded-md"
          >
            <div className="flex items-center justify-center space-x-4">
              <Badge
                className="h-16 w-16 rounded-full bg-[#f3f4f6] flex items-center justify-center"
                variant="secondary"
              >
                <SearchIcon className="h-8 w-8 text-gray-500" />
              </Badge>
              <h2 className="text-lg font-semibold">Find a place</h2>
            </div>
            <Link href="/all-listings">
              <Button className="mt-4 text-lg font-semibold border rounded-lg">Find a place</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ChevronDownIcon(props: any) {
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
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function HomeIcon(props: any) {
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
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
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
