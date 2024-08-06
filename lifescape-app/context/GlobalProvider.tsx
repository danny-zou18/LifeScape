import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { isAxiosError } from "axios";
import api from "@/api/axios";
import * as SplashScreen from "expo-splash-screen";

import { useRouter } from "expo-router";

import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "@/FirebaseConfig";

import { User, Character } from "@/types/db_types";

interface GlobalContextTypes {
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  psqlUser: User | null;
  setPsqlUser: React.Dispatch<React.SetStateAction<User | null>>;
  userCharacter: Character | null;
  setUserCharacter: React.Dispatch<React.SetStateAction<Character | null>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultState = {
  loggedIn: false,
  setLoggedIn: () => {},
  user: null,
  setUser: () => {},
  psqlUser: null,
  setPsqlUser: () => {},
  userCharacter: null,
  setUserCharacter: () => {},
  isLoading: false,
  setIsLoading: () => {},
};

const GlobalContext = createContext<GlobalContextTypes>(defaultState);
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(defaultState.loggedIn);
  const [user, setUser] = useState<any>(defaultState.user);
  const [psqlUser, setPsqlUser] = useState<User | null>(defaultState.psqlUser);
  const [userCharacter, setUserCharacter] = useState<Character | null>(
    defaultState.userCharacter,
  );
  const [isLoading, setIsLoading] = useState<boolean>(defaultState.isLoading);

  const router = useRouter();

  useEffect(() => {
    console.log("Setting up onAuthStateChanged listener");
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, async (user) => {
      if (user) {
        setLoggedIn(true);
        setUser(user);
        try {
          const response = await api.get(`/character/get/${user.uid}`, {
            headers: {
              Authorization: await user.getIdToken(),
            },
          });
          if (response.status === 200) {
            setUserCharacter(response.data);
          }
        } catch (error) {
          if (isAxiosError(error)) {
            // AxiosError type will have a response property
            console.log(error.response?.data);
          } else {
            // Handle other error types if needed
            console.log(error);
          }
        }
        try {
          const response = await api.get(`/auth/${user.uid}`, {
            headers: {
              Authorization: await user.getIdToken(),
            },
          });
          if (response.status === 200) {
            setPsqlUser(response.data.user);
          }
        } catch (error) {
          if (isAxiosError(error)) {
            // AxiosError type will have a response property
            console.log(error.response?.data);
          } else {
            // Handle other error types if needed
            console.log(error);
          }
        }
        router.replace("home");
        if (user) {
          SplashScreen.hideAsync();
        }
      } else {
        console.log("User logged out");
        setLoggedIn(false);
        setUser(null);
        setUserCharacter(null);
        setPsqlUser(null);
        SplashScreen.hideAsync();
      }
    });

    // Cleanup subscription on unmount
    return () => {
      console.log("Cleaning up onAuthStateChanged listener");
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        loggedIn,
        setLoggedIn,
        user,
        setUser,
        userCharacter,
        psqlUser,
        setPsqlUser,
        setUserCharacter,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
