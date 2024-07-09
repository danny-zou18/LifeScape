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

import { Routine } from "@/types/db_types";

export interface daysRoutineType {
  routine: Routine;
  startDate: Date;
  endDate: Date;
}

interface RoutineContextTypes {
  todaysRoutine: daysRoutineType[];
  setTodaysRoutine: React.Dispatch<React.SetStateAction<daysRoutineType[]>>;
  routineCreationOpen: boolean;
  setRoutineCreationOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultState = {
  todaysRoutine: [],
  setTodaysRoutine: () => {},
  routineCreationOpen: false,
  setRoutineCreationOpen: () => {},
};

const RoutineContext = createContext<RoutineContextTypes>(defaultState);
export const useRoutineContext = () => useContext(RoutineContext);

const RoutineProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [todaysRoutine, setTodaysRoutine] = useState<daysRoutineType[]>(defaultState.todaysRoutine);
  const [routineCreationOpen, setRoutineCreationOpen] = useState<boolean>(
    defaultState.routineCreationOpen
  );

  const { user, userCharacter } = useGlobalContext();

  useEffect(() => {
    const fetchRoutines = async () => {
      try {
        const response = await api.get(
          `/routine/get/${user.uid}/${userCharacter.id}`,
          {
            headers: {
              Authorization: await user.getIdToken(),
            },
          }
        );
        if (response.status === 200) {
          const routines = response.data;
          const updatedRoutine = routines.map((routine: Routine) => {
            const startDate = new Date();
            startDate.setHours(Math.floor(routine.startTimeOfDayInMinutes / 60));
            startDate.setMinutes(routine.startTimeOfDayInMinutes % 60);
            startDate.setSeconds(0);
            startDate.setMilliseconds(0);

            const endDate = new Date();
            endDate.setHours(Math.floor(routine.endTimeOfDayInMinutes / 60));
            endDate.setMinutes(routine.endTimeOfDayInMinutes % 60);
            endDate.setSeconds(0);
            endDate.setMilliseconds(0);

            return {
              routine,
              startDate,
              endDate,
            };
          });
          setTodaysRoutine(updatedRoutine);
          console.log(updatedRoutine);
        }
      } catch (error) {
        if (isAxiosError(error)) {
          console.log(error.response?.data);
        } else {
          console.log(error);
        }
      }
    };
    fetchRoutines();
  }, [user, userCharacter]);

  return (
    <RoutineContext.Provider
      value={{
        todaysRoutine,
        setTodaysRoutine,
        routineCreationOpen,
        setRoutineCreationOpen,
      }}
    >
      {children}
    </RoutineContext.Provider>
  );
};

export default RoutineProvider;
