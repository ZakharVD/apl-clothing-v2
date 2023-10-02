import { auth, database } from "./firebaseConfig";
import {
  NextOrObserver,
  User,
  createUserWithEmailAndPassword,
  deleteUser,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { QueryDocumentSnapshot, doc, getDoc, setDoc } from "firebase/firestore";
import { TUserData } from "../../types/user.types";

export type TAdditionalInfo = {
  username?: string;
};

// function to sign in user
export async function signInUserWithEmailAndPassword(
  email: string,
  password: string
) {
  if (!email || !password) {
    throw new Error("Email or Password fiels can not be empty");
  }
  return await signInWithEmailAndPassword(auth, email, password);
}

// creating new user
export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

// create user document inside database
export const createUserDocumentFromAuth = async (
  user: User,
  additionalInfo = {} as TAdditionalInfo
): Promise<void | QueryDocumentSnapshot<TUserData>> => {
  if (!user) return;

  const userDocRef = doc(database, "users", user.uid);
  const userInfo = await getDoc(userDocRef);

  if (!userInfo.exists()) {
    // creating a document for new user
    const { email } = user;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        email,
        createdAt,
        ...additionalInfo,
      });
    } catch (error) {
      console.log("error creating user", error);
    }
  }
  return userInfo as QueryDocumentSnapshot<TUserData>;
};

// function to sign out user
export const signOutUser = async () => {
  return await signOut(auth);
};

// function to delete user
export async function deleteUserAccount() {
  if (auth.currentUser !== null) {
    return await deleteUser(auth.currentUser);
  }
}

// function to reset password
export const triggerResetEmail = async (email: string) => {
  await sendPasswordResetEmail(auth, email);
};

// listener to check if user sign out or not
export const onAuthStateChangedListener = (callback: NextOrObserver<User>) => {
  onAuthStateChanged(auth, callback);
};

// function to get user name from the database
export async function getUserName(uid: string) {
  const docRef = doc(database, "users", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such document!");
  }
}
