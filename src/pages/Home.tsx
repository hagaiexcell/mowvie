import CardsListLayout from "../components/layouts/CardsListLayout";

export default function Home() {
  return (
    <>
      <CardsListLayout variant={"lg"} title="Now Playing Movie" />
      <CardsListLayout variant={"lg"} title="Popular Movie" />
    </>
  );
}
