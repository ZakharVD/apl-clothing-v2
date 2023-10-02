import { useEffect } from "react";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { Link, useNavigate } from "react-router-dom";
import { useFavoriteContext } from "../hooks/useFavoriteContext";
import FavoriteCard from "../components/FavoriteCard";

export default function Favorite() {
  const { currentUser } = useCurrentUser();
  const redirect = useNavigate();
  const { favoriteItems } = useFavoriteContext();

  useEffect(() => {
    if (currentUser === null) {
      return redirect("/");
    }
  }, [currentUser, redirect]);

  return (
    <>
      {favoriteItems.length > 0 ? (
        <div className="lg:w-[75%] mx-auto flex flex-row justify-center flex-wrap min-h-[90vh]">
          {favoriteItems.map((item) => (
            <FavoriteCard key={item.id} product={item} />
          ))}
        </div>
      ) : (
        <section className="flex flex-col justify-center text-center mt-[40px] mx-[7px]">
          <span className="text-[1.2rem]">
            Looks like you don't have any saved items...
          </span>
          <Link to="/shop" className="font-medium underline text-[1.2rem]">
            Start Shopping
          </Link>
        </section>
      )}
    </>
  );
}
