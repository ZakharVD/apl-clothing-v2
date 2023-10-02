import { useContext } from "react";
import { FavoriteContext } from "../store/Favorite.context";

export function useFavoriteContext() {
    return useContext(FavoriteContext);
}