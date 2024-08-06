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
import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { isAxiosError } from "axios";
import api from "@/api/axios";
import { DifficultyRank } from "@/types/db_types";

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

const TaskCreationModal: React.FC = () => {
  const { tasks, setTasks, taskCreationOpen, setTaskCreationOpen, setSortBy } =
    useTaskContext();

  const [loading, setLoading] = useState<boolean>(false);
  const { user, userCharacter } = useGlobalContext();

  const [date, setDate] = useState(roundToNextHour(new Date()));
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  const [difficultyRank, setDifficultyRank] = useState<DifficultyRank>(
    DifficultyRank.E,
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

  const submitHandler = async ({
    title,
    description,
    dueDate,
  }: FieldValues) => {
    setLoading(true);

    if (!showDatePicker) {
      dueDate = null;
    }

    try {
      const response = await api.post(
        `/tasks/create/${user.uid}/${userCharacter?.id}`,
        { title, description, dueDate, difficultyRank },
        {
          headers: {
            Authorization: await user.getIdToken(),
          },
        },
      );
      if (response.status === 201) {
        console.log("Task created successfully");
        setTasks([...tasks, response.data]);
        setTaskCreationOpen(false);
        setShowDatePicker(false);
        setDifficultyRank(DifficultyRank.E);
        setSortBy("");
        reset();
      }
    } catch (error) {
      if (isAxiosError(error)) {
        // AxiosError type will have a response property
        console.log(error.response?.data);
      } else {
        // Handle other error types if needed
        console.log(error);
      }
    } finally {
      setLoading(false);
    }
  };

  const onCancel = () => {
    setTaskCreationOpen(false);
    setShowDatePicker(false);
    setDifficultyRank(DifficultyRank.E);
    reset();
  };

  return (
    <Modal
      animationType="slide"
      visible={taskCreationOpen}
      onRequestClose={onCancel}
    >
      <SafeAreaView>
        <View className="flex flex-row">
          <Button title="Cancel" onPress={() => onCancel()}></Button>
        </View>
        <ScrollView className="h-full">
          <View className="mt-5 flex items-center justify-center">
            <View className="w-[85%]">
              <Text className="text-md ml-2 pb-1 text-neutral-700">Title</Text>
              <TextInput
                id="title"
                autoCapitalize="none"
                onChangeText={(text) => setValue("title", text)}
                autoComplete="name"
                className="h-[50px] w-full rounded-lg bg-black px-3 text-white"
              />
            </View>
            <View className="mt-5 w-[85%]">
              <Text className="text-md ml-2 pb-1 text-neutral-700">Notes</Text>
              <TextInput
                id="description"
                autoCapitalize="none"
                onChangeText={(text) => setValue("description", text)}
                autoComplete="name"
                className="h-[50px] w-full rounded-lg bg-black px-3 text-white"
                numberOfLines={2}
              />
            </View>
            <View className="mt-5 flex w-[85%]">
              <Text className="text-md ml-2 pb-1 text-neutral-700">
                Due Date
              </Text>
              <View className="flex h-[50px] w-full flex-row items-center justify-center rounded-lg bg-black px-3 text-white">
                {showDatePicker ? (
                  <View className="flex flex-row items-center justify-center">
                    <DateTimePicker
                      id="dueDate"
                      value={date}
                      mode="date"
                      display="default"
                      onChange={onDateChange}
                      minimumDate={new Date()}
                      minuteInterval={5}
                    />
                    <DateTimePicker
                      id="dueDate"
                      value={date}
                      mode="time"
                      display="default"
                      onChange={onDateChange}
                      minimumDate={new Date()}
                      minuteInterval={5}
                    />
                  </View>
                ) : (
                  <View>
                    <TouchableHighlight
                      className="w-[225px] rounded-md  bg-[#000000] "
                      underlayColor="#FFFFFF"
                      onPress={() => setShowDatePicker(true)}
                    >
                      <Text className="mx-auto my-auto text-xl font-semibold text-white">
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
                  className="mt-10 h-[45px] w-[225px] rounded-md bg-[#000000]"
                  underlayColor="#FFFFFF"
                  onPress={handleSubmit(submitHandler)}
                >
                  <Text className="mx-auto my-auto text-xl font-semibold text-white">
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

export default TaskCreationModal;
