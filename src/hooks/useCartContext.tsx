import { useContext } from "react";
import { CartContext } from "../store/Cart.context";

export function useCartContext() {
    return useContext(CartContext);
  }