import { TItem } from "../types/data.types";

export function checkItemInFavorite(favoriteItems: TItem[], itemToCheck: TItem) {
    const doesItemExist = favoriteItems.find((item) => item.id === itemToCheck.id);
    if (doesItemExist) {
        return true;
    } else {
        return false;
    }
}