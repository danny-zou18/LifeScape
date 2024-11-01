import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import api from "@/api/axios";
import { useGlobalContext } from "@/context/GlobalProvider";
import ImageXpBar from "@/components/character/characterOverview/ImageXpBar";
import { itemPaths } from "@/assets/imagePaths/itemPaths";

const Inventory = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user, userCharacter } = useGlobalContext();

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await api.get(
          `/items/get/${user.uid}/${userCharacter?.id}`,
          {
            headers: {
              Authorization: await user.getIdToken(),
            },
          },
        );
        console.log(response.data);
        setInventoryData(response.data);
      } catch (error) {
        console.error("Failed to fetch inventory data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, [user, userCharacter?.id]);

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
  const renderItem = ({
    item,
  }: {
    item: {
      id: string;
      name: string;
      Quantity: number;
      path: string;
      cost: number;
      rarity: number;
    };
  }) => (
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

  if (loading) {
    return (
      <View className="flex items-center justify-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-[#f8f8f8] p-4">
      <View className="mx-auto flex w-[90%] flex-col py-2">
        <ImageXpBar />
      </View>
      <Text className="py-10 text-2xl font-bold">Inventory</Text>
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
