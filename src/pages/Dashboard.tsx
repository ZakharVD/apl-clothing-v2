import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { useModal } from "../hooks/useModal";
import { useUsername } from "../hooks/useUserName";
import { signOutUser, deleteUserAccount } from "../utils/firebase/userData";
import { useAlert } from "../hooks/useAlert";
import { useLoading } from "../hooks/useLoading";

export default function Dashboard() {
  const redirect = useNavigate();
  const { currentUser } = useCurrentUser();
  const { activateModal, deactivateModal } = useModal();
  const username = useUsername();
  const { activateAlert } = useAlert();
  const { setLoading } = useLoading();

  useEffect(() => {
    if (currentUser === null) {
      redirect("/");
    }
  }, [currentUser, redirect]);

  function deleteAuthUser() {
    if (currentUser !== null) {
      try {
        setLoading(true);
        deleteUserAccount();
        redirect("/");
        setLoading(false);
        activateAlert("Account have been deleted", "green");
        deactivateModal();
      } catch {
        setLoading(false);
        activateAlert("An unexpected error has occured", "red");
      }
    }
  }

  function logoutUser() {
    try {
      setLoading(true);
      signOutUser();
      redirect("/");
      setLoading(false);
      activateAlert("User logged out successfully", "green");
      deactivateModal();
    } catch {
      setLoading(false);
      activateAlert("An unexpected error has occured", "red");
    }
  }

  function onDeleteHandler() {
    activateModal(
      "Are you sure you want to delete your account? This action is permanent.",
      deleteAuthUser
    );
  }

  function onLogoutHandler() {
    activateModal("Are you sure you want to logout?", logoutUser);
  }

  return (
    <>
      <section>
        <div className="centeredDiv border-[1px] shadow-md w-[90%] max-w-[400px] h-[600px] mx-auto p-3 rounded-xl flex flex-col">
          <div className="h-[20%] flex flex-col justify-center items-start px-6 bg-slate-200 border-[1px] rounded-lg mb-1">
            <span className="text-[27px] font-light">{username}</span>
            <span className="font-extralight">
              {currentUser !== null && currentUser.email}
            </span>
          </div>
          <div className="flex flex-col h-[80%]">
            <Link
              className="h-1/4 my-1 border-[1px] hover:border-black bg-slate-50 rounded-lg flex justify-center items-center"
              to={"update-email"}
            >
              <span className="text-md font-medium">Update email</span>
            </Link>
            <Link
              className="h-1/4 my-1 border-[1px] bg-slate-50 hover:border-black rounded-lg flex justify-center items-center"
              to={"update-password"}
            >
              <span className="text-md font-medium">Update password</span>
            </Link>
            <button
              onClick={onLogoutHandler}
              className="h-1/4 my-1 border-[1px] hover:border-black bg-slate-50 rounded-lg text-md font-medium"
            >
              Logout
            </button>
            <button
              className="h-1/4 border-[1px] hover:border-red-500 bg-slate-50 border-red-300 my-1 rounded-lg text-red-400 hover:text-red-500 text-md font-medium"
              onClick={onDeleteHandler}
            >
              Delete account
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
