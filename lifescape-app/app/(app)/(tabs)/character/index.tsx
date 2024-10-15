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
          }
        );
        setInventoryData(response.data);
      } catch (error) {
        console.error("Failed to fetch inventory data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, []);

  // Function to get color based on rarity
  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 1:
        return "#d3d3d3"; // Common - Light Gray
      case 2:
        return "#00ff00"; // Uncommon - Green
      case 3:
        return "#0000ff"; // Rare - Blue
      case 4:
        return "#800080"; // Epic - Purple
      case 5:
        return "#ffa500"; // Legendary - Orange
      default:
        return "#ffffff"; // Default - White
    }
  };

  // Function to get rarity text based on rarity
  const getRarityText = (rarity) => {
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
    item: { id: string; name: string; Quantity: number; URL: string; cost: number; rarity: number };
  }) => (
    <View style={[styles.itemContainer, { backgroundColor: getRarityColor(item.rarity) }]}>
      <Image source={{ uri: item.URL }} style={styles.itemImage} />
      <View style={styles.textContainer}>
        <Text style={styles.itemText}>{item.name} ({getRarityText(item.rarity)})</Text>
        <Text style={styles.itemText}>Cost: {item.cost}💸</Text>
        <Text style={styles.quantityText}>Qty: {item.Quantity}</Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View className="mx-auto flex w-[90%] flex-col py-2">
        <ImageXpBar />
      </View>
      <Text style={styles.title} className="py-10">
        Inventory
      </Text>
      <FlatList
        data={inventoryData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        numColumns={2} // Set the grid with 2 columns
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    margin: 5,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    width: "50%",
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  itemText: {
    fontSize: 14,
  },
  quantityText: {
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 5,
  },
  itemImage: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Inventory;
