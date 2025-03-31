import { createContext, ReactNode, useContext } from "react";
import {
  useModalContext,
  ModalResult,
  RenderDialogFunction,
} from "@/hooks/useModalContext";

interface IModalProviderProps {
  children: ReactNode;
}

interface IModalContextType {
  open: <T = unknown>(
    renderDialog: RenderDialogFunction<T>
  ) => Promise<ModalResult<T>>;
}

const ModalContext = createContext<IModalContextType | null>(null);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal должен использоваться внутри ModalProvider");
  }
  return context;
};

export const ModalProvider = ({ children }: IModalProviderProps) => {
  const modalState = useModalContext();

  return (
    <ModalContext.Provider value={modalState}>{children}</ModalContext.Provider>
  );
};
