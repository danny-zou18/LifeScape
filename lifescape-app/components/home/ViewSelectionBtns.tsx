import { View, Text, TouchableHighlight } from "react-native";
import React from "react";

interface ViewSelectionBtnsProps {
  currentView: string;
  setCurrentView: React.Dispatch<React.SetStateAction<string>>;
}

const ViewSelectionBtns: React.FC<ViewSelectionBtnsProps> = ({
  currentView,
  setCurrentView,
}) => {
  return (
    <View className="flex flex-row mt-2 gap-2">
      <Btns
        text="Tasks"
        active={currentView === "tasks"}
        setCurrentView={setCurrentView}
        changeTo="tasks"
      />
      <Btns
        text="Habits"
        active={currentView === "habits"}
        setCurrentView={setCurrentView}
        changeTo="habits"
      />
      <Btns
        text="Routine"
        active={currentView === "routine"}
        setCurrentView={setCurrentView}
        changeTo="routine"
      />
    </View>
  );
};

interface BtnsProps {
  text: string;
  active: boolean;
  setCurrentView: React.Dispatch<React.SetStateAction<string>>;
  changeTo: string;
}

const Btns: React.FC<BtnsProps> = ({
  text,
  active,
  setCurrentView,
  changeTo,
}) => {
  const onPress = () => {
    setCurrentView(changeTo);
  };

  return (
    <TouchableHighlight
      className={`bg-[#FDFDFD] px-4 h-[45px] mt-4 ${
        active ? "border-b-2 border-blue-200" : ""
      }`}
      underlayColor="#FFFFFF"
      onPress={onPress}
    >
      <Text className="text-black text-xl font-semibold mx-auto my-auto">
        {text}
      </Text>
    </TouchableHighlight>
  );
};

export default ViewSelectionBtns;
