import {
  View,
  Text,
  Modal,
  TouchableHighlight,
  Button,
  SafeAreaView,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { isAxiosError } from "axios";
import api from "@/api/axios";
import { DifficultyRank, Task } from "@/types/db_types";

import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

import { useTaskContext } from "@/context/TaskProvider";
import { useGlobalContext } from "@/context/GlobalProvider";

import DifficultySelection from "../general/DifficultySelection";

const roundToNextHour = (date: Date): Date => {
  const roundedDate = new Date(date);
  roundedDate.setMinutes(0);
  roundedDate.setSeconds(0);
  roundedDate.setMilliseconds(0);
  roundedDate.setHours(roundedDate.getHours() + 1);
  return roundedDate;
};

interface TaskEditModalProps {
    task: Task;
};

const TaskEditModal:React.FC<TaskEditModalProps> = ({task}) => {
  const { tasks, setTasks, editTaskOpen, setEditTaskOpen } = useTaskContext();

  const [loading, setLoading] = useState<boolean>(false);
  const { user, userCharacter } = useGlobalContext();

  const [date, setDate] = useState(roundToNextHour(new Date()));
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  const [difficultyRank, setDifficultyRank] = useState<DifficultyRank>(
    DifficultyRank.E
  );

  return (
    <View>
      <Text>TaskEditModal</Text>
    </View>
  );
};

export default TaskEditModal;
