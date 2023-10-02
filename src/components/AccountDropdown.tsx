import { User } from "firebase/auth";
import { Link } from "react-router-dom";

type Props = {
  isOpen: boolean;
  currentUser: User | null;
  logout: () => void;
  username: string | undefined;
};

export default function AccountDropdown({
  isOpen,
  currentUser,
  logout,
  username,
}: Props) {
  return (
    <>
      {isOpen && (
        <div className="absolute flex flex-col top-11 right-[-120px] sm:right-0 bg-white border-[1px] shadow-lg w-[100vw] sm:w-44 max-w-[400px] rounded-xl z-30">
          {currentUser !== null ? (
            <>
              <span className="text-center py-1 px-2 m-2 font-medium border-b-[1px] cursor-default">
                Hello {username}!
              </span>
              <Link
                to={"/dashboard"}
                className="text-center py-1 px-2 m-1 cursor-pointer hover:bg-black hover:rounded-lg hover:text-white"
              >
                My Account
              </Link>
              <span
                onClick={logout}
                className="text-center py-1 px-2 m-1 cursor-pointer hover:bg-black hover:rounded-lg hover:text-white"
              >
                Logout
              </span>
            </>
          ) : (
            <>
              <Link
                to={"/register"}
                className="text-center py-4 sm:py-1 px-2 mx-2 mt-2 mb-1 rounded-lg bg-black hover:bg-stone-800 text-white cursor-pointer"
              >
                Sign Up
              </Link>
              <Link
                to={"/login"}
                className="text-center p-3 sm:py-[2px] mt-1 mb-2 mx-2 border-[1px] border-transparent hover:border-black rounded-lg cursor-pointer"
              >
                Login
              </Link>
            </>
          )}
        </div>
      )}
    </>
  );
}
