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

import { useRoutineContext, CustomEventType } from "@/context/RoutineProvider";
import { useGlobalContext } from "@/context/GlobalProvider";

import { DifficultyRank } from "@/types/db_types";

import DifficultySelection from "../general/DifficultySelection";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

const { width: screenWidth } = Dimensions.get("window");

const timeToMinutes = (time: Date): number => {
  return time.getHours() * 60 + time.getMinutes();
};

const RoutineCreationModal = () => {
  const {
    todaysRoutine,
    setTodaysRoutine,
    weeklyRoutine,
    setWeeklyRoutine,
    routineCreationOpen,
    setRoutineCreationOpen,
  } = useRoutineContext();

  const [loading, setLoading] = useState<boolean>(false);
  const { user, userCharacter } = useGlobalContext();

  const [daysOfWeek, setDaysOfWeek] = useState<number[]>([]);

  const [startTimeOfDay, setStartTimeOfDay] = useState<Date>(
    new Date(0, 0, 0, 0, 0, 0, 0),
  );
  const [endTimeOfDay, setEndTimeOfDay] = useState<Date>(
    new Date(0, 0, 0, 0, 0, 0, 0),
  );
  const [difficulty, setDifficulty] = useState<DifficultyRank>(
    DifficultyRank.E,
  );

  const [showTimeError, setShowTimeError] = useState<boolean>(false);

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

  const submitHandler = async ({ title, description }: FieldValues) => {
    setLoading(true);

    let startTimeOfDayInMinutes: number = timeToMinutes(startTimeOfDay);
    let endTimeOfDayInMinutes: number = timeToMinutes(endTimeOfDay);

    if (endTimeOfDayInMinutes < startTimeOfDayInMinutes) {
      setShowTimeError(true);
      return;
    }

    try {
      const response = await api.post(
        `/routine/create/${user.uid}/${userCharacter?.id}`,
        {
          title,
          description,
          daysOfWeek,
          startTimeOfDayInMinutes,
          endTimeOfDayInMinutes,
          difficulty,
        },
        {
          headers: {
            Authorization: await user.getIdToken(),
          },
        },
      );
      if (response.status === 201) {
        const routine = response.data;
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
        const updatedRoutine: CustomEventType = {
          routine,
          start,
          end,
          title: routine.title,
        };

        if (daysOfWeek.includes(new Date().getDay() + 1)) {
          setTodaysRoutine([...todaysRoutine, updatedRoutine]);
        }

        const updatedRoutineWeekly: CustomEventType[] = [];

        routine.daysOfWeek.forEach((dayOfWeek: number) => {
          const start = new Date();
          const end = new Date();

          // Get the current day of the week (0-6, where 0 is Sunday)
          const currentDayOfWeek = start.getDay() + 1;

          // Calculate the number of days to add or subtract from the current date
          let daysToAdd = currentDayOfWeek - dayOfWeek;

          // Add or subtract the days from the current date to get the appropriate date
          start.setDate(start.getDate() - daysToAdd);
          end.setDate(start.getDate());

          start.setHours(Math.floor(routine.startTimeOfDayInMinutes / 60));
          start.setMinutes(routine.startTimeOfDayInMinutes % 60);
          start.setSeconds(0);
          start.setMilliseconds(0);

          end.setHours(Math.floor(routine.endTimeOfDayInMinutes / 60));
          end.setMinutes(routine.endTimeOfDayInMinutes % 60);
          end.setSeconds(0);
          end.setMilliseconds(0);

          updatedRoutineWeekly.push({
            routine,
            start,
            end,
            title: routine.title,
          });
        });

        setWeeklyRoutine([...weeklyRoutine, ...updatedRoutineWeekly]);

        setRoutineCreationOpen(false);
        reset();
        setDaysOfWeek([]);
        setStartTimeOfDay(new Date(0, 0, 0, 0, 0, 0, 0));
        setEndTimeOfDay(new Date(0, 0, 0, 0, 0, 0, 0));
        setDifficulty(DifficultyRank.E);
      }
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error.response?.data);
      } else {
        console.log(error);
      }
    } finally {
      setLoading(false);
    }
  };

  const onCancel = () => {
    setRoutineCreationOpen(false);
    reset();
    setDaysOfWeek([]);
    setStartTimeOfDay(new Date(0, 0, 0, 0, 0, 0, 0));
    setEndTimeOfDay(new Date(0, 0, 0, 0, 0, 0, 0));
    setDifficulty(DifficultyRank.E);
  };

  const onStartTimeChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date,
  ) => {
    if (selectedDate) {
      setStartTimeOfDay(selectedDate);
    }
  };
  const onEndTimeChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (selectedDate) {
      setEndTimeOfDay(selectedDate);
    }
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
                className="h-[50px] rounded-lg bg-black px-3 text-white"
                numberOfLines={2}
              />
            </View>
            <View className="mt-5 w-[85%]">
              <Text className="text-md ml-2 pb-1 text-neutral-700">
                Days of Week
              </Text>
              <View className="w-full overflow-hidden rounded-lg bg-gray-400">
                <View className="flex w-full flex-row justify-between p-1 py-2">
                  <TouchableHighlight
                    className={`flex w-[13.3%] items-center justify-center bg-${
                      daysOfWeek.includes(1) ? "[#b93df2]" : "[#e1abf740]"
                    } rounded-full`}
                    style={{ height: calculatedWidth }}
                    onPress={() =>
                      setDaysOfWeek(
                        daysOfWeek.includes(1)
                          ? daysOfWeek.filter((day) => day !== 1)
                          : [...daysOfWeek, 1],
                      )
                    }
                    underlayColor="#b93df200"
                  >
                    <Text>Sun</Text>
                  </TouchableHighlight>
                  <TouchableHighlight
                    className={`flex w-[13.3%] items-center justify-center bg-${
                      daysOfWeek.includes(2) ? "[#b93df2]" : "[#e1abf740]"
                    } rounded-full`}
                    style={{ height: calculatedWidth }}
                    onPress={() =>
                      setDaysOfWeek(
                        daysOfWeek.includes(2)
                          ? daysOfWeek.filter((day) => day !== 2)
                          : [...daysOfWeek, 2],
                      )
                    }
                    underlayColor="#b93df200"
                  >
                    <Text>M</Text>
                  </TouchableHighlight>
                  <TouchableHighlight
                    className={`flex w-[13.3%] items-center justify-center bg-${
                      daysOfWeek.includes(3) ? "[#b93df2]" : "[#e1abf740]"
                    } rounded-full`}
                    style={{ height: calculatedWidth }}
                    onPress={() =>
                      setDaysOfWeek(
                        daysOfWeek.includes(3)
                          ? daysOfWeek.filter((day) => day !== 3)
                          : [...daysOfWeek, 3],
                      )
                    }
                    underlayColor="#b93df200"
                  >
                    <Text>T</Text>
                  </TouchableHighlight>
                  <TouchableHighlight
                    className={`flex w-[13.3%] items-center justify-center bg-${
                      daysOfWeek.includes(4) ? "[#b93df2]" : "[#e1abf740]"
                    } rounded-full`}
                    style={{ height: calculatedWidth }}
                    onPress={() =>
                      setDaysOfWeek(
                        daysOfWeek.includes(4)
                          ? daysOfWeek.filter((day) => day !== 4)
                          : [...daysOfWeek, 4],
                      )
                    }
                    underlayColor="#b93df200"
                  >
                    <Text>W</Text>
                  </TouchableHighlight>
                  <TouchableHighlight
                    className={`flex w-[13.3%] items-center justify-center bg-${
                      daysOfWeek.includes(5) ? "[#b93df2]" : "[#e1abf740]"
                    } rounded-full`}
                    style={{ height: calculatedWidth }}
                    onPress={() =>
                      setDaysOfWeek(
                        daysOfWeek.includes(5)
                          ? daysOfWeek.filter((day) => day !== 5)
                          : [...daysOfWeek, 5],
                      )
                    }
                    underlayColor="#b93df200"
                  >
                    <Text>T</Text>
                  </TouchableHighlight>
                  <TouchableHighlight
                    className={`flex w-[13.3%] items-center justify-center bg-${
                      daysOfWeek.includes(6) ? "[#b93df2]" : "[#e1abf740]"
                    } rounded-full`}
                    style={{ height: calculatedWidth }}
                    onPress={() =>
                      setDaysOfWeek(
                        daysOfWeek.includes(6)
                          ? daysOfWeek.filter((day) => day !== 6)
                          : [...daysOfWeek, 6],
                      )
                    }
                    underlayColor="#b93df200"
                  >
                    <Text>F</Text>
                  </TouchableHighlight>
                  <TouchableHighlight
                    className={`flex w-[13.3%] items-center justify-center bg-${
                      daysOfWeek.includes(7) ? "[#b93df2]" : "[#e1abf740]"
                    } rounded-full`}
                    style={{ height: calculatedWidth }}
                    onPress={() =>
                      setDaysOfWeek(
                        daysOfWeek.includes(7)
                          ? daysOfWeek.filter((day) => day !== 7)
                          : [...daysOfWeek, 7],
                      )
                    }
                    underlayColor="#b93df200"
                  >
                    <Text>Sat</Text>
                  </TouchableHighlight>
                </View>
                {!(daysOfWeek.length === 0) ? (
                  <View>
                    <View className="flex h-[45px] flex-row items-center justify-between border-b-[1px] border-t-[1px] bg-red-400 p-2">
                      <Text>Start Time</Text>
                      <DateTimePicker
                        mode="time"
                        display="default"
                        value={startTimeOfDay}
                        onChange={onStartTimeChange}
                        minuteInterval={5}
                      />
                    </View>
                    <View className="flex h-[45px] flex-row items-center justify-between bg-red-400 p-2">
                      <Text>End Time</Text>
                      <DateTimePicker
                        mode="time"
                        display="default"
                        value={endTimeOfDay}
                        minimumDate={startTimeOfDay}
                        onChange={onEndTimeChange}
                        minuteInterval={5}
                      />
                    </View>
                  </View>
                ) : null}
              </View>
            </View>
            <DifficultySelection
              difficulty={difficulty}
              setDifficulty={setDifficulty}
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
                    Add to Routine
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

export default RoutineCreationModal;
