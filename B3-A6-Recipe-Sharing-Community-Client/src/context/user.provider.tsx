"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "../services/AuthService";
import { IUser, IUserProviderValues } from "../types/user.type";
import { TChildren } from "../types/children.type";

const userContext = createContext<IUserProviderValues | undefined>(undefined);

const UserProvider = ({ children }: TChildren) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleUser = async () => {
    const user = await getCurrentUser();
    setUser(user);
    setIsLoading(false);
  };

  useEffect(() => {
    handleUser();
  }, [isLoading]);

  return (
    <userContext.Provider value={{ user, setUser, isLoading, setIsLoading }}>
      {children}
    </userContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(userContext);

  if (context === undefined) {
    throw new Error("context invalid");
  }

  return context;
};

export default UserProvider;
