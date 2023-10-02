import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import { TCartItem } from "../types/data.types";
import { addItemToCartHelper } from "../helpers/addItemToCart";
import { removeItemFromCartHelper } from "../helpers/removeItemFromCart";


type CartProviderProps = {
  children: ReactNode;
};

type TCartContext = {
    cartItems: TCartItem[];
    addItemToCart: (itemToAdd: TCartItem) => void;
    isCartOpen: boolean;
    setIsCartOpen: Dispatch<SetStateAction<boolean>>
    removeItemFromCart: (itemToRemove: TCartItem) => void;
    cartCount: number;
    cartTotal: number;
    clearItemFromCart: (itemToClear: TCartItem) => void;
};

//helper
function clearItemFromCartHelper(cartItems: TCartItem[], itemToClear: TCartItem) {
  return cartItems.filter((item) => item.id !== itemToClear.id);
}

export const CartContext = createContext<TCartContext>({} as TCartContext);

export function CartProvider({ children }: CartProviderProps) {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState<TCartItem[]>([]);
  console.log("products in the shopping cart:", cartItems)
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    const newCartTotal = cartItems.reduce((total, item) => total + item.quantity * item.price, 0);
    setCartTotal(newCartTotal);
  }, [cartItems]);  

  function addItemToCart(itemToAdd: TCartItem) {
    return setCartItems(addItemToCartHelper(cartItems, itemToAdd))
  }

  function removeItemFromCart(itemToRemove: TCartItem) {
    return setCartItems(removeItemFromCartHelper(cartItems, itemToRemove))
  }

  function clearItemFromCart(itemToClear: TCartItem) {
    setCartItems(clearItemFromCartHelper(cartItems, itemToClear));
  }

  return <CartContext.Provider value={{cartItems, addItemToCart, isCartOpen, setIsCartOpen, removeItemFromCart, cartCount, cartTotal, clearItemFromCart}}>{children}</CartContext.Provider>;
}
