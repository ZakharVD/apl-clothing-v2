import { useNavigate } from "react-router-dom";
import { TCartItem } from "../types/data.types";
import CartDropdownItem from "./CartDropdownItem";
import { useCartContext } from "../hooks/useCartContext";

type Props = {
    isOpen: boolean;
    items: TCartItem[];
  };
  
  export default function CartDropdown({ isOpen, items }: Props) {
    const redirect = useNavigate();
    const { setIsCartOpen } = useCartContext();

    function onCheckoutHandler() {
      redirect("/checkout");
      setIsCartOpen(false);
    }
    return (
      <>
        {isOpen && (
          <>
            <div className="absolute flex flex-col top-11 right-[-20px] sm:right-0 bg-white border-[1px] shadow-lg w-[94vw] phone:w-[350px] min-h-[150px] rounded-xl z-30">
              <div className="max-h-[300px] overflow-scroll">
                {items.length > 0 ? (
                  items.map((item) => (
                    <CartDropdownItem key={item.id} cartItem={item} />
                  ))
                ) : (
                  <div className="centeredDiv flex justify-center items-center">
                    Cart is Empty
                  </div>
                )}
              </div>
              <button
                onClick={onCheckoutHandler}
                className="gradient3 p-4 phone:p-3 m-2 rounded-lg font-medium text-center text-white"
              >
                Go to checkout
              </button>
            </div>
          </>
        )}
      </>
    );
  }