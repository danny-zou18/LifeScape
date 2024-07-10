import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { isAxiosError } from "axios";
import api from "@/api/axios";
import { ICalendarEventBase } from "react-native-big-calendar";

import { useGlobalContext } from "./GlobalProvider";

import { Routine } from "@/types/db_types";

export interface CustomEventType extends ICalendarEventBase {
  routine: Routine;
}

interface RoutineContextTypes {
  todaysRoutine: CustomEventType[];
  setTodaysRoutine: React.Dispatch<React.SetStateAction<CustomEventType[]>>;
  routineCreationOpen: boolean;
  setRoutineCreationOpen: React.Dispatch<React.SetStateAction<boolean>>;
  currentEditRoutine: Routine | null;
  setCurrentEditRoutine: React.Dispatch<React.SetStateAction<Routine | null>>;
  editRoutineOpen: boolean;
  setEditRoutineOpen: React.Dispatch<React.SetStateAction<boolean>>;
  weeklyRoutine: CustomEventType[],
  setWeeklyRoutine: React.Dispatch<React.SetStateAction<CustomEventType[]>>,
  viewWeeklyRoutineOpen: boolean;
  setViewWeeklyRoutineOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultState = {
  todaysRoutine: [],
  setTodaysRoutine: () => {},
  routineCreationOpen: false,
  setRoutineCreationOpen: () => {},
  currentEditRoutine: null,
  setCurrentEditRoutine: () => {},
  editRoutineOpen: false,
  setEditRoutineOpen: () => {},
  weeklyRoutine: [],
  setWeeklyRoutine: () => {},
  viewWeeklyRoutineOpen: false,
  setViewWeeklyRoutineOpen: () => {},
};

const RoutineContext = createContext<RoutineContextTypes>(defaultState);
export const useRoutineContext = () => useContext(RoutineContext);

const RoutineProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [todaysRoutine, setTodaysRoutine] = useState<CustomEventType[]>(
    defaultState.todaysRoutine
  );
  const [routineCreationOpen, setRoutineCreationOpen] = useState<boolean>(
    defaultState.routineCreationOpen
  );
  const [currentEditRoutine, setCurrentEditRoutine] = useState<Routine | null>(
    defaultState.currentEditRoutine
  );
  const [editRoutineOpen, setEditRoutineOpen] = useState<boolean>(
    defaultState.editRoutineOpen
  );
  const [weeklyRoutine, setWeeklyRoutine] = useState<CustomEventType[]>(
    defaultState.weeklyRoutine
  );
  const [viewWeeklyRoutineOpen, setViewWeeklyRoutineOpen] = useState<boolean>(
    defaultState.viewWeeklyRoutineOpen
  );

  const { user, userCharacter } = useGlobalContext();

  useEffect(() => {
    const fetchRoutines = async () => {
      try {
        const response = await api.get(
          `/routine/getDay/${user.uid}/${userCharacter.id}`,
          {
            headers: {
              Authorization: await user.getIdToken(),
            },
          }
        );
        if (response.status === 200) {
          const routines = response.data;
          const updatedRoutine: CustomEventType[] = routines.map(
            (routine: Routine) => {
              const start = new Date();
              start.setHours(Math.floor(routine.startTimeOfDayInMinutes / 60));
              start.setMinutes(routine.startTimeOfDayInMinutes % 60);
              start.setSeconds(0);
              start.setMilliseconds(0);

              const end = new Date();
              end.setHours(Math.floor(routine.endTimeOfDayInMinutes / 60));
              end.setMinutes(routine.endTimeOfDayInMinutes % 60);
              end.setSeconds(0);
              end.setMilliseconds(0);

              return {
                routine,
                start,
                end,
                title: routine.title,
              };
            }
          );
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
        currentEditRoutine,
        setCurrentEditRoutine,
        editRoutineOpen,
        setEditRoutineOpen,
        weeklyRoutine,
        setWeeklyRoutine,
        viewWeeklyRoutineOpen,
        setViewWeeklyRoutineOpen,
      }}
    >
      {children}
    </RoutineContext.Provider>
  );
};

export default RoutineProvider;
