import { useNavigate } from "react-router-dom";
import { TCartItem, TItem } from "../../types/data.types";
import { useCartContext } from "../../hooks/useCartContext";
import { useAlert } from "../../hooks/useAlert";

type CardProps = {
    product: TItem;
    route?: string;
    onIconClick: () => void;
    iconSrc: string;
}

export default function Card({product, route, onIconClick, iconSrc}: CardProps) {
    const { imageUrl, name, price } = product;
    const redirect = useNavigate();
    const { addItemToCart } = useCartContext();
    const { activateAlert } = useAlert();

    function onCardClickHander() {
        if (route === undefined) {
            return;
        }
        redirect(route);
      }

      function onAddToCartHandler() {
        addItemToCart(product as TCartItem);
        activateAlert("Item added to cart", "green");
      }

  return (
    <div className="border-[1px] shadow-lg w-[150px] sm:w-[280px] md:w-[330px] h-[300px] sm:h-[420px] md:h-[490px] flex flex-col items-center m-2 lg:m-5 rounded-xl relative cursor-pointer">
      <div onClick={onIconClick} className="absolute top-4 right-4 z-10">
        <img
          className="w-[20px] sm:w-[25px] h-[20px] sm:h-[25px] cursor-pointer"
          src={iconSrc}
          alt="Favorite items icon"
        />
      </div>
      <div
        onClick={onCardClickHander}
        className="w-[100%] h-[150px] sm:h-[70%] rounded-xl"
      >
        <img
          src={imageUrl}
          alt=""
          className="w-[100%] h-[100%] cover bg-center rounded-xl"
        />
      </div>
      <div className="h-[90px] md:h-[30%] min-h-[145px] sm:min-h-[130px] md:min-h-[130px] w-[140px] sm:w-full p-2 flex flex-col justify-between">
        <div className="flex flex-col sm:flex-row justify-between items-top my-[5px]">
          <span className="text-[0.8rem] md:text-[1rem] sm:w-[70%] font-medium">
            {name}
          </span>
          <span className="text-[0.8rem] md:text-[1rem] sm:w-[30%] text-left sm:text-right font-medium">
            ${price}
          </span>
        </div>
        <button
          onClick={onAddToCartHandler}
          className="border-2 border-black hover:bg-black hover:text-white text-black rounded-lg p-2 w-[95%] mx-auto opacity-0.7 mb-2 sm:my-2 text-sm md:text-[1.1rem] font-medium"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
