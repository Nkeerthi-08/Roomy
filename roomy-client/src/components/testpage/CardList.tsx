import { Card } from "./Card";

export function CardList() {
  const propertiesList = [
    {
      title: "Beach House",
      description: "4 bedrooms, 3 baths, sleeps 8",
      price: "$500 per night",
      imageSrc: "/placeholder.svg",
    },
    {
      title: "Mountain Cabin",
      description: "2 bedrooms, 2 baths, sleeps 4",
      price: "$300 per night",
      imageSrc: "/placeholder.svg",
    },
    {
      title: "City Apartment",
      description: "1 bedroom, 1 bath, sleeps 2",
      price: "$150 per night",
      imageSrc: "/placeholder.svg",
    },
    {
      title: "Lake House",
      description: "3 bedrooms, 2 baths, sleeps 6",
      price: "$400 per night",
      imageSrc: "/placeholder.svg",
    },
  ];
  
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 md:p-6">
      {propertiesList.map((property) => (
        <Card key={property.title} {...property} />
      ))}
    </section>
  );
}
