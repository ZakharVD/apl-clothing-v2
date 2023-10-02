import { TItem } from "../types/data.types";

export function removeItemFromFavoritesHelper(favoriteItems: TItem[], itemToRemove: TItem) {
    return favoriteItems.filter((item) => item.id !== itemToRemove.id);
}   