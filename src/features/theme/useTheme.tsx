import { useAppDispatch, useAppSelector } from "../../app/hooks";

import { setTheme, selectTheme } from "./themeSlice";

export const useTheme = () => {
  const dispatch = useAppDispatch();

  const theme = useAppSelector(selectTheme);

  const saveTheme = () => {
    dispatch(setTheme());
  };

  return { saveTheme, theme };
};
