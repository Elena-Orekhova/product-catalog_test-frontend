import { Box, Button, Grid2, TextField, Typography } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import {
  CardCasino,
  CardCardMedia,
  CardRoot,
  CardContent,
  CardTitle,
  CardDescription,
  CardInfo,
  CardTypography,
} from "./Card.styles";
import { ICardProps } from "./types";
import { useCard } from "./useCard";
import { memo } from "react";

export const Card = memo(
  ({ card, onUpdateQuantity, onAddToCart }: ICardProps) => {
    const {
      isInCart,
      cardInCart,
      handleIncrease,
      handleDecrease,
      handleQuantityChange,
      canIncreaseQuantity,
      canDecreaseQuantity,
    } = useCard({ card, onUpdateQuantity });

    return (
      <CardRoot>
        {card.image ? (
          <CardCardMedia>
            <img
              src={card.image}
              alt={card.title}
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </CardCardMedia>
        ) : (
          <CardCardMedia>
            <CardCasino />
          </CardCardMedia>
        )}
        <CardContent>
          <>
            <CardTitle>
              <Typography variant="h6" component="h2" textAlign="center">
                {card.title}
              </Typography>
            </CardTitle>
            <CardDescription>
              <CardTypography variant="body2">
                {card.description}
              </CardTypography>
            </CardDescription>
          </>
          <CardInfo>
            <CardTypography variant="body2">
              Категория: {card.category}
            </CardTypography>
            <CardTypography variant="body2">
              Доступно: {card.quantity} шт.
            </CardTypography>
            {card.quantity > 0 ? (
              <Typography
                variant="body1"
                color="text.primary"
                textAlign="right"
              >
                Цена: {card.price} ₽
              </Typography>
            ) : (
              <Typography
                variant="body1"
                color="text.secondary"
                textAlign="right"
              >
                Скоро в наличии
              </Typography>
            )}
          </CardInfo>
          <Grid2 container justifyContent="center" gap={4} marginTop={2}>
            {!isInCart ? (
              <Button
                size="large"
                color="primary"
                onClick={() => card.quantity > 0 && onAddToCart(card)}
                disabled={card.quantity === 0}
              >
                <AddShoppingCartIcon />
              </Button>
            ) : (
              <Box display="flex" alignItems="center" gap={2}>
                <Button
                  size="small"
                  color="primary"
                  onClick={handleDecrease}
                  disabled={!canDecreaseQuantity}
                >
                  -
                </Button>
                <TextField
                  value={cardInCart ? cardInCart.quantity : 0}
                  onChange={handleQuantityChange}
                  variant="outlined"
                  size="small"
                  sx={{ width: 60 }}
                  inputMode="numeric"
                />
                <Button
                  size="small"
                  color="primary"
                  onClick={handleIncrease}
                  disabled={!canIncreaseQuantity}
                >
                  +
                </Button>
              </Box>
            )}
          </Grid2>
        </CardContent>
      </CardRoot>
    );
  }
);
