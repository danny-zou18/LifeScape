import { Modal, SafeAreaView, View, Button } from "react-native";
import React from "react";
import { Calendar } from "react-native-big-calendar";
import IndividualRoutinesWeekly from "./IndividualRoutinesWeekly";
import RoutineEditModal from "./RoutineEditModal";

import { useRoutineContext } from "@/context/RoutineProvider";

const WeeklyRoutineModal = () => {
  const { weeklyRoutine, viewWeeklyRoutineOpen, setViewWeeklyRoutineOpen } =
    useRoutineContext();

  return (
    <Modal
      animationType="fade"
      visible={viewWeeklyRoutineOpen}
      onRequestClose={() => setViewWeeklyRoutineOpen(false)}
    >
      <RoutineEditModal />
      <SafeAreaView>
        <View className="flex flex-row mb-2 ml-5">
          <Button
            title="Exit"
            onPress={() => setViewWeeklyRoutineOpen(false)}
          ></Button>
        </View>
        <Calendar
          events={weeklyRoutine}
          height={780}
          renderEvent={IndividualRoutinesWeekly}
          mode="week"
          dayHeaderStyle={{ display: "none" }}
        //   headerContainerStyle={{ display: "none" }}
          onPressEvent={(event) => {
            console.log(event);
          }}
        />
      </SafeAreaView>
    </Modal>
  );
};

export default WeeklyRoutineModal;
