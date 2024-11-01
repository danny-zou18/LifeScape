import { View, Text, StyleSheet, FlatList } from "react-native";
import React from "react";

const testItems = [
  { id: '1', name: 'Item 1', price: 10 },
  { id: '2', name: 'Item 2', price: 20 },
  { id: '3', name: 'Item 3', price: 30 },
];

const market = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Market</Text>
      <FlatList
        data={testItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>${item.price}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemName: {
    fontSize: 18,
  },
  itemPrice: {
    fontSize: 18,
  },
});

export default market;
