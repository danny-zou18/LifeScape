import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";

import { Task } from "@/types/db_types";
import IndividualTasks from "./IndividualTasks";

import { useGlobalContext } from "@/context/GlobalProvider";

const DisplayTasks = ({ tasks }: { tasks: Task[] }) => {
  const { user, userCharacter } = useGlobalContext();

  return (
    <View>
      <Text>DisplayTasks</Text>
      {tasks.map((task, index) => (
        <IndividualTasks task={task} key={index} />
      ))}
    </View>
  );
};

export default DisplayTasks;
