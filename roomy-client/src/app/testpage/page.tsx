import { PropertyCardList } from "@/components/all-listings/PropertyCardList";

export default function Component() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">{PropertyCardList()}</main>
    </div>
  );
}
