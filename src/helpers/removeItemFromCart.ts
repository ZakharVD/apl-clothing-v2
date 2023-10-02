import { TCartItem } from "../types/data.types";

export function removeItemFromCartHelper(cartItems: TCartItem[], itemToRemove: TCartItem) {
    const existingItemInCart = cartItems.find((item) => item.id === itemToRemove.id);
    // check if the quality is 1, if it is than remove
    if (existingItemInCart?.quantity === 1) {
      return cartItems.filter(item => item.id !== itemToRemove.id)
    }
     // if exists, return cartItem with reduced quantity
     return cartItems.map((item) => {
      if (item.id === itemToRemove.id) {
        return {
          ...item,
          quantity: item.quantity - 1,
        }
      } else {
        return item;
      }
     })
  }