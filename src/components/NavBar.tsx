import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { signOutUser } from "../utils/firebase/userData";
import accountIcon from "../assets/myAccount.svg";
import favoriteIcon from "../assets/favorite.svg";
import CartIcon from "./CartIcon";
import AccountDropdown from "./AccountDropdown";
import { useAlert } from "../hooks/useAlert";
import { useFavoriteContext } from "../hooks/useFavoriteContext";
import { useModal } from "../hooks/useModal";
import ModalWindow from "./ModalWindow";
import { useUsername } from "../hooks/useUserName";

export default function NavBar() {
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const { currentUser } = useCurrentUser();
  const redirect = useNavigate();
  const { activateAlert } = useAlert();
  const { favoriteItems } = useFavoriteContext();
  const { activateModal, deactivateModal } = useModal();
  const username = useUsername();

  const toggleAcc = () => {
    setIsAccountOpen((prev) => !prev);
  };

  function logoutUser() {
    try {
      signOutUser();
      activateAlert("User logged out successfully", "green");
      setIsAccountOpen(false);
      redirect("/");
      deactivateModal();
    } catch {
      activateAlert("An unexpected error has occured", "red");
    }
  }

  function onLogoutHandler() {
    activateModal("Are you sure you want to logout?", logoutUser);
  }

  function onFavoriteHandler() {
    if (currentUser === null) {
      activateAlert("Please login to view favorite collection", "yellow");
      return;
    } else if (favoriteItems.length === 0) {
      activateAlert("There are no items in favorite collection", "yellow");
      return;
    }
    redirect("/favorites");
  }

  return (
    <>
    <ModalWindow/>
      <nav className="mx-8 sm:mx-16 lg:mx-[180px] my-[24px] max-w-[1800px]">
        <div className="flex flex-row justify-between">
          <Link to="/" className="font-logo text-4xl">
            APL <span className="text-[#C8815F]">.</span>
          </Link>
          <div className="hidden md:flex flex-row justify-between items-center w-[270px]">
            <Link
              to={"/"}
              className="px-2 font-medium border-b-transparent border-b-2 hover:border-b-black cursor-pointer"
            >
              Home
            </Link>
            <Link
              to={"/shop"}
              className="px-2 font-medium border-b-transparent border-b-2 hover:border-b-black"
            >
              Shop
            </Link>
            <Link
              to={"#about"}
              className="px-2 font-medium border-b-transparent border-b-2 hover:border-b-black"
            >
              About
            </Link>
          </div>
          <div className="flex flex-row justify-between w-[120px] sm:w-[150px] cursor-pointer">
            <div
              onClick={toggleAcc}
              className="flex justify-center items-center relative"
            >
              <img
                src={accountIcon}
                className="sm:w-[35px] w-[30px] h-[30px] sm:h-[35px] mt-[8px]"
                alt="Account Icon"
              />
              <AccountDropdown
                isOpen={isAccountOpen}
                currentUser={currentUser}
                logout={onLogoutHandler}
                username={username}
              />
            </div>
            <div
              onClick={onFavoriteHandler}
              className="flex justify-center items-center cursor-pointer"
            >
              <img
                src={favoriteIcon}
                className="w-[23px] sm:w-[27px] h-[23px] sm:h-[27px]"
                alt="Favorite Icon"
              />
            </div>
            <CartIcon />
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
}
