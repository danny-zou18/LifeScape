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
import { FieldValues, useForm, useController } from "react-hook-form";
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
    control,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      description: "",
    },
  });

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
    }
  }, [currentEditHabit]);

  return (
    <View>
      <Text>HabitEditModal</Text>
    </View>
  );
};

export default HabitEditModal;
