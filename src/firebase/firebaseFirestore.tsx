import { doc, setDoc, collection, getDocs } from "firebase/firestore";

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
  } catch (err) {
    console.error("Error adding document: ", err);
  }
};

export const initEntityWithFirebaseData = async (
  firebaseCollection: string,
  id?: string
) => {
  // todo починить any
  try {
    const initialArray: any[] = [];
    const querySnapshot = await getDocs(collection(db, firebaseCollection));
    querySnapshot.forEach((doc) => {
      initialArray.push(doc.data());
    });

    if (id) {
      return initialArray.find((entity) => entity.id === id);
    }

    return initialArray;
  } catch (err) {
    console.log("Initialization went wrong: ", err);
  }
};
