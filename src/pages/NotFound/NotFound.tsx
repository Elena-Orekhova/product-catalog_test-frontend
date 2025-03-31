import { Typography, Container } from "@mui/material";

export const NotFound = () => {
  return (
    <Container sx={{ marginTop: 5 }}>
      <Typography variant="h2" align="center" color="textSecondary">
        404 - Page Not Found
      </Typography>
      <Typography variant="h6" align="center" color="textSecondary">
        Sorry, the page you are looking for does not exist.
      </Typography>
    </Container>
  );
};

