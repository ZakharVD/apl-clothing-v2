import { useFavoriteContext } from "../hooks/useFavoriteContext";
import { TItem } from "../types/data.types";
import Card from "./shared/Card";
import trashIcon from "../assets/trashcan.svg"

type FavoriteCardProps = {
    product: TItem;
}

export default function FavoriteCard({product}: FavoriteCardProps) {
    const { removeItemFromFavorite } = useFavoriteContext();

    function removeFromFavoriteHandler() {
        removeItemFromFavorite(product);
    }

    return (
        <Card product={product} onIconClick={removeFromFavoriteHandler} iconSrc={trashIcon}/>
    )
}