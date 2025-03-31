import { Button, Container, Grid2, TextField } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { Navbar } from "@/components/Navbar/Navbar";
import { useAppDispatch } from "@app/store";
import { updateQuantity } from "@/features/cart/cartSlice";
import { CardsList } from "@/components/CardsList/CardsList";
import { useFormik } from "formik";
import { TFilters } from "@/pages/FiltersModal/types";
import { useModal } from "@/app/ModalContext";
import { Typography } from "@mui/material";
import { useProducts } from "@/pages/Catalog/useProducts";
import { FiltersModal } from "@/pages/FiltersModal/FiltersModal";
import { LoadingSpinner } from "@/components/LoadingSpinner/LoadingSpinner";

export const Catalog = () => {
  const formik = useFormik<TFilters>({
    initialValues: {
      minPrice: 0,
      maxPrice: 1000,
      category: "",
      searchQuery: "",
    },
    onSubmit: () => {},
  });

  const { cards, categories, error, isLoading } = useProducts(formik.values);
  const dispatch = useAppDispatch();
  const dialog = useModal();

  const createFilterModal = () => {
    dialog.open(({ close }) => (
      <FiltersModal
        formik={formik}
        handleClose={close}
        categories={categories}
      />
    ));
  };

  return (
    <Container>
      <Navbar />
      <Grid2 container justifyContent="space-between" marginBottom={3}></Grid2>
      <Grid2 container justifyContent="space-between" marginBottom={1}>
        <Button size="large" color="primary" onClick={createFilterModal}>
          <FilterAltIcon />
          Фильтры
        </Button>
        <TextField
          name="searchQuery"
          label="Поиск"
          variant="outlined"
          size="small"
          value={formik.values.searchQuery}
          onChange={formik.handleChange}
          margin="normal"
        />
      </Grid2>
      {error && <Typography color="error">{error}</Typography>}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <CardsList
          cards={cards}
          onUpdateQuantity={(id, quantity) =>
            dispatch(updateQuantity({ id, quantity }))
          }
        />
      )}
    </Container>
  );
};
