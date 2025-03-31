import { List, ListItem, styled } from "@mui/material";

export const CartList = styled(List)({
  marginTop: 2,
  overflow: "auto",
  maxHeight: "60vh",
});

export const CartListItem = styled(ListItem)({
  gap: 2,
  display: "flex",
  justifyContent: "space-between",
});
