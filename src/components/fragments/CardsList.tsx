import { Movie } from "types/MovieTypes";
import Card from "../elements/Card/Card";
import CardSkeleton from "components/elements/Card/CardSkeleton";

interface CardListProps {
  variant: "lg" | "md";
  list?: Movie[];
  isLoading: boolean;
}

export default function CardsList({ variant, list, isLoading }: CardListProps) {
  const getGridClasses = () => {
    switch (variant) {
      case "lg":
        return "md:grid-cols-3 xl:grid-cols-6";
      case "md":
        return "md:grid-cols-2 xl:grid-cols-3";
    }
  };
  return (
    <div
      className={`mt-4 grid grid-cols-2 gap-1 sm:grid-cols-2 md:gap-4 ${getGridClasses()}`}
    >
      {isLoading ? (
        Array.from({ length: 6 }).map((_, i) => (
          <div key={i}>
            <CardSkeleton />
          </div>
        ))
      ) : list && list.length > 0 ? (
        list.map((movie: Movie, i) => (
          <div key={i}>
            <Card movie={movie} />{" "}
          </div>
        ))
      ) : (
        <div>Tidak ada film yang tersedia</div>
      )}
    </div>
  );
}
