import {
  View,
  SafeAreaView,
  FlatList,
} from "react-native";

import React, { useState, useRef } from "react";

import { useGlobalContext } from "@/context/GlobalProvider";

import CharacterCreationModal from "@/components/home/CharacterCreationModal";
import CharacterOverview from "@/components/home/CharacterOverview";

import ViewSelectionBtns from "@/components/home/ViewSelectionBtns";
import TasksHabitsRoutine from "@/components/home/TasksHabitsRoutine";


const Home = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [characterCreationModalVisible, setCharacterCreationModalVisible] =
    useState<boolean>(false);

  const { userCharacter } = useGlobalContext();

  const [currentlyOpen, setCurrentlyOpen] = useState<string>("Tasks");
  const flatListRef = useRef<FlatList>(null);

  return (
    <SafeAreaView>
      {userCharacter ? (
        <View className="flex items-center">
          <CharacterOverview />
          <View className="w-[95vw] flex mt-1">
            <ViewSelectionBtns
              currentView={currentlyOpen}
              setCurrentView={setCurrentlyOpen}
              flatListRef={flatListRef}
            />
            <TasksHabitsRoutine
              currentlyOpen={currentlyOpen}
              flatListRef={flatListRef}
            />
          </View>
        </View>
      ) : (
        <CharacterCreationModal
          isOpen={characterCreationModalVisible}
          setOpen={setCharacterCreationModalVisible}
          isLoading={loading}
          setIsLoading={setLoading}
        />
      )}
    </SafeAreaView>
  );
};

export default Home;
