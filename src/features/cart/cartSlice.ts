import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@app/store";
import { ICartItem } from "@/pages/Cart/types";
import { localStorageHelper } from "@/utils/localStorageHelper";

const STORAGE_KEY = "cartItems";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: localStorageHelper.loading(STORAGE_KEY) || [],
  },
  reducers: {
    addToCart: (state, action: PayloadAction<ICartItem>) => {
      state.items.push(action.payload);
      localStorageHelper.saving(STORAGE_KEY, state.items);
    },
    updateQuantity(
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) {
      const item = state.items.find(
        (item: ICartItem) => item.id === action.payload.id
      );
      if (item) item.quantity = action.payload.quantity;
      localStorageHelper.saving(STORAGE_KEY, state.items);
    },
    updatePrice: (
      state,
      action: PayloadAction<{ id: string; price: number }>
    ) => {
      const item = state.items.find(
        (item: ICartItem) => item.id === action.payload.id
      );
      if (item) item.price = action.payload.price;
      localStorageHelper.saving(STORAGE_KEY, state.items);
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter(
        (item: ICartItem) => item.id !== action.payload
      );
      localStorageHelper.saving(STORAGE_KEY, state.items);
    },
    clearCart(state) {
      state.items = [];
      localStorageHelper.saving(STORAGE_KEY, state.items);
    },
  },
});

export const selectCartItems = (state: RootState) => state.cart.items;

export const selectCardInCart = (cardId: string) =>
  createSelector([selectCartItems], (items: ICartItem[]) => {
    const cardInCart = items.find((item) => item.id === cardId);
    return {
      isInCart: Boolean(cardInCart),
      cardInCart: cardInCart || {
        id: "",
        name: "",
        price: 0,
        quantity: 0,
        availableQuantity: 0,
      },
    };
  });

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  updatePrice,
  clearCart,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
