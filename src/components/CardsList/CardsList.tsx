import { Grid2 } from "@mui/material";
import { Card } from "@/components/Card/Card";
import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@app/store";
import { ICardsListProps } from "./types";
import {
  addToCart,
  updateQuantity,
  selectCardInCart,
} from "@/features/cart/cartSlice";
import { TCard } from "@/components/Card/types";

const CardWrapper = ({
  card,
  onUpdateQuantity,
}: {
  card: TCard;
  onUpdateQuantity: ICardsListProps["onUpdateQuantity"];
}) => {
  const dispatch = useAppDispatch();
  const { cardInCart } = useAppSelector(selectCardInCart(card.id));

  const handleAddToCart = useCallback(() => {
    if (cardInCart.id) {
      dispatch(
        updateQuantity({ id: card.id, quantity: cardInCart.quantity + 1 })
      );
    } else {
      dispatch(
        addToCart({
          id: card.id,
          name: card.title,
          price: card.price,
          quantity: 1,
          availableQuantity: card.quantity,
        })
      );
    }
  }, [card, cardInCart, dispatch]);

  return (
    <Card
      key={card.id}
      card={card}
      onUpdateQuantity={onUpdateQuantity}
      onAddToCart={handleAddToCart}
    />
  );
};

export const CardsList = ({ cards, onUpdateQuantity }: ICardsListProps) => {
  return (
    <Grid2 container spacing={4} justifyContent="center" marginBottom={5}>
      {cards.map((card: TCard) => (
        <CardWrapper
          key={card.id}
          card={card}
          onUpdateQuantity={onUpdateQuantity}
        />
      ))}
    </Grid2>
  );
};
