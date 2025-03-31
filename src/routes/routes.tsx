import { lazy } from "react";

const Cart = lazy(() =>
  import("../pages/Cart/Cart").then((module) => ({
    default: module.Cart,
  }))
);
const Catalog = lazy(() =>
  import("../pages/Catalog/Catalog").then((module) => ({
    default: module.Catalog,
  }))
);
const NotFound = lazy(() =>
  import("../pages/NotFound/NotFound").then((module) => ({
    default: module.NotFound,
  }))
);

export const routes = [
  {
    path: "/",
    element: <Catalog />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
