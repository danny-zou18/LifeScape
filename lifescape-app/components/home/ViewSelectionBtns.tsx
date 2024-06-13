import { View, Text, TouchableHighlight } from "react-native";
import React from "react";

interface ViewSelectionBtnsProps {
  currentView: string;
  setCurrentView: React.Dispatch<React.SetStateAction<string>>;
}

const ViewSelectionBtns: React.FC<ViewSelectionBtnsProps> = () => {
  return (
    <View className="flex flex-row mt-2 gap-2">
      <Btns text="Tasks" />
      <Btns text="Habits" />
      <Btns text="Routine" />
    </View>
  );
};

const Btns: React.FC<{ text: string }> = ({ text }) => {
  return (
    <TouchableHighlight className="bg-[#FDFDFD] px-4 h-[45px] mt-4">
      <Text className="text-black text-xl font-semibold mx-auto my-auto">
        {text}
      </Text>
    </TouchableHighlight>
  );
};

export default ViewSelectionBtns;
