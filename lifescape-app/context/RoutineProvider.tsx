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

interface daysRoutineType {
  routine: Routine;
  startTime: Date;
  endTime: Date;
}

interface RoutineContextTypes {
  routines: daysRoutineType[];
  setRoutines: React.Dispatch<React.SetStateAction<daysRoutineType[]>>;
  routineCreationOpen: boolean;
  setRoutineCreationOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultState = {
  routines: [],
  setRoutines: () => {},
  routineCreationOpen: false,
  setRoutineCreationOpen: () => {},
};

const RoutineContext = createContext<RoutineContextTypes>(defaultState);
export const useRoutineContext = () => useContext(RoutineContext);

const RoutineProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [routines, setRoutines] = useState<daysRoutineType[]>(defaultState.routines);
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
          const updatedRoutines = routines.map((routine: Routine) => {
            const startTime = new Date();
            startTime.setHours(Math.floor(routine.startTimeOfDayInMinutes / 60));
            startTime.setMinutes(routine.startTimeOfDayInMinutes % 60);
            startTime.setSeconds(0);
            startTime.setMilliseconds(0);

            const endTime = new Date();
            endTime.setHours(Math.floor(routine.endTimeOfDayInMinutes / 60));
            endTime.setMinutes(routine.endTimeOfDayInMinutes % 60);
            endTime.setSeconds(0);
            endTime.setMilliseconds(0);

            return {
              routine,
              startTime,
              endTime,
            };
          });
          setRoutines(updatedRoutines);
          console.log(updatedRoutines);
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
        routines,
        setRoutines,
        routineCreationOpen,
        setRoutineCreationOpen,
      }}
    >
      {children}
    </RoutineContext.Provider>
  );
};

export default RoutineProvider;
