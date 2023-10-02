import { useContext } from "react";
import { ModalContext } from "../store/Modal.context";

export function useModal() {
    return useContext(ModalContext);
}