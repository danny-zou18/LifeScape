import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { isAxiosError } from "axios";
import api from "@/api/axios";

import { useGlobalContext } from "./GlobalProvider";

import { Habit } from "@/types/db_types";

interface HabitContextTypes {
  habits: Habit[];
  setHabits: React.Dispatch<React.SetStateAction<Habit[]>>;
  habitCreationOpen: boolean;
  setHabitCreationOpen: React.Dispatch<React.SetStateAction<boolean>>;
  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
}

const defaultState = {
  habits: [],
  setHabits: () => {},
  habitCreationOpen: false,
  setHabitCreationOpen: () => {},
  sortBy: "",
  setSortBy: () => {},
};

const HabitContext = createContext<HabitContextTypes>(defaultState);
export const useHabitContext = () => useContext(HabitContext);

const HabitProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [habits, setHabits] = useState<Habit[]>(defaultState.habits);
  const [habitCreationOpen, setHabitCreationOpen] = useState<boolean>(
    defaultState.habitCreationOpen
  );
  const [sortBy, setSortBy] = useState<string>(defaultState.sortBy);

  const { user, userCharacter } = useGlobalContext();

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const response = await api.get(
          `/habits/get/${user.uid}/${userCharacter.id}`,
          {
            headers: {
              Authorization: await user.getIdToken(),
            },
          }
        );
        if (response.status === 200) {
          setHabits(response.data);
          console.log(response.data);
        }
      } catch (error) {
        if (isAxiosError(error)) {
          console.log(error.response?.data);
        } else {
          console.log(error);
        }
      }
    };

    fetchHabits();
  }, [user, userCharacter]);

  return (
    <HabitContext.Provider
      value={{
        habits,
        setHabits,
        habitCreationOpen,
        setHabitCreationOpen,
        sortBy,
        setSortBy,
      }}
    >
      {children}
    </HabitContext.Provider>
  );
};

export default HabitProvider;
