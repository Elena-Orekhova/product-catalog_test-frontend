import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ModalProvider } from "@/app/ModalContext";
import { Provider } from "react-redux";
import { store } from "@app/store";
import { routes } from "./routes/routes";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ModalProvider>
          <Routes>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Routes>
        </ModalProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
