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
import { FieldValues, useForm, Controller } from "react-hook-form";
import { isAxiosError } from "axios";
import api from "@/api/axios";

import { useHabitContext } from "@/context/HabitProvider";
import { useGlobalContext } from "@/context/GlobalProvider";

import { Repeat, DifficultyRank } from "@/types/db_types";

import AntDesign from "@expo/vector-icons/AntDesign";
import DifficultySelection from "../general/DifficultySelection";

const HabitEditModal = () => {
  const {
    habits,
    setHabits,
    editHabitOpen,
    setEditHabitOpen,
    currentEditHabit,
    setCurrentEditHabit,
    setSortBy,
  } = useHabitContext();

  const [habitId, setHabitId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useGlobalContext();

  const [quitting, setQuitting] = useState<boolean>(false);
  const [repeat, setRepeat] = useState<Repeat>(Repeat.DAILY);
  const [goalCompletionWeekly, setGoalCompletionWeekly] = useState<number>(1);
  const [goalCompletionMonthly, setGoalCompletionMonthly] = useState<number>(1);
  const [difficulty, setDifficulty] = useState<DifficultyRank>(
    DifficultyRank.E
  );

  const {
    setValue,
    handleSubmit,
    control,
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

    const quittingDup: boolean = quitting;
    const repeatDup: Repeat = repeat;
    let goalCompletionWeeklyDup: number | null = goalCompletionWeekly;
    let goalCompletionMonthlyDup: number | null = goalCompletionMonthly;
    const difficultyRankDup: DifficultyRank = difficulty;

    if (repeatDup === Repeat.DAILY) {
      goalCompletionWeeklyDup = null;
      goalCompletionMonthlyDup = null;
    } else if (repeatDup === Repeat.WEEKLY) {
      goalCompletionMonthlyDup = null;
    } else if (repeatDup === Repeat.MONTHLY) {
      goalCompletionWeeklyDup = null;
    }

    try {
      const response = await api.put(
        `/habits/update/${user.uid}/${habitId?.toString()}`,
        {
          title,
          description,
          quitting: quittingDup,
          repeat: repeatDup,
          completionGoalWeekly: goalCompletionWeeklyDup,
          completionGoalMonthly: goalCompletionMonthlyDup,
          difficultyRank: difficultyRankDup,
        },
        {
          headers: {
            Authorization: await user.getIdToken(),
          },
        }
      );

      if (response.status === 200) {
        const updatedHabits = habits.map((habit) => {
          if (habit.id === habitId) {
            return response.data;
          }
          return habit;
        });
        setHabits(updatedHabits);
        setEditHabitOpen(false);
        setCurrentEditHabit(null);
        setSortBy("");
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
    setEditHabitOpen(false);
    setCurrentEditHabit(null);
  };

  const onMinusWeeklyGoal = () => {
    if (goalCompletionWeekly > 1) {
      setGoalCompletionWeekly(goalCompletionWeekly - 1);
    }
  };
  const onPlusWeeklyGoal = () => {
    if (goalCompletionWeekly < 6) {
      setGoalCompletionWeekly(goalCompletionWeekly + 1);
    }
  };
  const onMinusMonthlyGoal = () => {
    if (goalCompletionMonthly > 1) {
      setGoalCompletionMonthly(goalCompletionMonthly - 1);
    }
  };
  const onPlusMonthlyGoal = () => {
    if (goalCompletionMonthly < 29) {
      setGoalCompletionMonthly(goalCompletionMonthly + 1);
    }
  };

  useEffect(() => {
    if (currentEditHabit) {
      setHabitId(currentEditHabit.id);
      setQuitting(currentEditHabit.quitting);
      setRepeat(currentEditHabit.repeat);
      if (currentEditHabit.repeat === Repeat.WEEKLY) {
        if (currentEditHabit.completionGoalWeekly) {
          setGoalCompletionWeekly(currentEditHabit.completionGoalWeekly);
        }
      }
      if (currentEditHabit.repeat === Repeat.MONTHLY) {
        if (currentEditHabit.completionGoalMonthly) {
          setGoalCompletionMonthly(currentEditHabit.completionGoalMonthly);
        }
      }
      setDifficulty(currentEditHabit.difficultyRank);
      setValue("title", currentEditHabit.title);
      setValue("description", currentEditHabit.description);
    } else {
      setEditHabitOpen(false);
      setHabitId(null);
      setQuitting(false);
      setRepeat(Repeat.DAILY);
      setGoalCompletionWeekly(1);
      setGoalCompletionMonthly(1);
      setDifficulty(DifficultyRank.E);
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentEditHabit]);

  return (
    <Modal
      animationType="slide"
      visible={editHabitOpen}
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
                    id="description"
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
            <View className="mt-4 w-[85%]">
              <Text className="ml-2 text-md text-neutral-700 pb-1">
                Controls
              </Text>
              <View className="flex flex-row justify-between bg-gray-400 w-full h-[50px] rounded-lg p-1">
                <TouchableHighlight
                  className={`flex items-center justify-center h-full ${
                    !quitting ? "bg-[#b93df2]" : "bg-[#e1abf740]"
                  } w-[49.5%] rounded-md transition-all duration-200`}
                  onPress={() => setQuitting(false)}
                  underlayColor="#b93df200"
                >
                  <Text>Positive</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  className={`flex items-center justify-center h-full ${
                    quitting ? "bg-[#b93df2]" : "bg-[#e1abf740]"
                  } w-[49.5%] rounded-md transition-all duration-200`}
                  onPress={() => setQuitting(true)}
                  underlayColor="#b93df200"
                >
                  <Text>Negative</Text>
                </TouchableHighlight>
              </View>
            </View>
            <View className="mt-4 w-[85%]">
              <Text className="ml-2 text-md text-neutral-700 pb-1">
                Repeats?
              </Text>
              <View className="flex flex-row justify-between bg-gray-400 w-full h-[40px] rounded-lg p-1">
                <TouchableHighlight
                  className={`flex items-center justify-center h-full ${
                    repeat === "DAILY" ? "bg-[#b93df2]" : "bg-[#e1abf740]"
                  } w-[32.7%] rounded-md transition-all duration-200`}
                  onPress={() => setRepeat(Repeat.DAILY)}
                  underlayColor="#b93df200"
                >
                  <Text>Daily</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  className={`flex items-center justify-center h-full ${
                    repeat === "WEEKLY" ? "bg-[#b93df2]" : "bg-[#e1abf740]"
                  } w-[32.7%] rounded-md transition-all duration-200`}
                  onPress={() => setRepeat(Repeat.WEEKLY)}
                  underlayColor="#b93df200"
                >
                  <Text>Weekly</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  className={`flex items-center justify-center h-full ${
                    repeat === "MONTHLY" ? "bg-[#b93df2]" : "bg-[#e1abf740]"
                  } w-[32.7%] rounded-md transition-all duration-200`}
                  onPress={() => setRepeat(Repeat.MONTHLY)}
                  underlayColor="#b93df200"
                >
                  <Text>Monthly</Text>
                </TouchableHighlight>
              </View>
              {repeat === Repeat.WEEKLY && (
                <View className="w-full bg-red-200 h-[40px] rounded-lg flex flex-row items-center p-2 justify-between">
                  <Text>Weekly Completion Goal</Text>
                  <View className="flex flex-row h-full items-center gap-2">
                    <AntDesign
                      name="minus"
                      size={26}
                      color="black"
                      onPress={onMinusWeeklyGoal}
                    />
                    <TextInput
                      className="w-[35px] h-full rounded-md px-2 bg-black text-white"
                      keyboardType="numeric"
                      value={goalCompletionWeekly.toString()}
                      editable={false}
                      textAlign="center"
                    />
                    <AntDesign
                      name="plus"
                      size={26}
                      color="black"
                      onPress={onPlusWeeklyGoal}
                    />
                  </View>
                </View>
              )}
              {repeat === Repeat.MONTHLY && (
                <View className="w-full bg-red-200 h-[40px] rounded-lg flex flex-row items-center p-2 justify-between">
                  <Text>Monthly Completion Goal</Text>
                  <View className="flex flex-row h-full items-center gap-2">
                    <AntDesign
                      name="minus"
                      size={26}
                      color="black"
                      onPress={onMinusMonthlyGoal}
                    />
                    <TextInput
                      className="w-[35px] h-full rounded-md px-2 bg-black text-white"
                      keyboardType="numeric"
                      value={goalCompletionMonthly.toString()}
                      editable={false}
                      textAlign="center"
                    />
                    <AntDesign
                      name="plus"
                      size={26}
                      color="black"
                      onPress={onPlusMonthlyGoal}
                    />
                  </View>
                </View>
              )}
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
                    Create Habit
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

export default HabitEditModal;
