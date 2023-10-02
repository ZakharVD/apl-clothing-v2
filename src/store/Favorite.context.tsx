import { ReactNode, createContext, useState } from "react";
import { TItem } from "../types/data.types";
import { addItemToFavoriteHelper } from "../helpers/addItemToFavorites";
import { removeItemFromFavoritesHelper } from "../helpers/removeItemFromFavorites";

type FavoriteProviderProps = {
    children: ReactNode;
}
type TFavoriteContext = {
    favoriteItems: TItem[];
    addItemToFavorite: (itemToAdd: TItem) => void;
    removeItemFromFavorite: (itemToRemove: TItem) => void;
}

export const FavoriteContext = createContext<TFavoriteContext>({} as TFavoriteContext);

export function FavoriteProvider({ children }: FavoriteProviderProps) {
    const [favoriteItems, setFavoriteItems] = useState<TItem[]>([]);
    console.log("items in favorite:", favoriteItems)

    function addItemToFavorite(itemToAdd: TItem) {
        return setFavoriteItems(addItemToFavoriteHelper(favoriteItems, itemToAdd));
    }

    function removeItemFromFavorite(itemToRemove: TItem) {
        return setFavoriteItems(removeItemFromFavoritesHelper(favoriteItems, itemToRemove))
    }

    return (
        <FavoriteContext.Provider value={{favoriteItems, addItemToFavorite, removeItemFromFavorite}}>{ children }</FavoriteContext.Provider>
    )
}