import { useContext } from "react";
import { UserContext } from "../store/User.context";

export function useCurrentUser() {
  const currentUser = useContext(UserContext);
  if (!currentUser) {
    throw new Error("user context not awailable");
  }
  return currentUser;
}
