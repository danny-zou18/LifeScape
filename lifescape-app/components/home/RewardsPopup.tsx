import React, { useRef, useEffect } from 'react';
import { Animated, Text, StyleSheet } from 'react-native';
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
      style={[fadeAnim, styles.modal]}
      className="absolute top-12 left-10 right-10 bg-black bg-opacity-70 rounded-lg p-2"
    >
      <Text className="text-black text-[15rem]">Testing</Text>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  modal: {
    position: 'absolute',
    top: 50,
    left: '10%',
    right: '10%',
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 5,
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
});


export default RewardsPopup