import { View, Text, FlatList } from "react-native";
import React from "react";
import { Image } from "react-native";
import { itemPaths } from "@/assets/imagePaths/itemPaths";
import { Item } from "@/types/db_types";

interface InventoryProps {
  inventoryData: Item[];
}

const Inventory: React.FC<InventoryProps> = ({ inventoryData }) => {
  // Function to get color based on rarity
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

  // Function to get rarity text based on rarity
  const getRarityText = (rarity: number) => {
    switch (rarity) {
      case 1:
        return "Common";
      case 2:
        return "Uncommon";
      case 3:
        return "Rare";
      case 4:
        return "Epic";
      case 5:
        return "Legendary";
      default:
        return "Default";
    }
  };
  // Render each item in the inventory
  const renderItem = ({ item }: { item: Item }) => (
    <View
      style={{
        backgroundColor: getRarityColor(item.rarity),
        flex: 1,
        margin: 2,
        aspectRatio: 1,
      }}
      className="rounded-md"
    >
      <Image
        source={
          item.path
            ? itemPaths[Number(item.id)]
            : require("@/assets/Inventory/test.png")
        }
        className="w-full h-full rounded-md"
        resizeMode="contain"
      />
    </View>
  );

  return (
    <View className="mt-8 h-[60%] bg-red-200">
      <FlatList
        data={[
          ...inventoryData,
          ...Array(102 - inventoryData.length).fill({
            id: "blank",
            name: "",
            rarity: 0,
            cost: 0,
            Quantity: 0,
            path: "",
          }),
        ]}
        keyExtractor={(item, index) => item.id.toString() + index}
        renderItem={renderItem}
        numColumns={6}
      />
    </View>
  );
};

export default Inventory;
