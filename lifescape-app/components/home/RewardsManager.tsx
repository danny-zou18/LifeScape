import React from "react";
import { View, StyleSheet } from "react-native";

import RewardsPopup from "./RewardsPopup";

import { useHomeContext } from "@/context/HomeProvider";

const RewardsManager = () => {
  const { currentShownRewards, setCurrentShownRewards } = useHomeContext();

  return (
    <View style={styles.container} pointerEvents="none">
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    backgroundColor: "transparent",
  },
});

export default RewardsManager;
