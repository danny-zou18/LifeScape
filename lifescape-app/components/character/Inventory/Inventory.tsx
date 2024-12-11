import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Text,
  TextInput,
  Modal,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import IndividualItem from "./IndividualItem";
import { Item } from "@/types/db_types";

interface InventoryProps {
  inventoryData: Item[];
  equippedItems: Item[];
}

const Inventory: React.FC<InventoryProps> = ({ inventoryData, equippedItems }) => {
  const [inventory, setInventory] = useState<Item[]>([]);
  const [equipped, setEquipped] = useState<Item[]>(equippedItems);
  const [filteredInventory, setFilteredInventory] = useState<Item[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [sortOption, setSortOption] = useState<"name" | "rarity">("name");

  const screenWidth = Dimensions.get("window").width;
  const numColumns = Math.floor(screenWidth / 60);

  useEffect(() => {
    const paddedInventory = [
      ...inventoryData,
      ...Array(102 - inventoryData.length).fill({
        id: "empty",
        name: "",
        rarity: 0,
        cost: 0,
        quantity: 0,
        path: "",
      }),
    ];
    setInventory(paddedInventory);
    setFilteredInventory(paddedInventory);
  }, [inventoryData]);

  useEffect(() => {
    if (searchQuery) {
      const filtered = inventory.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredInventory(filtered);
    } else {
      setFilteredInventory(inventory);
    }
  }, [searchQuery, inventory]);

  useEffect(() => {
    const sorted = [...filteredInventory].sort((a, b) =>
      sortOption === "name"
        ? a.name.localeCompare(b.name)
        : b.rarity - a.rarity
    );
    setFilteredInventory(sorted);
  }, [sortOption]);

  const handleLongPress = (item: Item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const handleEquipItem = (item: Item) => {
    if (item.id !== null) {
      setEquipped([...equipped, item]);
      setInventory(inventory.filter((invItem) => invItem.id !== item.id));
    }
  };

  const handleUnequipItem = (item: Item) => {
    setEquipped(equipped.filter((equipItem) => equipItem.id !== item.id));
    setInventory([...inventory, item]);
  };

  return (
    <View className="mt-8 h-[60%]">
      {/* Search Bar */}
      <TextInput
        className="h-10 mb-4 rounded-lg border bg-gray-200 px-4"
        placeholder="Search items..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Sorting Options */}
      <View className="flex flex-row justify-center mb-4">
        <TouchableOpacity
          className="px-4 py-2 mr-2 rounded-md bg-blue-500"
          onPress={() => setSortOption("name")}
        >
          <Text className="text-white">Sort by Name</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="px-4 py-2 rounded-md bg-blue-500"
          onPress={() => setSortOption("rarity")}
        >
          <Text className="text-white">Sort by Rarity</Text>
        </TouchableOpacity>
      </View>

      {/* Equipped Items */}
      <View className="mb-4">
        <Text className="text-lg font-bold text-center">Equipped Items</Text>
        <FlatList
          data={equipped}
          horizontal
          keyExtractor={(item, index) => item.id.toString() + index}
          renderItem={({ item }) => (
            <TouchableOpacity onLongPress={() => handleUnequipItem(item)}>
              <IndividualItem item={item} />
            </TouchableOpacity>
          )}
          contentContainerStyle={{ justifyContent: "center" }}
        />
      </View>

      {/* Inventory Grid */}
      <FlatList
        data={filteredInventory}
        keyExtractor={(item, index) => item.id.toString() + index}
        renderItem={({ item }) => (
          <TouchableOpacity
            onLongPress={() => handleLongPress(item)}
            onPress={() => handleEquipItem(item)}
          >
            <IndividualItem item={item} />
          </TouchableOpacity>
        )}
        numColumns={numColumns}
        bounces={false}
      />

      {/* Tooltip Modal */}
      {selectedItem && (
        <Modal
          visible={modalVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View className="flex-1 justify-center items-center bg-black/50">
            <View className="bg-white p-6 rounded-lg">
              <Text className="text-xl font-bold mb-2">{selectedItem.name}</Text>
              <Text>Rarity: {selectedItem.rarity}</Text>
              <Text>Quantity: {selectedItem.Quantity}</Text>
              <Text>Cost: {selectedItem.cost}</Text>
              <TouchableOpacity
                className="mt-4 px-4 py-2 bg-blue-500 rounded-md"
                onPress={() => setModalVisible(false)}
              >
                <Text className="text-white">Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default Inventory;
