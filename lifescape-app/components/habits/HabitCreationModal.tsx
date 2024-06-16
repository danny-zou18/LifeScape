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

import { useHabitContext } from "@/context/HabitProvider";
import { useGlobalContext } from "@/context/GlobalProvider";

import { Repeat, DifficultyRank } from "@/types/db_types";

import AntDesign from "@expo/vector-icons/AntDesign";
import DifficultySelection from "../general/DifficultySelection";

const HabitCreationModal = () => {
  const { habits, setHabits, habitCreationOpen, setHabitCreationOpen } =
    useHabitContext();

  const [loading, setLoading] = useState<boolean>(false);
  const { user, userCharacter } = useGlobalContext();

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
      const response = await api.post(
        `/habits/create/${user.uid}/${userCharacter.id}`,
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

      if (response.status === 201) {
        console.log("Habit created successfully", response.data);
        setHabits([...habits, response.data]);
        setHabitCreationOpen(false);
        setHabitCreationOpen(false);
        reset();
        setQuitting(false);
        setRepeat(Repeat.DAILY);
        setGoalCompletionWeekly(1);
        setGoalCompletionMonthly(1);
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
    setHabitCreationOpen(false);
    reset();
    setQuitting(false);
    setRepeat(Repeat.DAILY);
    setGoalCompletionWeekly(1);
    setGoalCompletionMonthly(1);
    setDifficulty(DifficultyRank.E);
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

  return (
    <Modal
      animationType="slide"
      visible={habitCreationOpen}
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
            <View className="mt-4 w-[85%]">
              <Text className="ml-2 text-md text-neutral-700 pb-1">
                Controls
              </Text>
              <View className="flex flex-row justify-between bg-gray-400 w-full h-[50px] rounded-lg p-1">
                <TouchableHighlight
                  className={`flex items-center justify-center h-full bg-${
                    !quitting ? "[#b93df2]" : "[#e1abf740]"
                  } w-[49.5%] rounded-md transition-all duration-200`}
                  onPress={() => setQuitting(false)}
                  underlayColor="#b93df200"
                >
                  <Text>Positive</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  className={`flex items-center justify-center h-full bg-${
                    quitting ? "[#b93df2]" : "[#e1abf740]"
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
                  className={`flex items-center justify-center h-full bg-${
                    repeat === "DAILY" ? "[#b93df2]" : "[#e1abf740]"
                  } w-[32.7%] rounded-md transition-all duration-200`}
                  onPress={() => setRepeat(Repeat.DAILY)}
                  underlayColor="#b93df200"
                >
                  <Text>Daily</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  className={`flex items-center justify-center h-full bg-${
                    repeat === "WEEKLY" ? "[#b93df2]" : "[#e1abf740]"
                  } w-[32.7%] rounded-md transition-all duration-200`}
                  onPress={() => setRepeat(Repeat.WEEKLY)}
                  underlayColor="#b93df200"
                >
                  <Text>Weekly</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  className={`flex items-center justify-center h-full bg-${
                    repeat === "MONTHLY" ? "[#b93df2]" : "[#e1abf740]"
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

export default HabitCreationModal;
