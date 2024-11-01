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
      style={{ backgroundColor: getRarityColor(item.rarity) }}
      className="w-[48%] flex-row items-center rounded-md p-2"
    >
      <Image
        source={
          item.path
            ? itemPaths[Number(item.id)]
            : require("@/assets/Inventory/test.png")
        }
        className="h-[50px] w-[50px]"
      />
      <View className="ml-2 flex">
        <Text className="text-sm">
          {item.name} ({getRarityText(item.rarity)})
        </Text>
        <Text className="text-sm">Cost: {item.cost}💸</Text>
        <Text className="mt-3 text-sm font-bold">Qty: {item.Quantity}</Text>
      </View>
    </View>
  );

  return (
    <View>
      <Text>Inventory</Text>
      <FlatList
        data={inventoryData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        numColumns={2} // Set the grid with 2 columns
      />
    </View>
  );
};

export default Inventory;
