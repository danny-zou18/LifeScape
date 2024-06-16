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

import { useRoutineContext } from "@/context/RoutineProvider";
import { useGlobalContext } from "@/context/GlobalProvider";

import { DifficultyRank } from "@/types/db_types";
import HabitCreationModal from "../habits/HabitCreationModal";

import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

const RoutineCreationModal = () => {
  const { routines, setRoutines, routineCreationOpen, setRoutineCreationOpen } =
    useRoutineContext();

  const [loading, setLoading] = useState<boolean>(false);
  const { user, userCharacter } = useGlobalContext();

  const [daysOfWeek, setDaysOfWeek] = useState<number[]>([]);
  const [startTimeOfDay, setStartTimeOfDay] = useState<Date>(new Date());
  const [endTimeOfDay, setEndTimeOfDay] = useState<Date>(new Date());
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
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

export default RoutineCreationModal;
