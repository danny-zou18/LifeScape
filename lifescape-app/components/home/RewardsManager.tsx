import React from "react";
import { View, Text } from "react-native";

import RewardsPopup from "./RewardsPopup";

import { useHomeContext } from "@/context/HomeProvider";

const RewardsManager = () => {
  const { currentShownRewards, setCurrentShownRewards } = useHomeContext();

  return (
    <View
      pointerEvents="none"
      className="absolute z-50 w-[100vw] h-full bg-transparent"
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
        //   style={[fadeAnim]}
        style={{ transform: [{ translateX: -50 }] }}
        className="absolute bottom-3 left-1/2 rounded-lg bg-black bg-opacity-70 p-2"
        pointerEvents={"none"}
      >
        <Text className="text-[2rem] text-white">Testing</Text>
      </View>
    </View>
  );
};

export default RewardsManager;
