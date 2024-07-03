import { View, SafeAreaView, FlatList } from "react-native";

import React, { useState, useRef } from "react";
import { RewardsType } from "@/types/reward_type";

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

  const [rewards, setRewards] = useState<RewardsType[]>([]);

  const showNotification = (reward: RewardsType) => {
    const id = Math.random().toString(); // Generate a unique ID for each notification
    setRewards((prev) => [
      ...prev,
      {
        id,
        ...reward,
      },
    ]);

    // Remove the notification after it completes
    setTimeout(() => {
      setNotifications((prev) =>
        prev.filter((notification) => notification.id !== id),
      );
    }, 2500); // Adjust the duration as needed
  };

  return (
    <SafeAreaView>
      {userCharacter ? (
        <View className="flex items-center">
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
