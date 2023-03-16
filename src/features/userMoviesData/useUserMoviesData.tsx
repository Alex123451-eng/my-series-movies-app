import { useAppDispatch, useAppSelector } from "../../app/hooks";

import { setUserMoviesData, selectUserMoviesData } from "./userMoviesDataSlice";

import { IUserMoviesData } from "../../types/types";

export const useUserMoviesData = () => {
  const dispatch = useAppDispatch();

  const userMoviesData = useAppSelector(selectUserMoviesData);

  const saveUserMoviesData = (userMoviesData: IUserMoviesData) => {
    dispatch(setUserMoviesData(userMoviesData));
  };

  return { saveUserMoviesData, userMoviesData };
};
