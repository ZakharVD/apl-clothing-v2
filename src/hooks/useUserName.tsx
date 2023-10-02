import { useEffect, useState } from "react";
import { useCurrentUser } from "./useCurrentUser";
import { getUserName } from "../utils/firebase/userData";

export function useUsername() {
  const [username, setUsername] = useState("");
  const { currentUser } = useCurrentUser();

  useEffect(() => {
    async function fetchData() {
      if (currentUser === null) {
        return null;
      }
      const userName = await getUserName(currentUser.uid);
      return setUsername(userName?.username);
    }
    
    fetchData();
  }, [currentUser]);

  return username;
}
