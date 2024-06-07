import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "@/FirebaseConfig";

interface GlobalContextTypes {
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultState = {
  loggedIn: false,
  setLoggedIn: () => {},
  user: null,
  setUser: () => {},
  isLoading: false,
  setIsLoading: () => {},
};

const GlobalContext = createContext<GlobalContextTypes>(defaultState);
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log(user);
    });
  }, []);

  return (
    <GlobalContext.Provider
      value={{ loggedIn, setLoggedIn, user, setUser, isLoading, setIsLoading }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;