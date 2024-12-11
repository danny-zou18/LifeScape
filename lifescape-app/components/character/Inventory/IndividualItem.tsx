import { View, Image, Text } from "react-native";
import React from "react";
import { itemPaths } from "@/assets/imagePaths/itemPaths";
import { Item } from "@/types/db_types";

interface IndividualItemProps {
  item: Item;
}

const IndividualItem: React.FC<IndividualItemProps> = ({ item }) => {
  const getRarityColor = (rarity: number) => {
    switch (rarity) {
      case 1:
        return "#d3d3d3"; // Common - Light Gray
      case 2:
        return "#00ff00"; // Uncommon - Green
      case 3:
        return "#ADD8E6"; // Rare - Blue
      case 4:
        return "#800080"; // Epic - Purple
      case 5:
        return "#ffa500"; // Legendary - Orange
      default:
        return "#ffffff"; // Default - White
    }
  };

  return (
    <View
      className={`flex-1 m-2 aspect-square rounded-md ${
        item.rarity === 0 ? "bg-gray-500" : `bg-[${getRarityColor(item.rarity)}]`
      }`}
    >
      <Image
        source={item.path ? itemPaths[Number(item.id)] : null}
        className="h-full w-full rounded-md"
        resizeMode="contain"
      />
      
      {/* Displaying Quantity and Item Name */}
      {item.name && (
        <View className="absolute bottom-0 left-0 bg-black bg-opacity-60 w-full text-white text-xs p-2 rounded-b-md">
          <Text className="text-white text-center">{item.name}</Text>
          {item.Quantity > 0 && (
            <Text className="text-white text-center text-sm">
              Quantity: {item.Quantity}
            </Text>
          )}
        </View>
      )}
    </View>
  );
};

export default IndividualItem;
