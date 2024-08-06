import React, { useRef, useEffect } from "react";
import { Animated, Text, Image, View } from "react-native";
import { RewardsType } from "@/types/reward_type";

interface RewardsPopupsProps {
  rewards: RewardsType;
  onComplete: () => void;
}

const RewardsPopup: React.FC<RewardsPopupsProps> = ({
  rewards,
  onComplete,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade in
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
    // Fade out after 2-3 seconds
    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        if (onComplete) {
          onComplete();
        }
      });
    }, 2000); // Adjust the duration as needed

    return () => clearTimeout(timer);
  }, [fadeAnim, onComplete]);

  return (
    <Animated.View
      style={{ opacity: fadeAnim }}
      className="absolute bottom-3 left-1/2 flex h-10 -translate-x-1/2 flex-row gap-2 rounded-full bg-black bg-opacity-70 p-2 px-4"
      pointerEvents={"none"}
    >
      {rewards.experienceReward && (
        <View className="flex h-full flex-row items-center gap-1">
          <View className="h-full">
            <Image
              source={require("../../assets/images/rewardicons/experience.png")}
              resizeMode="contain"
              style={{ flex: 1, aspectRatio: 1 }}
            />
          </View>
          <Text className="text-white">{rewards.experienceReward}</Text>
        </View>
      )}
      {rewards.goldReward && (
        <View className="flex h-full flex-row items-center gap-1">
          <View className="h-full">
            <Image
              source={require("../../assets/images/rewardicons/gold.png")}
              resizeMode="contain"
              style={{ flex: 1, aspectRatio: 1 }}
            />
          </View>
          <Text className="text-white">{rewards.goldReward}</Text>
        </View>
      )}
      {rewards.strengthReward && (
        <View className="flex h-full flex-row items-center gap-1">
          <View className="h-full">
            <Image
              source={require("../../assets/images/rewardicons/strength.png")}
              resizeMode="contain"
              style={{ flex: 1, aspectRatio: 1 }}
            />
          </View>
          <Text className="text-white">{rewards.strengthReward}</Text>
        </View>
      )}
      {rewards.defenseReward && (
        <View className="flex h-full flex-row items-center gap-1">
          <View className="h-full">
            <Image
              source={require("../../assets/images/rewardicons/defense.png")}
              resizeMode="contain"
              style={{ flex: 1, aspectRatio: 1 }}
            />
          </View>
          <Text className="text-white">{rewards.defenseReward}</Text>
        </View>
      )}
      {rewards.agilityReward && (
        <View className="flex h-full flex-row items-center gap-1">
          <View className="h-full">
            <Image
              source={require("../../assets/images/rewardicons/agility.png")}
              resizeMode="contain"
              style={{ flex: 1, aspectRatio: 1 }}
            />
          </View>
          <Text className="text-white">{rewards.agilityReward}</Text>
        </View>
      )}
      {rewards.vitalityReward && (
        <View className="flex h-full flex-row items-center gap-1">
          <View className="h-full">
            <Image
              source={require("../../assets/images/rewardicons/vitality.png")}
              resizeMode="contain"
              style={{ flex: 1, aspectRatio: 1 }}
            />
          </View>
          <Text className="text-white">{rewards.vitalityReward}</Text>
        </View>
      )}
      {rewards.enduranceReward && (
        <View className="flex h-full flex-row items-center gap-1">
          <View className="h-full">
            <Image
              source={require("../../assets/images/rewardicons/endurance.png")}
              resizeMode="contain"
              style={{ flex: 1, aspectRatio: 1 }}
            />
          </View>
          <Text className="text-white">{rewards.enduranceReward}</Text>
        </View>
      )}
      {rewards.willReward && (
        <View className="flex h-full flex-row items-center gap-1">
          <View className="h-full">
            <Image
              source={require("../../assets/images/rewardicons/will.png")}
              resizeMode="contain"
              style={{ flex: 1, aspectRatio: 1 }}
            />
          </View>
          <Text className="text-white">{rewards.willReward}</Text>
        </View>
      )}
    </Animated.View>
  );
};

export default RewardsPopup;
