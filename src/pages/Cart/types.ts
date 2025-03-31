export interface ICartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  availableQuantity: number;
}

export interface ICartProps {
  handleClose: () => void;
}
