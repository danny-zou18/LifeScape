import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";

const TABS = ["Tasks", "Habits", "Routine"];

interface ViewSelectionBtnsProps {
  currentView: string;
  setCurrentView: React.Dispatch<React.SetStateAction<string>>;
  flatListRef: React.RefObject<FlatList>;
}
const ViewSelectionBtns: React.FC<ViewSelectionBtnsProps> = ({
  currentView,
  setCurrentView,
  flatListRef,
}) => {
  return (
    <View className="flex  w-full flex-row justify-around pb-1">
      {TABS.map((tab, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => {
            setCurrentView(tab);
            flatListRef.current?.scrollToIndex({ index });
          }}
          className={` w-[30%] p-3 ${
            currentView === tab ? "border-b-2 border-blue-500" : ""
          }`}
        >
          <Text className={`text-md text-center font-bold`}>{tab}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ViewSelectionBtns;
