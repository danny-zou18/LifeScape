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
import React, { useEffect, useState } from "react";
import { FieldValues, useForm, Controller } from "react-hook-form";
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

const RoutineEditModal = () => {
  const {
    todaysRoutine,
    setTodaysRoutine,
    editRoutineOpen,
    setEditRoutineOpen,
    currentEditRoutine,
    setCurrentEditRoutine,
  } = useRoutineContext();

  const [loading, setLoading] = useState<boolean>(false);
  const { user, userCharacter } = useGlobalContext();
  const [routineId, setRoutineId] = useState<number | null>(null);

  const [daysOfWeek, setDaysOfWeek] = useState<number[]>([]);

  const [startTimeOfDay, setStartTimeOfDay] = useState<Date>(
    new Date(0, 0, 0, 0, 0, 0, 0)
  );
  const [endTimeOfDay, setEndTimeOfDay] = useState<Date>(
    new Date(0, 0, 0, 0, 0, 0, 0)
  );
  const [difficulty, setDifficulty] = useState<DifficultyRank>(
    DifficultyRank.E
  );

  const [showTimeError, setShowTimeError] = useState<boolean>(false);

  const {
    setValue,
    handleSubmit,
    reset,
    control,
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
      const response = await api.put(
        `/routine/update/${user.uid}/${
          userCharacter.id
        }/${routineId?.toString()}`,
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
        }
      );
      if (response.status === 200) {
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
        const updatedRoutines = todaysRoutine.map((r) => {
          if (r.routine.id === routine.id) {
            return updatedRoutine;
          }
          return r;
        });
        setTodaysRoutine(updatedRoutines);
        setEditRoutineOpen(false);
        setCurrentEditRoutine(null);
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
    setEditRoutineOpen(false);
    setCurrentEditRoutine(null);
  };

  useEffect(() => {
    if (currentEditRoutine) {
      setRoutineId(currentEditRoutine.id);
      setValue("title", currentEditRoutine.title);
      setValue("description", currentEditRoutine.description);
      setDaysOfWeek(currentEditRoutine.daysOfWeek);
      setStartTimeOfDay(
        new Date(
          0,
          0,
          0,
          Math.floor(currentEditRoutine.startTimeOfDayInMinutes / 60),
          currentEditRoutine.startTimeOfDayInMinutes % 60,
          0,
          0
        )
      );
      setEndTimeOfDay(
        new Date(
          0,
          0,
          0,
          Math.floor(currentEditRoutine.endTimeOfDayInMinutes / 60),
          currentEditRoutine.endTimeOfDayInMinutes % 60,
          0,
          0
        )
      );
      setDifficulty(currentEditRoutine.difficultyRank);
    } else {
      reset();
      setDaysOfWeek([]);
      setStartTimeOfDay(new Date(0, 0, 0, 0, 0, 0, 0));
      setEndTimeOfDay(new Date(0, 0, 0, 0, 0, 0, 0));
      setDifficulty(DifficultyRank.E);
      setRoutineId(null);
      setEditRoutineOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentEditRoutine]);

  const onStartTimeChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date
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
      visible={editRoutineOpen}
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
              <Controller
                control={control}
                name="title"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    id="title"
                    autoCapitalize="none"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    autoComplete="name"
                    className="w-full h-[50px] bg-black rounded-lg text-white px-3"
                  />
                )}
              />
            </View>
            <View className="mt-5 w-[85%]">
              <Text className="ml-2 text-md text-neutral-700 pb-1">Notes</Text>
              <Controller
                control={control}
                name="description"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    id="decription"
                    autoCapitalize="none"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    autoComplete="name"
                    className="w-full h-[50px] bg-black rounded-lg text-white px-3"
                  />
                )}
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
                        onChange={onStartTimeChange}
                        minuteInterval={5}
                      />
                    </View>
                    <View className="bg-red-400 h-[45px] flex flex-row items-center p-2 justify-between">
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
                  className="bg-[#000000] w-[225px] h-[45px] rounded-md mt-10"
                  underlayColor="#FFFFFF"
                  onPress={handleSubmit(submitHandler)}
                >
                  <Text className="text-white text-xl font-semibold mx-auto my-auto">
                    Update Routine
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

export default RoutineEditModal;
