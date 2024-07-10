import { View, Text, Modal, SafeAreaView } from "react-native";
import React from "react";
import { CalendarEvent } from "react-native-big-calendar";

import { useRoutineContext } from "@/context/RoutineProvider";

const WeeklyRoutineModal = () => {
  const { viewWeeklyRoutineOpen } = useRoutineContext();

  return (
    <Modal animationType="fade" visible={viewWeeklyRoutineOpen}>
      <SafeAreaView>
        
      </SafeAreaView>
    </Modal>
  );
};

export default WeeklyRoutineModal;
