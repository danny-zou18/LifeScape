import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import React from "react";

// Sample inventory data with images
const inventoryData = [
  { id: "1", name: "Health Potion", quantity: 10, image: require("../../../../assets/Inventory/test.png") },
  { id: "2", name: "Mana Potion", quantity: 5, image: require("../../../../assets/Inventory/test.png") },
  { id: "3", name: "Sword", quantity: 1, image: require("../../../../assets/Inventory/test.png") },
  { id: "4", name: "Shield", quantity: 1, image: require("../../../../assets/Inventory/test.png") },
  { id: "5", name: "Bow", quantity: 2, image: require("../../../../assets/Inventory/test.png") },
];

const Inventory = () => {
  // Render each item in the inventory
  const renderItem = ({ item }: { item: { id: string; name: string; quantity: number; image: any } }) => (
    <View style={styles.itemContainer}>
      <Image source={item.image} style={styles.itemImage} />
      <View style={styles.textContainer}>
        <Text style={styles.itemText}>{item.name}</Text>
        <Text style={styles.quantityText}>Qty: {item.quantity}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inventory</Text>
      <FlatList
        data={inventoryData}
        keyExtractor={(item) => item.id}
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
});

export default Inventory;
