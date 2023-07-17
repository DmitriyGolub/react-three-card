import React, { useState } from "react";
import { UserContext } from "../hooks/useUserState";

export const UserContextProvider = ({ children }: React.PropsWithChildren) => {
  const [login, setLogin] = useState(false);

  return (
    <UserContext.Provider value={{ login, setLogin }}>
      {children}
    </UserContext.Provider>
  );
};
