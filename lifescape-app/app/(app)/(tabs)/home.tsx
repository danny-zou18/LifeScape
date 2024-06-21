import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Text,
  Animated as RNAnimated,
  useWindowDimensions,
  FlatList,
  
} from "react-native";
import Animated,{
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  useAnimatedScrollHandler,
} from "react-native-reanimated";
import React, { useState, useEffect, useRef } from "react";

import { useGlobalContext } from "@/context/GlobalProvider";

// import ViewSelectionBtns from "@/components/home/ViewSelectionBtns";

import CharacterOverview from "@/components/home/CharacterOverview";
import CharacterCreationModal from "@/components/home/CharacterCreationModal";

import TaskProvider from "@/context/TaskProvider";
import TaskWrapper from "@/components/home/TaskWrapper";

import HabitProvider from "@/context/HabitProvider";
import HabitWrapper from "@/components/home/HabitWrapper";

import RoutineProvider from "@/context/RoutineProvider";
import RoutineWrapper from "@/components/home/RoutineWrapper";

const TABS = ["tasks", "habits", "routine"];

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
    <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
      {TABS.map((tab, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => {
            setCurrentView(tab);
            flatListRef.current?.scrollToIndex({ index });
          }}
        >
          <Text
            style={{
              padding: 16,
              color: currentView === tab ? "blue" : "black",
            }}
          >
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const Home = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [characterCreationModalVisible, setCharacterCreationModalVisible] =
    useState<boolean>(false);

  const { userCharacter } = useGlobalContext();

  const [currentlyOpen, setCurrentlyOpen] = useState<string>("tasks");
  
  const scrollX = useSharedValue(0);
  const flatListRef = useRef<FlatList>(null);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollX.value = event.contentOffset.x / 300; // 300 is the width of each tab
  });

  useEffect(() => {
    const index = TABS.indexOf(currentlyOpen);
    flatListRef.current?.scrollToIndex({ index });
  }, [currentlyOpen]);

  return (
    <SafeAreaView>
      {userCharacter ? (
        <View className="flex items-center">
          <CharacterOverview />
          <View className="w-[95vw] flex">
            <ViewSelectionBtns
              currentView={currentlyOpen}
              setCurrentView={setCurrentlyOpen}
              flatListRef={flatListRef}
            />
            <Animated.FlatList
              ref={flatListRef}
              horizontal
              data={TABS}
              keyExtractor={(item) => item}

              pagingEnabled
              scrollEnabled={false}
              showsHorizontalScrollIndicator={false}
              onScroll={scrollHandler}
              scrollEventThrottle={16}
              renderItem={({ item }) => (
                <View
                  className="w-[95vw] bg-red-400"
                >
                  {item === "tasks" && (
                    <TaskProvider>
                      <TaskWrapper />
                    </TaskProvider>
                  )}
                  {item === "habits" && (
                    <HabitProvider>
                      <HabitWrapper />
                    </HabitProvider>
                  )}
                  {item === "routine" && (
                    <RoutineProvider>
                      <RoutineWrapper />
                    </RoutineProvider>
                  )}
                </View>
              )}
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
