import { View, Text, FlatList, Image } from "react-native";
import React from "react";
import { itemPaths } from "@/assets/imagePaths/itemPaths";
import { Item } from "@/types/db_types";

const EquippedItems = () => {
  return (
    <View className="flex flex-row gap-2 bg-blue-400">
      <View className="flex flex-col gap-2">
        <EquippedItem type="headgear" item={null} />
        <EquippedItem type="chestgeat" item={null} />
        <EquippedItem type="leggear" item={null} />
        <EquippedItem type="footgear" item={null} />
      </View>
      <View className="flex flex-col gap-2">
        <EquippedItem type="weapon" item={null} />
        <EquippedItem type="accessory1" item={null} />
        <EquippedItem type="accessory2" item={null} />
        <EquippedItem type="accessory3" item={null} />
      </View>
    </View>
  );
};

interface EquippedItemProps {
  type: string;
  item: Item | null;
}

const EquippedItem: React.FC<EquippedItemProps> = ({ type, item }) => {
  return (
    <View className="h-[50px] w-[50px] rounded-md bg-white">
      <Image
        source={item ? (item.path ? itemPaths[Number(item.id)] : null) : null}
        className="h-full w-full rounded-md"
        resizeMode="contain"
      />
    </View>
  );
};

export default EquippedItems;
