import React, { useContext } from "react";

interface UserState {
  login: boolean;

  setLogin(login: boolean): void;
}

export const UserContext = React.createContext<UserState>({} as any);
export const useUserState = () => {
  const { login } = useContext(UserContext);
  return { login };
};

export const useUpdateUserState = () => {
  const { setLogin } = useContext(UserContext);
  return { setLogin };
};
