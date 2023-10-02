import { useEffect } from "react";
import shoppingCartIcon from "../assets/shoppingBag-new.svg";
import { useCartContext } from "../hooks/useCartContext";
import { useAlert } from "../hooks/useAlert";
import CartDropdown from "./CartDropdown";

export default function CartIcon() {
  const { isCartOpen, setIsCartOpen, cartItems, cartCount } = useCartContext();
  const { activateAlert } = useAlert();

  useEffect(() => {
    if (cartItems.length < 1) {
      setIsCartOpen(false);
    }
  }, [cartItems, setIsCartOpen]);

  function onIconClick() {
    if (cartItems.length < 1) {
      activateAlert("Your shopping cart is empty", "yellow");
      return;
    } else {
      setIsCartOpen((prev) => !prev);
    }
  }

  return (
  <>
      <div className="relative flex justify-center items-center cursor-pointer">
      <div className="flex justify-center items-center mb-[3px] relative">
        <div onClick={onIconClick} className="relative">
          <img
            src={shoppingCartIcon}
            className="w-[27px] sm:w-[32px] h-[27px] sm:h-[32px]"
            alt="Favorite Icon"
          />
          <span className={`absolute ${cartCount > 0 ? "bg-red-400" : ""} rounded-[50%] px-[6px] py-[1px] top-[16px] sm:top-5 left-[14px] sm:left-4 font-bold text-[10px] sm:text-xs`}>{cartCount > 0 ? cartCount : ""}</span>
        </div>
        <CartDropdown isOpen={isCartOpen} items={cartItems} />
      </div>
    </div>
  </>
  );
}

