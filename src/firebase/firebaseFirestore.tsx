import {
  doc,
  setDoc,
  collection,
  getDocs,
  deleteDoc,
} from "firebase/firestore";

import { db } from "./firebaseInit";

import { firebaseCollection } from "../constants/constants";

import { IMovie } from "../types/types";

export const addDataToFirebase = async (movieData: IMovie) => {
  try {
    await setDoc(doc(db, firebaseCollection, movieData.id), movieData);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const deleteFirebaseData = async (docId: string) => {
  await deleteDoc(doc(db, firebaseCollection, docId));
};

export const initMoviesWithFirebaseData = async () => {
  // todo переделать any
  const initialMovieArray: any[] = [];
  const querySnapshot = await getDocs(collection(db, firebaseCollection));
  querySnapshot.forEach((doc) => {
    initialMovieArray.push(doc.data());
  });
  return initialMovieArray;
};
