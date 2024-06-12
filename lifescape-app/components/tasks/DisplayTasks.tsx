import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";

import IndividualTasks from "./IndividualTasks";
import { Task } from "@/types/db_types";

import { useGlobalContext } from "@/context/GlobalProvider";

const DisplayTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
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
  }, []);

  return (
    <View>
      <Text>DisplayTasks</Text>
      {tasks.map((task) => (
        <IndividualTasks task={task} />
      ))}
    </View>
  );
};

export default DisplayTasks;
