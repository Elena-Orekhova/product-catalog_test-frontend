import { useDispatch } from "react-redux";
import { useAppSelector } from "@app/store";
import {
  clearCart,
  removeFromCart,
  selectCartItems,
  updateQuantity,
} from "@/features/cart/cartSlice";
import { ICartItem } from "@/pages/Cart/types";
import { useCallback } from "react";
import { TCard } from "@/components/Card/types";

export const useCart = () => {
  const cartItems = useAppSelector(selectCartItems);
  const dispatch = useDispatch();
  const totalQuantity = cartItems.reduce(
    (sum: number, item: ICartItem) => sum + item.quantity,
    0
  );
  const totalPrice = cartItems.reduce(
    (sum: number, item: ICartItem) => sum + item.price * item.quantity,
    0
  );

  const handleIncrease = (item: ICartItem) => {
    if (item.quantity < item.availableQuantity) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
    }
  };

  const handleDecrease = (item: ICartItem) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
    }
  };

  const handleQuantityInputChange = useCallback(
    (id: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = parseInt(e.target.value, 10);
      if (!isNaN(inputValue)) {
        const item = cartItems.find((item: TCard) => item.id === id);
        if (item && inputValue > 0 && inputValue <= item.availableQuantity) {
          dispatch(updateQuantity({ id, quantity: inputValue }));
        }
      }
    },
    [dispatch, cartItems]
  );

  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return {
    totalQuantity,
    totalPrice,
    handleIncrease,
    handleDecrease,
    handleQuantityInputChange,
    handleRemoveItem,
    handleClearCart,
  };
};
