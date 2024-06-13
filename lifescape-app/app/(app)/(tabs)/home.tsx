import {
  View,
  Text,
  TouchableHighlight,
  Button,
  Modal,
  SafeAreaView,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";

import { useGlobalContext } from "@/context/GlobalProvider";

import ViewSelectionBtns from "@/components/home/ViewSelectionBtns";

import CharacterOverview from "@/components/home/CharacterOverview";
import CharacterCreationModal from "@/components/home/CharacterCreationModal";

import TaskProvider from "@/context/TaskProvider";
import TaskWrapper from "@/components/home/TaskWrapper";

import HabitWrapper from "@/components/home/HabitWrapper";

import RoutineWrapper from "@/components/home/RoutineWrapper";

const Home = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [characterCreationModalVisible, setCharacterCreationModalVisible] =
    useState<boolean>(false);

  const { userCharacter } = useGlobalContext();

  const [currentlyOpen, setCurrentlyOpen] = useState<string>("tasks");

  return (
    <SafeAreaView>
      {userCharacter ? (
        <View className="flex items-center">
          <CharacterOverview />
          <View className="w-[95vw]">
           <ViewSelectionBtns currentView={currentlyOpen} setCurrentView={setCurrentlyOpen}/>
            <TaskProvider>
              <TaskWrapper />
            </TaskProvider>
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
