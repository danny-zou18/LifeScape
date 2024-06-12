import { View, Text, TouchableHighlight, Modal } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";

import { useGlobalContext } from "@/context/GlobalProvider";

import CreateTaskBtn from "../tasks/CreateTaskBtn";
import TaskCreationModal from "../tasks/TaskCreationModal";
import DisplayTasks from "../tasks/DisplayTasks";

import { Task } from "@/types/db_types";

const TaskWrapper: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskCreationOpen, setTaskCreationOpen] = useState<boolean>(false);
  const { user, userCharacter } = useGlobalContext();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          `http://128.113.145.204:8000/tasks/get/${user.uid}/${userCharacter.id}`,
          {
            headers: {
              Authorization: await user.getIdToken(),
            },
          }
        );
        if (response.status === 200) {
          setTasks(response.data);
          console.log(response.data);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error.response?.data);
        } else {
          console.log(error);
        }
      }
    };
    fetchTasks();
  }, [tasks]);

  return (
    <View className="w-[95vw]">
      <TaskCreationModal
        isOpen={taskCreationOpen}
        setOpen={setTaskCreationOpen}
        tasks={tasks}
        setTasks={setTasks}
      />
      <CreateTaskBtn setOpen={setTaskCreationOpen}  />
      <DisplayTasks tasks={tasks}/>
    </View>
  );
};

export default TaskWrapper;
