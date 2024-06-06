import { TouchableOpacity, Text } from "react-native";
import React from "react";

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  containerStyle?: string;
  isLoading?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  containerStyle,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      className={`rounded-xl justify-center items-center p-10 ${containerStyle} ${
        isLoading ? "opacity-50" : ""
      }`}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={isLoading}
    >
      <Text className="p-10">{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
