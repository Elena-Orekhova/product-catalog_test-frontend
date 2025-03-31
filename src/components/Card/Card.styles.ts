import { Card, CardMedia, styled, Typography } from "@mui/material";
import { Casino } from "@mui/icons-material";
import { theme } from "@/styles/theme";

export const CardRoot = styled(Card)({
  padding: 20,
  maxWidth: 320,
  minWidth: 280,
  height: "100%",
  display: "flex",
  flexDirection: "column",
});

export const CardCardMedia = styled(CardMedia)({
  height: 200,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  objectFit: "contain",
  padding: "1rem",
});

export const CardCasino = styled(Casino)({
  fontSize: 100,
  color: theme.palette.text.secondary,
});

export const CardContent = styled("div")({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  minHeight: 300,
  overflow: "hidden",
});

export const CardTitle = styled("div")({
  marginBottom: "1rem",
  height: "4rem",
  overflow: "hidden",
  display: "-webkit-box",
  WebkitLineClamp: 3,
  WebkitBoxOrient: "vertical",
});

export const CardDescription = styled("div")({
  marginBottom: "1rem",
  height: "5rem",
  overflow: "hidden",
  display: "-webkit-box",
  WebkitLineClamp: 4,
  WebkitBoxOrient: "vertical",
});

export const CardInfo = styled("div")({
  marginTop: "auto",
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
});

export const CardTypography = styled(Typography)({
  color: theme.palette.text.secondary,
});
