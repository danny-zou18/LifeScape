import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {isAxiosError} from "axios";
import api from "@/api/axios";

import { useRouter } from "expo-router";

import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "@/FirebaseConfig";

interface GlobalContextTypes {
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  userCharacter: any;
  setUserCharacter: React.Dispatch<React.SetStateAction<any>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultState = {
  loggedIn: false,
  setLoggedIn: () => {},
  user: null,
  setUser: () => {},
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
  const [userCharacter, setUserCharacter] = useState<any>(
    defaultState.userCharacter
  );
  const [isLoading, setIsLoading] = useState<boolean>(defaultState.isLoading);

  const router = useRouter();

  useEffect(() => {
    console.log("Setting up onAuthStateChanged listener");
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, async (user) => {
      if (user) {
        console.log("User logged in:", user);
        setLoggedIn(true);
        setUser(user);
        try {
          const response = await api.get(
            `/character/get/${user.uid}`,
            {
              headers: {
                Authorization: await user.getIdToken(),
              },
            }
          );
          if (response.status === 200) {
            setUserCharacter(response.data);
            console.log("Character fetched: ", response.data);
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
      } else {
        console.log("User logged out");
        setLoggedIn(false);
        setUser(null);
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
