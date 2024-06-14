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

const HabitCreationModal = () => {
  const { habits, setHabits, habitCreationOpen, setHabitCreationOpen } =
    useHabitContext();

  const [loading, setLoading] = useState<boolean>(false);
  const { user, userCharacter } = useGlobalContext();

  const [quitting, setQuitting] = useState<boolean>(false);

  const {
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      description: "",
      repeat: "DAILY",
      completionGoalWeekly: null,
      completionGoalMonthly: null,
      quitting: false,
      difficulty: "E",
    },
  });

  const onCancel = () => {
    setHabitCreationOpen(false);
    reset();
  };
  const onQuittingFalse = () => {
    setQuitting(false);
    setValue("quitting", false);
  };
  const onQuittingTrue = () => {
    setQuitting(true);
    setValue("quitting", true);
  };

  return (
    <Modal
      animationType="slide"
      visible={habitCreationOpen}
      onRequestClose={() => {
        setHabitCreationOpen(false);
      }}
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
                  className={`flex items-center justify-center h-full bg-${!quitting ? "[#b93df2]" : "[#e1abf740]"} w-[49.5%] rounded-md `}
                  onPress={onQuittingFalse}
                  underlayColor="#b93df2"
                >
                  <Text>Positive</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  className={`flex items-center justify-center h-full bg-${quitting ? "[#b93df2]" : "[#e1abf740]"} w-[49.5%] rounded-md`}
                  onPress={onQuittingTrue}
                  underlayColor="#b93df2"
                >
                  <Text>Negative</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

export default HabitCreationModal;
