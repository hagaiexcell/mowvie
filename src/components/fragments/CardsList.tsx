import Card from "../elements/Card";

interface CardListProps {
  variant: "lg" | "md";
}

export default function CardsList({ variant }: CardListProps) {
  const getGridClasses = () => {
    switch (variant) {
      case "lg":
        return "md:grid-cols-3 xl:grid-cols-6";
      case "md":
        return "md:grid-cols-2 xl:grid-cols-3";
    }
  };
  return (
    <div className={`mt-4 grid grid-cols-2 sm:grid-cols-2 gap-1 md:gap-4 ${getGridClasses()}`}>
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </div>
  );
}
