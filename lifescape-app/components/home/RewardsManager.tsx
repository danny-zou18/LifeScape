import React from "react";
import { View, Text, Image } from "react-native";

import RewardsPopup from "./RewardsPopup";

import { useHomeContext } from "@/context/HomeProvider";

const RewardsManager = () => {
  const { currentShownRewards, setCurrentShownRewards } = useHomeContext();

  return (
    <View
      pointerEvents="none"
      className="absolute z-50 h-full w-[100vw] bg-transparent"
    >
      {currentShownRewards.map((rewards) => (
        <RewardsPopup
          key={rewards.id}
          rewards={rewards}
          onComplete={() => {
            setCurrentShownRewards((prev) =>
              prev.filter((n) => n.id !== rewards.id),
            );
          }}
        />
      ))}
      <View
        // style={[{ transform: [{ translateX: -70 }] }]}
        className="absolute bottom-3 left-1/2 flex h-10 flex-row gap-2 rounded-full bg-black bg-opacity-70 p-2 px-4 -translate-x-1/2"
        pointerEvents={"none"}
      >
        <View className="h-full flex flex-row items-center gap-1">
          <View className="h-full">
            <Image
              source={require("../../assets/images/rewardicons/experience.png")}
              resizeMode="contain"
              style={{ flex: 1, aspectRatio: 1 }}
            />
          </View>
          <Text className="text-white">2</Text>
        </View>
        <View className="h-full flex flex-row items-center gap-1">
          <View className="h-full">
            <Image
              source={require("../../assets/images/rewardicons/gold.png")}
              resizeMode="contain"
              style={{ flex: 1, aspectRatio: 1 }}
            />
          </View>
          <Text className="text-white">2</Text>
        </View>
        <View className="h-full flex flex-row items-center gap-1">
          <View className="h-full">
            <Image
              source={require("../../assets/images/rewardicons/strength.png")}
              resizeMode="contain"
              style={{ flex: 1, aspectRatio: 1 }}
            />
          </View>
          <Text className="text-white">2</Text>
        </View>
      </View>
    </View>
  );
};

export default RewardsManager;
