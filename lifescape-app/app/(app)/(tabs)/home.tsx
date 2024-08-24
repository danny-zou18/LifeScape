import { View, SafeAreaView, FlatList } from "react-native";

import React, { useState, useRef } from "react";

import { useGlobalContext } from "@/context/GlobalProvider";
import HomeProvider from "@/context/HomeProvider";

import CharacterCreationModal from "@/components/home/CharacterCreationModal";
import CharacterOverview from "@/components/home/CharacterOverview";

import ViewSelectionBtns from "@/components/home/ViewSelectionBtns";
import TasksHabitsRoutine from "@/components/home/TasksHabitsRoutine";

import RewardsManager from "@/components/home/RewardsManager";

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
        <HomeProvider>
          <View className="relative flex items-center">
            <CharacterOverview />
            <View className="flex w-[95vw] ">
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
            <RewardsManager />
          </View>
        </HomeProvider>
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
