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

    const onCancel = () => {
        setHabitCreationOpen(false);
        // reset();
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
        </SafeAreaView>
    </Modal>
  );
};

export default HabitCreationModal;
