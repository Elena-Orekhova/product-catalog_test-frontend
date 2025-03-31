import {
  Box,
  Typography,
  Button,
  ListItemText,
  Divider,
  TextField,
  Container,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { CartList, CartListItem } from "@/pages/Cart/Cart.styles";
import { useCart } from "@/pages/Cart/useCart";
import { useAppSelector } from "@app/store";
import { selectCartItems } from "@/features/cart/cartSlice";
import { ICartItem } from "@/pages/Cart/types";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const Cart = () => {
  const {
    totalQuantity,
    totalPrice,
    handleIncrease,
    handleDecrease,
    handleRemoveItem,
    handleClearCart,
    handleQuantityInputChange,
  } = useCart();

  const cartItems = useAppSelector(selectCartItems);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  const handleOrder = () => {
    navigate("/");
    handleClearCart();
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" textAlign="center" margin={4}>
        Корзина
      </Typography>
      <Button onClick={handleBack}>
        <ArrowBackIcon />
        Вернуться в каталог
      </Button>
      {cartItems.length === 0 ? (
        <Typography marginTop={2} variant="body2" textAlign="center">
          Корзина пуста
        </Typography>
      ) : (
        <>
          <CartList>
            {cartItems.map((item: ICartItem) => (
              <CartListItem key={item.id}>
                <ListItemText
                  primary={item.name}
                  secondary={`Цена: ${item.price} | Количество: ${item.quantity}`}
                />
                <Box display="flex" alignItems="center">
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => handleDecrease(item)}
                    disabled={item?.quantity === 1}
                  >
                    -
                  </Button>
                  <TextField
                    value={item?.quantity || ""}
                    onChange={handleQuantityInputChange(item.id)}
                    variant="outlined"
                    size="small"
                    sx={{ width: 60 }}
                    inputMode="numeric"
                  />
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => handleIncrease(item)}
                    disabled={item.quantity >= item.availableQuantity}
                  >
                    +
                  </Button>
                </Box>
                <Button onClick={() => handleRemoveItem(item.id)}>
                  <DeleteForeverIcon />
                </Button>
              </CartListItem>
            ))}
          </CartList>
          <Divider sx={{ marginY: 2 }} />
          <Box
            display="flex"
            justifyContent="space-between"
            paddingX={2}
            marginBottom={1}
          >
            <Typography variant="body1">Количество товаров:</Typography>
            <Typography variant="body1">{totalQuantity} шт.</Typography>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            paddingX={2}
            marginBottom={3}
          >
            <Typography variant="h6">Сумма заказа:</Typography>
            <Typography variant="h6">{totalPrice} ₽</Typography>
          </Box>
        </>
      )}

      <Box display="flex" justifyContent="space-between" marginTop={3}>
        <Button
          onClick={handleClearCart}
          color="primary"
          disabled={cartItems.length === 0}
        >
          Очистить корзину
        </Button>
        <Button
          variant="outlined"
          color="primary"
          disabled={cartItems.length === 0}
          onClick={handleOrder}
        >
          Оформить заказ
        </Button>
      </Box>
    </Container>
  );
};
