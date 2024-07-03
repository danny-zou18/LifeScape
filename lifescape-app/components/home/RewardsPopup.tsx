import React, { useRef, useEffect } from 'react';
import { Animated, Text } from 'react-native';
import { RewardsType } from '@/types/reward_type';  

interface RewardsPopupsProps {
  rewards: RewardsType;
  onComplete: () => void;
}

const RewardsPopup: React.FC<RewardsPopupsProps> = ({rewards, onComplete}) => {
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
      style={[fadeAnim]}
      className="absolute top-[70%] mx-auto bg-black bg-opacity-70 rounded-lg p-2"
      pointerEvents={'none'}
    >
      <Text className="text-white text-[2rem]">Testing</Text>
    </Animated.View>
  )
}

export default RewardsPopup