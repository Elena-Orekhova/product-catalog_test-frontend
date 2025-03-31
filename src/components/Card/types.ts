export type TCard = {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  quantity: number;
};

export interface ICardProps {
  card: TCard;
  onUpdateQuantity: (cardId: string, quantity: number) => void;
  onAddToCart: (card: TCard) => void;
}
