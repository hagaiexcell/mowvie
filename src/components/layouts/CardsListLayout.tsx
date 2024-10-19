import { Movie } from "types/MovieTypes";
import CardsList from "../fragments/CardsList";
import ErrorLayout from "./ErrorLayout";

interface CardsListLayoutProps {
  title: string;
  variant: "lg" | "md";
  list?: Movie[];
  isLoading: boolean;
  isError: boolean;
}

export default function CardsListLayout({
  title,
  variant,
  list,
  isLoading,
  isError,
}: CardsListLayoutProps) {

  return (
    <section className="container">
      <h2>{title}</h2>
      {isError ? (
        <ErrorLayout />
      ) : (
        <CardsList list={list} isLoading={isLoading} variant={variant} />
      )}
    </section>
  );
}
