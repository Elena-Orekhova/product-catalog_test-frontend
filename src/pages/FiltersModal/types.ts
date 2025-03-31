import { FormikProps } from "formik";

export type TFilters = {
  minPrice: number;
  maxPrice: number;
  category: string;
  searchQuery: string;
};

export interface IFiltersModalProps {
  handleClose: () => void;
  formik: FormikProps<TFilters>;
  categories: string[];
}
