import { View, Text, FlatList } from "react-native";
import React, { useEffect } from "react";
import IndividualItem from "./IndividualItem";
import { Item } from "@/types/db_types";

interface InventoryProps {
  inventoryData: Item[];
}

const Inventory: React.FC<InventoryProps> = ({ inventoryData }) => {
  const [inventory, setInventory] = React.useState<Item[]>([]);

  useEffect(() => {
    setInventory([
      ...inventoryData,
      ...Array(102 - inventoryData.length).fill({
        id: "empty",
        name: "",
        rarity: 0,
        cost: 0,
        Quantity: 0,
        path: "",
      }),
    ]);
  }, [inventoryData]);
  return (
    <View className="mt-8 h-[60%] ">
      <FlatList
        data={inventory}
        keyExtractor={(item, index) => item.id.toString() + index}
        renderItem={({ item }) => {
          return <IndividualItem item={item} />;
        }}
        numColumns={6}
      />
    </View>
  );
};

export default Inventory;
