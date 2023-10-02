import { useEffect } from "react";
import CheckoutItemCard from "../components/CheckoutItemCard";
import { useCartContext } from "../hooks/useCartContext";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cartItems, cartTotal } = useCartContext();
  const redirect = useNavigate();

  useEffect(() => {
    if (cartItems.length < 1) {
        redirect("/")
    }
  }, [cartItems, redirect])

  return (
    <section className="max-w-[800px] h-auto mx-auto">
      <div>
        {cartItems.map((item) => (
          <CheckoutItemCard key={item.id} product={item} />
        ))}
      </div>
      <div className="w-[90%] flex justify-end my-[8px]">
        <span className="font-semibold text-lg sm:text-xl lg:text-2xl border-t-2 border-black">
          Cart total: ${cartTotal}
        </span>
      </div>
    </section>
  );
}
