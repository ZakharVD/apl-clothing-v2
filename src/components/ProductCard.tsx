import { TItem } from "../types/data.types";
import favoriteIcon from "../assets/favorite.svg";
import { useFavoriteContext } from "../hooks/useFavoriteContext";
import Card from "./shared/Card";
import { useAlert } from "../hooks/useAlert";
import { checkItemInFavorite } from "../helpers/checkItemInFavorite";
import { useCurrentUser } from "../hooks/useCurrentUser";

type Props = {
  product: TItem;
  route: string;
};

export default function ProductCard({ product, route }: Props) {
  const { addItemToFavorite, favoriteItems } = useFavoriteContext();
  const { activateAlert } = useAlert();
  const { currentUser } = useCurrentUser();

  function onAddToFavoriteHandler() {
    if (currentUser === null) {
      activateAlert("Please login to add items to favorite", "yellow");
      return;
    }
    const check = checkItemInFavorite(favoriteItems, product);
    if (check === true) {
      activateAlert("Item is already in favorite collection", "yellow");
      return;
    } else {
      addItemToFavorite(product);
      activateAlert("Item added to favorite collection", "green");
    }
  }

  return (
    <Card
      product={product}
      route={route}
      onIconClick={onAddToFavoriteHandler}
      iconSrc={favoriteIcon}
    />
  );
}
