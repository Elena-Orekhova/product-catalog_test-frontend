import { Toolbar, Typography, Container, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { NavbarRoot } from "./Navbar.styles";

export const Navbar = () => {
  const navigate = useNavigate();

  const handleCart = () => {
    navigate("/cart");
  };

  return (
    <NavbarRoot>
      <Container>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">Каталог товаров</Typography>
          <Button
            size="large"
            color="inherit"
            sx={{ margin: 1 }}
            onClick={handleCart}
          >
            <ShoppingBasketIcon sx={{ marginRight: 1 }} />
            Корзина
          </Button>
        </Toolbar>
      </Container>
    </NavbarRoot>
  );
};
