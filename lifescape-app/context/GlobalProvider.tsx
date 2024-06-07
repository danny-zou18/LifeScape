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
  const [loggedIn, setLoggedIn] = useState<boolean>(defaultState.loggedIn);
  const [user, setUser] = useState<any>(defaultState.user);
  const [isLoading, setIsLoading] = useState<boolean>(defaultState.isLoading);

  useEffect(() => {
    console.log('Setting up onAuthStateChanged listener');
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        console.log('User logged in:', user);
        setLoggedIn(true);
        setUser(user);
      } else {
        console.log('User logged out');
        setLoggedIn(false);
        setUser(null);
      }
    });

    // Cleanup subscription on unmount
    return () => {
      console.log('Cleaning up onAuthStateChanged listener');
      unsubscribe();
    };
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