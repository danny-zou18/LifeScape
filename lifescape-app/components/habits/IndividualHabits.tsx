import { View, Text, TouchableOpacity, Animated } from 'react-native'
import React from 'react'
import {isAxiosError} from "axios";
import api from "@/api/axios";
import { useGlobalContext } from '@/context/GlobalProvider';

import { Habit } from '@/types/db_types'

import { Swipeable } from 'react-native-gesture-handler'

interface IndividualHabitsProps {
    habit: Habit
    setHabits: React.Dispatch<React.SetStateAction<Habit[]>>
}

const IndividualHabits: React.FC<IndividualHabitsProps> = ({habit, setHabits}) => {
    const { user, userCharacter } = useGlobalContext();

    const rightSwipe = (
        progress: ReturnType<Animated.Value["interpolate"]>,
        dragX: ReturnType<Animated.Value["interpolate"]>
      ) => {
        const scale = dragX.interpolate({
          inputRange: [-100, 0],
          outputRange: [1, 0],
          extrapolate: "clamp",
        });
        return (
          <TouchableOpacity activeOpacity={0.6} onPress={() => handleDeleteTask()}>
            <View className="bg-[#fc4949] flex items-center justify-center h-full w-[70px] rounded-lg">
              <Animated.Text
                className="text-white font-bold text-lg"
                style={{ transform: [{ scale: scale }] }}
              >
                Delete
              </Animated.Text>
            </View>
          </TouchableOpacity>
        );
      };
  return (
    <Swipeable renderRightActions={rightSwipe}>
      <View className="bg-red-100 p-4 rounded-lg overflow-hidden">
        <Text>{habit.title}</Text>
      </View>
    </Swipeable>
  )
}

export default IndividualHabits