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
}

const TaskEditModal: React.FC<TaskEditModalProps> = ({ task }) => {
  const {
    tasks,
    setTasks,
    editTaskOpen,
    setEditTaskOpen,
    currentEditTask,
    setCurrentEditTask,
  } = useTaskContext();

  const [loading, setLoading] = useState<boolean>(false);
  const { user, userCharacter } = useGlobalContext();

  const [date, setDate] = useState(roundToNextHour(new Date()));
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  const [difficultyRank, setDifficultyRank] = useState<DifficultyRank>(
    DifficultyRank.E
  );

  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (selectedDate) {
      setValue("dueDate", selectedDate);
      setDate(selectedDate);
    }
  };

  const {
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      description: "",
      dueDate: new Date(),
    },
  });

  const onCancel = () => {
    setCurrentEditTask(null);
  };

  useEffect(() => {
    if (currentEditTask) {
      if (currentEditTask.dueDate) {
        setDate(new Date(currentEditTask.dueDate));
        setShowDatePicker(true);
        setValue("dueDate", new Date(currentEditTask.dueDate));
      }
      setDifficultyRank(currentEditTask.difficultyRank);
      setValue("title", currentEditTask.title);
      setValue("description", currentEditTask.description);
    } else {
      setEditTaskOpen(false);
      setShowDatePicker(false);
      setDifficultyRank(DifficultyRank.E);
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentEditTask]);

  return (
    <Modal
      animationType="slide"
      visible={editTaskOpen}
      onRequestClose={() => {
        setEditTaskOpen(false);
      }}
    >
      <SafeAreaView>
        <View className="flex flex-row">
          <Button title="Cancel" onPress={() => onCancel()}></Button>
        </View>
        <ScrollView className="h-full">
          <View className="flex items-center justify-center mt-5">
            <View className="w-[85%]">
              <Text className="ml-2 text-md text-neutral-700 pb-1">Title</Text>
              <TextInput
                id="title"
                autoCapitalize="none"
                onChangeText={(text) => setValue("title", text)}
                autoComplete="name"
                className="w-full h-[50px] bg-black rounded-lg text-white px-3"
              />
            </View>
            <View className="mt-5 w-[85%]">
              <Text className="ml-2 text-md text-neutral-700 pb-1">Notes</Text>
              <TextInput
                id="description"
                autoCapitalize="none"
                onChangeText={(text) => setValue("description", text)}
                autoComplete="name"
                className="w-full h-[50px] bg-black rounded-lg text-white px-3"
                numberOfLines={2}
              />
            </View>
            <View className="mt-5 flex w-[85%]">
              <Text className="ml-2 text-md text-neutral-700 pb-1">
                Due Date
              </Text>
              <View className="w-full h-[50px] bg-black rounded-lg text-white px-3 flex flex-row justify-center items-center">
                {showDatePicker ? (
                  <View className="flex flex-row justify-center items-center">
                    <DateTimePicker
                      id="dueDate"
                      value={date}
                      mode="date"
                      display="default"
                      onChange={onDateChange}
                      minimumDate={new Date()}
                    />
                    <DateTimePicker
                      id="dueDate"
                      value={date}
                      mode="time"
                      display="default"
                      onChange={onDateChange}
                      minimumDate={new Date()}
                    />
                  </View>
                ) : (
                  <View>
                    <TouchableHighlight
                      className="bg-[#000000] w-[225px]  rounded-md "
                      underlayColor="#FFFFFF"
                      onPress={() => setShowDatePicker(true)}
                    >
                      <Text className="text-white text-xl font-semibold mx-auto my-auto">
                        Select Date
                      </Text>
                    </TouchableHighlight>
                  </View>
                )}
              </View>
            </View>
            <DifficultySelection
              difficulty={difficultyRank}
              setDifficulty={setDifficultyRank}
            />

            {loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <>
                <TouchableHighlight
                  className="bg-[#000000] w-[225px] h-[45px] rounded-md mt-10"
                  underlayColor="#FFFFFF"
                  onPress={handleSubmit(submitHandler)}
                >
                  <Text className="text-white text-xl font-semibold mx-auto my-auto">
                    Create Task
                  </Text>
                </TouchableHighlight>
              </>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

export default TaskEditModal;
