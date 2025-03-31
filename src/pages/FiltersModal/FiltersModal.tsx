import {
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  MenuItem,
  Box,
  Typography,
  Slider,
  Grid2,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { Form, FormikProvider, useFormik } from "formik";
import { IFiltersModalProps, TFilters } from "./types";
import * as Yup from "yup";

export const validationSchema = Yup.object({
  minPrice: Yup.number()
    .min(0, `Минимальная цена не может быть меньше 0} ₽`)
    .required("Обязательное поле")
    .test(
      "is-greater",
      "Минимальная цена не может быть больше максимальной",
      function (value) {
        const { maxPrice } = this.parent;
        return value <= maxPrice;
      }
    ),
  maxPrice: Yup.number()
    .max(1000, `Максимальная цена не может быть больше 1000 ₽`)
    .required("Обязательное поле")
    .test(
      "is-greater",
      "Максимальная цена не может быть меньше минимальной",
      function (value) {
        const { minPrice } = this.parent;
        return value >= minPrice;
      }
    ),
});

export function FiltersModal({
  formik: parentFormik,
  handleClose,
  categories,
}: IFiltersModalProps) {
  const localFormik = useFormik<TFilters>({
    initialValues: { ...parentFormik.values },
    validationSchema,
    onSubmit: (values) => {
      (Object.keys(values) as Array<keyof TFilters>).forEach((key) => {
        parentFormik.setFieldValue(key, values[key]);
      });
      parentFormik.setFieldValue("currentPage", 1);
      handleClose();
    },
  });

  const handleReset = () => {
    localFormik.resetForm({
      values: {
        minPrice: 0,
        maxPrice: 1000,
        category: "",
        searchQuery: parentFormik.values.searchQuery,
      },
    });
  };

  return (
    <Dialog open={true} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle textAlign="center">Фильтры</DialogTitle>
      <Box position="absolute" right={20}>
        <Button onClick={handleClose} color="primary" sx={{ marginTop: 2 }}>
          <ClearIcon />
        </Button>
      </Box>
      <DialogContent sx={{ margin: 2 }}>
        <FormikProvider value={localFormik}>
          <Form onSubmit={localFormik.handleSubmit}>
            <Grid2 container spacing={2} margin={2}>
              <Grid2 size={{ xs: 6 }}>
                <TextField
                  label="Минимальная цена"
                  name="minPrice"
                  type="number"
                  fullWidth
                  value={localFormik.values.minPrice}
                  onChange={localFormik.handleChange}
                  onBlur={localFormik.handleBlur}
                  error={
                    localFormik.touched.minPrice &&
                    Boolean(localFormik.errors.minPrice)
                  }
                  helperText={
                    localFormik.touched.minPrice && localFormik.errors.minPrice
                  }
                />
              </Grid2>
              <Grid2 size={{ xs: 6 }}>
                <TextField
                  label="Максимальная цена"
                  type="number"
                  name="maxPrice"
                  fullWidth
                  value={localFormik.values.maxPrice}
                  onChange={localFormik.handleChange}
                  onBlur={localFormik.handleBlur}
                  error={
                    localFormik.touched.maxPrice &&
                    Boolean(localFormik.errors.maxPrice)
                  }
                  helperText={
                    localFormik.touched.maxPrice && localFormik.errors.maxPrice
                  }
                />
              </Grid2>
            </Grid2>
            <Box margin={2}>
              <Typography gutterBottom>Диапазон цен</Typography>
              <Slider
                value={[
                  localFormik.values.minPrice,
                  localFormik.values.maxPrice,
                ]}
                onChange={(_, newValue) => {
                  if (Array.isArray(newValue)) {
                    localFormik.setFieldValue("minPrice", newValue[0]);
                    localFormik.setFieldValue("maxPrice", newValue[1]);
                  }
                }}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `${value} ₽`}
                min={0}
                max={1000}
              />
            </Box>
            <Grid2
              container
              spacing={2}
              justifyContent="space-between"
              margin={2}
              gap={2}
            >
              <TextField
                label="Категория"
                name="category"
                select
                variant="outlined"
                size="small"
                fullWidth
                value={localFormik.values.category}
                onChange={localFormik.handleChange}
              >
                <MenuItem value="">Все категории</MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </TextField>
            </Grid2>
            <Box display="flex" justifyContent="space-between" marginTop={10}>
              <Button variant="text" type="button" onClick={handleReset}>
                Сбросить фильтры
              </Button>
              <Button variant="outlined" type="submit">
                Применить фильтры
              </Button>
            </Box>
          </Form>
        </FormikProvider>
      </DialogContent>
    </Dialog>
  );
}
