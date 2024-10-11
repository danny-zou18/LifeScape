import { View, Text } from "react-native";
import UnityView from '@azesmway/react-native-unity';
import React from "react";

const play = () => {
  return (
    <View style={{ flex: 1 }}>
      <UnityView
        style={{
          position: "absolute",
          height: "100%",
          width: "100%",
          top: 1,
          bottom: 1,
        }}
      />
    </View>
  );
};

export default play;
