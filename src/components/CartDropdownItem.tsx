import { useCartContext } from "../hooks/useCartContext";
import { TCartItem } from "../types/data.types";

type CartDropdownProps = {
  cartItem: TCartItem;
};

export default function CartDropdownItem({ cartItem }: CartDropdownProps) {
  const { name, imageUrl, price, quantity } = cartItem;
  const { removeItemFromCart } = useCartContext();

  function onRemoveHandler() {
    removeItemFromCart(cartItem);
  }

  return (
    <div className="w-[90%] flex h-[80px] m-3">
      <div className="w-[30%]">
        <img
          className="h-[100%] w-auto cover bg-center"
          src={imageUrl}
          alt=""
        />
      </div>
      <div className="w-[55%] flex flex-col items-start justify-center p-[5px]">
        <span className="font-bold">{name}</span>
        <span>
          {quantity} x ${price}
        </span>
      </div>
      <div className="w-[15%] flex justify-center items-center">
        {/* <FavoriteIcon onClick={() => {}} className="w-[20px] h-[20px] fill-black cursor-pointer mr-[8px] mt-[3px]"></FavoriteIcon> */}
        <span onClick={onRemoveHandler} className="text-2xl cursor-pointer">
          &#10005;
        </span>
      </div>
    </div>
  );
}
