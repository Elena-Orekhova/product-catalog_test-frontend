import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@app/store";
import { removeFromCart, selectCardInCart } from "@/features/cart/cartSlice";
import { ICardProps } from "./types";

type TUseCardProps = {
  card: ICardProps["card"];
  onUpdateQuantity: ICardProps["onUpdateQuantity"];
};

export const useCard = ({ card, onUpdateQuantity }: TUseCardProps) => {
  const dispatch = useAppDispatch();
  const { isInCart, cardInCart } = useAppSelector(selectCardInCart(card.id));

  const canIncreaseQuantity = () =>
    cardInCart && cardInCart.quantity < card.quantity;
  const canDecreaseQuantity = () => cardInCart && cardInCart.quantity > 1;

  const handleIncrease = useCallback(() => {
    if (canIncreaseQuantity()) {
      onUpdateQuantity(card.id, cardInCart.quantity + 1);
    }
  }, [card, cardInCart, onUpdateQuantity]);

  const handleDecrease = useCallback(() => {
    if (canDecreaseQuantity()) {
      onUpdateQuantity(card.id, cardInCart.quantity - 1);
    } else if (cardInCart) {
      dispatch(removeFromCart(card.id));
    }
  }, [card, cardInCart, dispatch, onUpdateQuantity]);

  const handleQuantityChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = parseInt(event.target.value, 10);

      if (
        !isNaN(inputValue) &&
        inputValue >= 0 &&
        inputValue <= card.quantity
      ) {
        onUpdateQuantity(card.id, inputValue);
      }
    },
    [card, onUpdateQuantity]
  );

  return {
    isInCart,
    cardInCart,
    canIncreaseQuantity,
    canDecreaseQuantity,
    handleIncrease,
    handleDecrease,
    handleQuantityChange,
  };
};
