import { styled } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";

export const NavbarRoot = styled(MuiAppBar)(({ theme }) => ({
  position: "static",
  backgroundColor: theme.palette.primary.main,
  borderBottom: `1px solid ${theme.palette.divider}`,
}));
