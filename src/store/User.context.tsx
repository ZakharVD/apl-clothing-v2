import { ReactNode, createContext, useEffect, useState } from "react";
import { onAuthStateChangedListener } from "../utils/firebase/userData";
import { User } from "firebase/auth";

type UserProviderProps = {
    children: ReactNode,
}

type UserContextProps = {
    currentUser: User | null,
    setCurrentUser: (user: User) => void;
}

export const UserContext = createContext<UserContextProps | null>(null);

export function UserProvider({ children }: UserProviderProps) {
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user: User | null) => {
            setCurrentUser(user);
            console.log("Current user info", user)
        })
        return unsubscribe;
    }, [])
    


    return (
        <UserContext.Provider value={{currentUser, setCurrentUser}}>{children}</UserContext.Provider>
    )
}
