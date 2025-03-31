import { JSX, useCallback, useRef } from "react";
import { createRoot, Root } from "react-dom/client";
import { Provider } from "react-redux";

import { store } from "@app/store";

export interface ModalResult<T = unknown> {
  data?: T;
  meta?: {
    requestStatus?: "fulfilled" | "rejected";
  };
}

export interface OpenModalOptions<T = unknown> {
  onSuccess?: (result: ModalResult<T>) => void;
  onError?: (result: ModalResult<T>) => void;
}

export interface ModalProps<T = unknown> {
  close: (result?: ModalResult<T>) => void;
}

export type RenderDialogFunction<T = unknown> = (
  props: ModalProps<T>
) => JSX.Element;

export const useModalContext = () => {
  const modalRootRef = useRef<Root | null>(null);
  const modalContainerRef = useRef<HTMLDivElement | null>(null);

  const open = useCallback(
    <T = unknown,>(
      renderDialog: RenderDialogFunction<T>
    ): Promise<ModalResult<T>> => {
      const modalPromise = new Promise<ModalResult<T>>((resolve) => {
        if (modalContainerRef.current) {
          modalRootRef.current?.unmount();
          document.body.removeChild(modalContainerRef.current);
        }

        const modalContainer = document.createElement("div");
        modalContainerRef.current = modalContainer;
        document.body.appendChild(modalContainer);

        const close = (result?: ModalResult<T>) => {
          if (modalRootRef.current) {
            modalRootRef.current.unmount();
            modalRootRef.current = null;
          }
          if (modalContainerRef.current) {
            document.body.removeChild(modalContainerRef.current);
            modalContainerRef.current = null;
          }
          resolve(result || {});
        };

        const modalContent = (
          <Provider store={store}>{renderDialog({ close })}</Provider>
        );

        const root = createRoot(modalContainer);
        modalRootRef.current = root;
        root.render(modalContent);
      });

      return modalPromise;
    },
    []
  );

  return {
    open,
  };
};
