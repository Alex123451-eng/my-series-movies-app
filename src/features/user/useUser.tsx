import { useAppDispatch, useAppSelector } from "../../app/hooks";

import { setUser, selectUser } from "./userSlice";

import { IUser } from "../../types/types";

export const useUser = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectUser);

  const saveUser = (user: IUser) => {
    dispatch(setUser(user));
  };

  return { saveUser, user };
};
