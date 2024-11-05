import { View, Image } from "react-native";
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
      style={{
        backgroundColor:
          item.rarity === 0 ? "gray" : getRarityColor(item.rarity),
        flex: 1,
        margin: 2,
        aspectRatio: 1,
      }}
      className="rounded-md"
    >
      <Image
        source={item.path ? itemPaths[Number(item.id)] : null}
        className="h-full w-full rounded-md"
        resizeMode="contain"
      />
    </View>
  );
};

export default IndividualItem;
