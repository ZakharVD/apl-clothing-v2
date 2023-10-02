import { useParams } from "react-router-dom";
import { useProduct } from "../hooks/useProduct";
import { useCartContext } from "../hooks/useCartContext";
import { TCartItem } from "../types/data.types";
import { useAlert } from "../hooks/useAlert";
import { checkItemInFavorite } from "../helpers/checkItemInFavorite";
import { useFavoriteContext } from "../hooks/useFavoriteContext";
import { useCurrentUser } from "../hooks/useCurrentUser";

export default function Product() {
  const { category, gender, productId } = useParams();
  // type guards
  if (typeof category !== "string") {
    throw new Error();
  }
  if (gender !== "men" && gender !== "women") {
    // handle the error here
    throw new Error();
  }
  if (typeof productId !== "string") {
    throw new Error();
  }

  const product = useProduct(category, gender, productId);
  const { addItemToCart } = useCartContext();
  const { activateAlert } = useAlert();
  const { favoriteItems, addItemToFavorite } = useFavoriteContext();
  const { currentUser } = useCurrentUser();

  function onAddToCartHandler() {
    if (product !== undefined) {
      addItemToCart(product as TCartItem);
      activateAlert("Item added to cart", "green");
    }
  }
  function onAddToFavoriteHandler() {
    if (currentUser === null) {
      activateAlert("Please login to add items to favorite", "yellow");
      return;
    }
    if (product !== undefined) {
      const check = checkItemInFavorite(favoriteItems, product);
      if (check === true) {
        activateAlert("Item is already in favorite collection", "yellow");
        return;
      } else {
        addItemToFavorite(product);
        activateAlert("Item added to favorite collection", "green");
      }
    }
  }

  return (
    <section className="flex flex-col md:flex-row justify-center items-center mt-3 sm:mt-10">
      <div className="w-full m-3 md:m-10 xl:m-0 md:w-[40%] h-[35%] phone:h-1/2 md:h-auto flex justify-center items-center md:items-start">
        <img
          className="rounded-xl w-auto md:w-auto h-[300px] sm:h-[400px] lg:h-auto phone:max-w-[70%] sm:max-w-none md:max-h-[500px]"
          src={product?.imageUrl}
          alt={`Image of the ${product?.name}`}
        />
      </div>
      <div className="md:w-[60%] h-[65%] phone:h-1/2 md:h-auto max-w-[600px] p-5 xl:p-0 flex flex-col justify-around md:justify-start items-center md:items-start text-center md:text-left">
        <h3 className="text-xl sm:text-4xl w-full">{product?.name}</h3>
        <p className="my-2 text-sm sm:text-medium lg:my-10 font-light">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero
          eligendi perspiciatis soluta, nulla, quo similique nesciunt dicta
          facilis ab excepturi quaerat, impedit blanditiis omnis praesentium
          nihil voluptate ex mollitia voluptatibus. Lorem ipsum dolor sit amet,
          consectetur adipisicing elit. Perferendis, molestiae harum voluptas
          aspernatur consectetur dolor iure soluta est nam ratione beatae vel
          unde expedita laboriosam sit quam earum obcaecati sequi?
        </p>
        <div className="w-full max-w-[90%] sm:w-auto mt-3 lg:mt-10 flex flex-col sm:flex-row md:flex-col">
          <button
            className="sm:mr-4 md:mr-0 py-4 px-12 rounded-xl font-medium bg-black hover:bg-stone-800 text-white min-w-[180px]"
            onClick={onAddToCartHandler}
          >
            Add to Cart
          </button>
          <button onClick={onAddToFavoriteHandler} className="border-[1px] mt-2 sm:mt-0 md:mt-2 shadow-sm hover:border-black py-4 px-12 rounded-xl font-medium min-w-[180px]">
            Favorite
          </button>
        </div>
      </div>
    </section>
  );
}
