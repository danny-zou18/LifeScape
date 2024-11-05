import React from "react";
import { View } from "react-native";

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
    </View>
  );
};

export default RewardsManager;
