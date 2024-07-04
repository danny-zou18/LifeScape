import React, { useRef, useEffect } from "react";
import { Animated, Text, Image } from "react-native";
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
      style={[fadeAnim, {transform: [{ translateX: -50 }]}]}
      className="absolute bottom-3 left-1/2 rounded-lg bg-black bg-opacity-70 p-2 flex flex-row"
      pointerEvents={"none"}
    >
      <Text className="text-[2rem] text-white">Testing</Text>
    </Animated.View>
  );
};

export default RewardsPopup;
