import { TItem } from "../types/data.types";
 
export function addItemToFavoriteHelper(favoriteItems: TItem[], itemToAdd: TItem) {
    const doesItemExist = favoriteItems.find((item) => item.id === itemToAdd.id);
    if (doesItemExist) {
        
        return favoriteItems;
    } else {
        return [...favoriteItems, {...itemToAdd}];
    }
}