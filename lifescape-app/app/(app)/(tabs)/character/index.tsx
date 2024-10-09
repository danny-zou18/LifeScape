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
        const response = await api.get(`/items/get/${user.uid}/${userCharacter?.id}`, {
          headers: {
            Authorization: await user.getIdToken(),
          },
        });
        setInventoryData(response.data);
      } catch (error) {
        console.error("Failed to fetch inventory data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, []);

  // Render each item in the inventory
  const renderItem = ({
    item,
  }: {
    item: { id: string; name: string; quantity: number; URL: string };
  }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.URL }} style={styles.itemImage} />
      <View style={styles.textContainer}>
      <Text style={styles.itemText}>{item.name}</Text>
      <Text style={styles.quantityText}>Qty: {item.quantity}</Text>
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
      <Text style={styles.title} className="py-10">Inventory</Text>
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
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    margin: 5,
    backgroundColor: "#fff",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    width: "48%", // Set the width to allow 2 columns
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  itemText: {
    fontSize: 18,
  },
  quantityText: {
    fontSize: 16,
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
