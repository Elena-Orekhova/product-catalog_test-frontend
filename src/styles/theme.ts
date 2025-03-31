import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
    background: {
      default: "#fff",
    },
    text: {
      primary: "#000",
      secondary: "#444",
    },
    divider: "rgba(255, 255, 255, 0.12)",
  },
});

export default theme;
