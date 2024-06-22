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

import { Task } from "@/types/db_types";

interface TaskContextTypes {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  taskCreationOpen: boolean;
  setTaskCreationOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultState = {
  tasks: [],
  setTasks: () => {},
  taskCreationOpen: false,
  setTaskCreationOpen: () => {},
};

const TaskContext = createContext<TaskContextTypes>(defaultState);
export const useTaskContext = () => useContext(TaskContext);

const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>(defaultState.tasks);
  const [taskCreationOpen, setTaskCreationOpen] = useState<boolean>(
    defaultState.taskCreationOpen
  );

  const { user, userCharacter } = useGlobalContext();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get(
          `/tasks/get/${user.uid}/${userCharacter.id}`,
          {
            headers: {
              Authorization: await user.getIdToken(),
            },
          }
        );
        if (response.status === 200) {
          setTasks(response.data);
        }
      } catch (error) {
        if (isAxiosError(error)) {
          console.log(error.response?.data);
        } else {
          console.log(error);
        }
      }
    };
    fetchTasks();
  }, [user, userCharacter]);

  return (
    <TaskContext.Provider
      value={{ tasks, setTasks, taskCreationOpen, setTaskCreationOpen }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;
