import { ReactNode, createContext, useReducer } from "react";

type ModalProviderProps = {
  children: ReactNode;
};
type TModalContext = {
    modalMessage: string;
    showModal: boolean;
    activateModal: (message: string) => void;
    deactivateModal: () => void;
}
type TState = {
  showModal: boolean;
  modalMessage: string;
};
type TAction =
  | {
      type: "ACTIVATE";
      payload: {
        message: string;
      };
    }
  | {
      type: "DEACTIVATE";
    };

const INITIAL_STATE = {
  showModal: false,
  modalMessage: "",
};

function modalReducer(state: TState, action: TAction) {
  switch (action.type) {
    case "ACTIVATE":
      return {
        ...state,
        showModal: true,
        modalMessage: action.payload.message,
      };
    case "DEACTIVATE":
      return {
        ...state,
        showModal: false,
      };
    default:
      throw new Error(`Unhandled type in modalReducer`);
  }
}

export const ModalContext = createContext<TModalContext>({} as TModalContext);

export function ModalProvider({ children }: ModalProviderProps) {
    const [state, dispatch] = useReducer(modalReducer, INITIAL_STATE);
    const {showModal, modalMessage} = state;

    function activateModal(message: string) {
        dispatch({type: "ACTIVATE", payload: { message: message}});
    }
    function deactivateModal() {
      dispatch({type: "DEACTIVATE"});
    }


  return <ModalContext.Provider value={{activateModal, deactivateModal, showModal, modalMessage}}>{children}</ModalContext.Provider>;
}
