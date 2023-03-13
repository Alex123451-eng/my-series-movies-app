import {
  doc,
  setDoc,
  collection,
  getDocs,
  deleteDoc,
} from "firebase/firestore";

import { db } from "./firebaseInit";
import {
  firebaseMoviesCollection,
  firebaseUsersCollection,
} from "../constants/constants";

import { IMovie, IUser } from "../types/types";

export const addDataToFirebase = async (
  data: IMovie | IUser,
  firebaseCollection: string
) => {
  try {
    if (data.id) {
      await setDoc(doc(db, firebaseCollection, data.id), data);
    }
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const deleteFirebaseData = async (
  docId: string,
  firebaseCollection: string
) => {
  await deleteDoc(doc(db, firebaseCollection, docId));
};

export const initMoviesWithFirebaseData = async () => {
  // todo переделать any
  const initialMovieArray: any[] = [];
  const querySnapshot = await getDocs(collection(db, firebaseMoviesCollection));
  querySnapshot.forEach((doc) => {
    initialMovieArray.push(doc.data());
  });
  return initialMovieArray;
};

export const initUserWithFirebaseData = async (id: string | null) => {
  // todo переделать any
  const initialUsersArray: any[] = [];
  const querySnapshot = await getDocs(collection(db, firebaseUsersCollection));
  querySnapshot.forEach((doc) => {
    initialUsersArray.push(doc.data());
  });
  return initialUsersArray.find((user) => user.id === id);
};
