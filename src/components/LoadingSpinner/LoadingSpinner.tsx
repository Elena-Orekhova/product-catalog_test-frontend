import { Box, CircularProgress } from "@mui/material";

export const LoadingSpinner = () => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    minHeight={200}
  >
    <CircularProgress size={40} />
  </Box>
);
