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

interface RoutineContextTypes {
  routines: Routine[];
  setRoutines: React.Dispatch<React.SetStateAction<Routine[]>>;
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
  const [routines, setRoutines] = useState<Routine[]>(defaultState.routines);
  const [routineCreationOpen, setRoutineCreationOpen] = useState<boolean>(
    defaultState.routineCreationOpen
  );

  const { user, userCharacter } = useGlobalContext();

  // useEffect(() => {
  //   const fetchRoutines = async () => {
  //     try {
  //       const response = await api.get(
  //         `/routines/get/${user.uid}/${userCharacter.id}`,
  //         {
  //           headers: {
  //             Authorization: await user.getIdToken(),
  //           },
  //         }
  //       );
  //       if (response.status === 200) {
  //         setRoutines(response.data);
  //         console.log(response.data);
  //       }
  //     } catch (error) {
  //       if (isAxiosError(error)) {
  //         console.log(error.response?.data);
  //       } else {
  //         console.log(error);
  //       }
  //     }
  //   };
  //   fetchRoutines();
  // }, [user, userCharacter]);

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
