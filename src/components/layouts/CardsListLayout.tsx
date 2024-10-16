import CardsList from "../fragments/CardsList";

interface CardsListLayoutProps {
  title: string;
  variant: "lg" | "md";
}

export default function CardsListLayout({
  title,
  variant,
}: CardsListLayoutProps) {
  return (
    <section className="container">
      <h2>{title}</h2>
      <CardsList variant={variant} />
    </section>
  );
}
