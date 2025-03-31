import { TCard } from "@/components/Card/types";

export interface ICardsListProps {
  cards: TCard[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
}
