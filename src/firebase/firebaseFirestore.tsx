import {
  doc,
  setDoc,
  collection,
  getDocs,
  deleteDoc,
} from "firebase/firestore";

import { db } from "./firebaseInit";

import { IMovie, IUser, IUserMoviesData } from "../types/types";

export const addDataToFirebase = async (
  data: IMovie | IUser | IUserMoviesData,
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

export const initEntityWithFirebaseData = async (
  firebaseCollection: string,
  id?: string
) => {
  const initialArray: any[] = [];
  const querySnapshot = await getDocs(collection(db, firebaseCollection));
  querySnapshot.forEach((doc) => {
    initialArray.push(doc.data());
  });

  if (id) {
    return initialArray.find((entity) => entity.id === id);
  }

  return initialArray;
};
