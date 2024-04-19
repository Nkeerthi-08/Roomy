import { CardList } from "@/components/testpage/CardList";

export default function Component() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">{CardList()}</main>
    </div>
  );
}
