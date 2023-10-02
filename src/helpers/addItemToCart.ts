import { TCartItem } from "../types/data.types";

export function addItemToCartHelper(cartItems: TCartItem[], itemToAdd: TCartItem) {
    if (!itemToAdd.quantity) {
        itemToAdd.quantity = 1;
    } 
    const doesCartItemExist = cartItems.find((item) => item.id === itemToAdd.id);
    if (doesCartItemExist) {
        return cartItems.map((item) => {
            if (item.id === itemToAdd.id) {
                return {
                    ...item,
                    quantity: item.quantity + 1,
                }
            } else {
                return item;
            }
        })
    }
    return [...cartItems, {...itemToAdd}]
}