import { useCartContext } from "../hooks/useCartContext";
import { TCartItem } from "../types/data.types";
import favoriteIcon from "../assets/favorite.svg";
import { useFavoriteContext } from "../hooks/useFavoriteContext";
import { checkItemInFavorite } from "../helpers/checkItemInFavorite";
import { useAlert } from "../hooks/useAlert";
import { useCurrentUser } from "../hooks/useCurrentUser";

type CheckoutItemCardProps = {
  product: TCartItem;
};

export default function CheckoutItemCard({ product }: CheckoutItemCardProps) {
  const { name, quantity, imageUrl, price } = product;
  const { addItemToCart, removeItemFromCart, clearItemFromCart } = useCartContext();
  const { favoriteItems, addItemToFavorite } = useFavoriteContext();
  const { activateAlert } = useAlert();
  const { currentUser} = useCurrentUser();

  function onPlusHandler() {
    addItemToCart(product);
  }
  function onMinusHandler() {
    removeItemFromCart(product);
  }
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
  function onClearHadler() {
    clearItemFromCart(product);
  }

  return (
    <div className="w-[90%] mx-auto md:w-full h-[400px] phone:h-[200px] md:h-[250px] flex flex-col phone:flex-row mb-5 border-[1px] shadow-md rounded-xl">
      <div className="h-[60%] phone:w-[40%] md:w-[30%] phone:h-full relative">
        <div
          onClick={onAddToFavoriteHandler}
          className="flex phone:hidden absolute top-4 right-4 z-10"
        >
          <img
            className="w-[25px] h-[25px] cursor-pointer"
            src={favoriteIcon}
            alt="Favorite items icon"
          />
        </div>
        <img
          src={imageUrl}
          alt={`image of ${name}`}
          className="h-full w-full object-cover rounded-lg"
        />
      </div>
      <div className="h-[40%] phone:h-auto phone:w-[50%] md:w-[60%]">
        <div className="h-1/2 p-3 md:p-6 flex flex-col justify-between">
          <div>
            <p className="text-lg md:text-xl font-medium">{name}</p>
          </div>
          <div>
            <span>${price}</span>
          </div>
        </div>
        <div className="h-1/2 p-3 md:p-6 flex justify-center phone:justify-start">
          <div className="flex flex-col md:flex-row justify-between w-full phone:w-auto">
            <div className="customShadow flex flex-row justify-between w-full h-[90%] phone:w-[130px] phone:min-w-[130px] phone:h-[50%] rounded-lg mb-2 md:mb-0 md:mr-3">
              <div
                onClick={onMinusHandler}
                className="w-[30%] bg-black text-white flex justify-center items-center text-md cursor-pointer"
                style={{
                  borderTopLeftRadius: "8px",
                  borderBottomLeftRadius: "8px",
                }}
              >
                -
              </div>
              <div className="w-[40%] flex justify-center items-center">
                {quantity}
              </div>
              <div
                onClick={onPlusHandler}
                className="w-[30%] bg-black text-white flex justify-center items-center text-md cursor-pointer"
                style={{
                  borderTopRightRadius: "8px",
                  borderBottomRightRadius: "8px",
                }}
              >
                +
              </div>
            </div>
           <div className="hidden phone:flex h-[50%] w-full">
           <button onClick={onAddToFavoriteHandler} className="border-[1px] hover:border-black shadow-sm flex justify-center items-center w-full h-full rounded-lg font-medium text-black p-3">Save for Later</button>
           </div>
          </div>
        </div>
      </div>
      <div onClick={onClearHadler} className="hidden w-[10%] phone:flex justify-center items-center">
        <span className="text-xl font-medium cursor-pointer">&#10005;</span>
      </div>
    </div>
  );
}
