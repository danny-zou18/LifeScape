import { View, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import api from "@/api/axios";
import { useGlobalContext } from "@/context/GlobalProvider";
import Inventory from "@/components/character/Inventory/Inventory";
import CharacterEquippedItems from "@/components/character/characterEquippedItems/CharacterEquippedItems";

const Character = () => {
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
        setInventoryData(response.data);
      } catch (error) {
        console.error("Failed to fetch inventory data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, [user, userCharacter?.id]);

  if (loading) {
    return (
      <View className="flex items-center justify-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-[#f8f8f8] p-4">
      <CharacterEquippedItems />
      <Inventory inventoryData={inventoryData} />
    </View>
  );
};

export default Character;
