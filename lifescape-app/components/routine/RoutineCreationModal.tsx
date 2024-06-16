import {
  View,
  Text,
  Modal,
  TouchableHighlight,
  Button,
  SafeAreaView,
  ScrollView,
  TextInput,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { isAxiosError } from "axios";
import api from "@/api/axios";

import { useRoutineContext } from "@/context/RoutineProvider";
import { useGlobalContext } from "@/context/GlobalProvider";

import { DifficultyRank } from "@/types/db_types";
import HabitCreationModal from "../habits/HabitCreationModal";

import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

const { width: screenWidth } = Dimensions.get("window");

const RoutineCreationModal = () => {
  const { routines, setRoutines, routineCreationOpen, setRoutineCreationOpen } =
    useRoutineContext();

  const [loading, setLoading] = useState<boolean>(false);
  const { user, userCharacter } = useGlobalContext();

  const [daysOfWeek, setDaysOfWeek] = useState<number[]>([]);
  //   const [startTimeOfDayInMinutes, setStartTimeOfDayInMinutes] =
  //     useState<number>(-1);
  //   const [endTimeOfDayInMinutes, setEndTimeOfDayInMinutes] =
  //     useState<number>(-1);
  const [startTimeOfDay, setStartTimeOfDay] = useState<Date>(
    new Date(0, 0, 0, 0, 0, 0, 0)
  );
  const [endTimeOfDay, setEndTimeOfDay] = useState<Date>(
    new Date(0, 0, 0, 0, 0, 0, 0)
  );
  const [difficulty, setDifficulty] = useState<DifficultyRank>(
    DifficultyRank.E
  );

  const {
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onCancel = () => {
    setRoutineCreationOpen(false);
    reset();
  };

  const BoxWidth = (screenWidth * 81) / 100;

  const calculatedWidth = (BoxWidth * 13.3) / 100;
  return (
    <Modal
      animationType="slide"
      visible={routineCreationOpen}
      onRequestClose={onCancel}
    >
      <SafeAreaView>
        <View className="flex flex-row">
          <Button title="Cancel" onPress={() => onCancel()}></Button>
        </View>
        <ScrollView>
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
                className="h-[50px] bg-black rounded-lg text-white px-3"
                numberOfLines={2}
              />
            </View>
            <View className="mt-5 w-[85%]">
              <Text className="ml-2 text-md text-neutral-700 pb-1">
                Days of Week
              </Text>
              <View className="w-full bg-gray-400 rounded-lg overflow-hidden">
                <View className="flex flex-row justify-between p-1 py-2 w-full">
                  <TouchableHighlight
                    className={`flex items-center justify-center w-[13.3%] bg-${
                      daysOfWeek.includes(1) ? "[#b93df2]" : "[#e1abf740]"
                    } rounded-full`}
                    style={{ height: calculatedWidth }}
                    onPress={() =>
                      setDaysOfWeek(
                        daysOfWeek.includes(1)
                          ? daysOfWeek.filter((day) => day !== 1)
                          : [...daysOfWeek, 1]
                      )
                    }
                    underlayColor="#b93df200"
                  >
                    <Text>Sun</Text>
                  </TouchableHighlight>
                  <TouchableHighlight
                    className={`flex items-center justify-center w-[13.3%] bg-${
                      daysOfWeek.includes(2) ? "[#b93df2]" : "[#e1abf740]"
                    } rounded-full`}
                    style={{ height: calculatedWidth }}
                    onPress={() =>
                      setDaysOfWeek(
                        daysOfWeek.includes(2)
                          ? daysOfWeek.filter((day) => day !== 2)
                          : [...daysOfWeek, 2]
                      )
                    }
                    underlayColor="#b93df200"
                  >
                    <Text>M</Text>
                  </TouchableHighlight>
                  <TouchableHighlight
                    className={`flex items-center justify-center w-[13.3%] bg-${
                      daysOfWeek.includes(3) ? "[#b93df2]" : "[#e1abf740]"
                    } rounded-full`}
                    style={{ height: calculatedWidth }}
                    onPress={() =>
                      setDaysOfWeek(
                        daysOfWeek.includes(3)
                          ? daysOfWeek.filter((day) => day !== 3)
                          : [...daysOfWeek, 3]
                      )
                    }
                    underlayColor="#b93df200"
                  >
                    <Text>T</Text>
                  </TouchableHighlight>
                  <TouchableHighlight
                    className={`flex items-center justify-center w-[13.3%] bg-${
                      daysOfWeek.includes(4) ? "[#b93df2]" : "[#e1abf740]"
                    } rounded-full`}
                    style={{ height: calculatedWidth }}
                    onPress={() =>
                      setDaysOfWeek(
                        daysOfWeek.includes(4)
                          ? daysOfWeek.filter((day) => day !== 4)
                          : [...daysOfWeek, 4]
                      )
                    }
                    underlayColor="#b93df200"
                  >
                    <Text>W</Text>
                  </TouchableHighlight>
                  <TouchableHighlight
                    className={`flex items-center justify-center w-[13.3%] bg-${
                      daysOfWeek.includes(5) ? "[#b93df2]" : "[#e1abf740]"
                    } rounded-full`}
                    style={{ height: calculatedWidth }}
                    onPress={() =>
                      setDaysOfWeek(
                        daysOfWeek.includes(5)
                          ? daysOfWeek.filter((day) => day !== 5)
                          : [...daysOfWeek, 5]
                      )
                    }
                    underlayColor="#b93df200"
                  >
                    <Text>T</Text>
                  </TouchableHighlight>
                  <TouchableHighlight
                    className={`flex items-center justify-center w-[13.3%] bg-${
                      daysOfWeek.includes(6) ? "[#b93df2]" : "[#e1abf740]"
                    } rounded-full`}
                    style={{ height: calculatedWidth }}
                    onPress={() =>
                      setDaysOfWeek(
                        daysOfWeek.includes(6)
                          ? daysOfWeek.filter((day) => day !== 6)
                          : [...daysOfWeek, 6]
                      )
                    }
                    underlayColor="#b93df200"
                  >
                    <Text>F</Text>
                  </TouchableHighlight>
                  <TouchableHighlight
                    className={`flex items-center justify-center w-[13.3%] bg-${
                      daysOfWeek.includes(7) ? "[#b93df2]" : "[#e1abf740]"
                    } rounded-full`}
                    style={{ height: calculatedWidth }}
                    onPress={() =>
                      setDaysOfWeek(
                        daysOfWeek.includes(7)
                          ? daysOfWeek.filter((day) => day !== 7)
                          : [...daysOfWeek, 7]
                      )
                    }
                    underlayColor="#b93df200"
                  >
                    <Text>Sat</Text>
                  </TouchableHighlight>
                </View>
                {!(daysOfWeek.length === 0) ? (
                  <View>
                    <View className="bg-red-400 h-[45px] flex flex-row items-center p-2 justify-between border-b-[1px] border-t-[1px]">
                      <Text>Start Time</Text>
                      <DateTimePicker
                        mode="time"
                        display="default"
                        value={startTimeOfDay}
                        maximumDate={endTimeOfDay}
                      />
                    </View>
                    <View className="bg-red-400 h-[45px] flex flex-row items-center p-2 justify-between">
                      <Text>End Time</Text>
                      <DateTimePicker
                        mode="time"
                        display="default"
                        value={endTimeOfDay}
                        minimumDate={startTimeOfDay}
                      />
                    </View>
                  </View>
                ) : null}
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

export default RoutineCreationModal;
