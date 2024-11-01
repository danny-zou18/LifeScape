import { View, Text, StyleSheet, FlatList, Image, Dimensions } from "react-native";
import React from "react";
import { useState } from "react";

const Market = () => {
  const [currency, setCurrency] = useState(100);

  // Updated test items with image URLs
  const testItems = [
    { 
      id: '1', 
      name: 'Item 1', 
      price: 10,
      image: 'https://via.placeholder.com/150'  // Replace with your actual image URLs
    },
    { 
      id: '2', 
      name: 'Item 2', 
      price: 20,
      image: 'https://via.placeholder.com/150'
    },
    { 
      id: '3', 
      name: 'Item 3', 
      price: 30,
      image: 'https://via.placeholder.com/150'
    },
    { 
      id: '4', 
      name: 'Item 4', 
      price: 40,
      image: 'https://via.placeholder.com/150'
    },
  ];

  // Calculate the width of each grid item (2 columns with padding)
  const screenWidth = Dimensions.get('window').width;
  const numColumns = 2;
  const itemWidth = (screenWidth - (styles.container.padding * 2) - (numColumns - 1) * 10) / numColumns;

  const renderItem = ({ item }) => (
    <View style={[styles.gridItem, { width: itemWidth }]}>
      <Image 
        source={{ uri: item.image }} 
        style={styles.itemImage}
        resizeMode="cover"
      />
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>${item.price}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerContent}>
          <Text style={styles.header}>Market</Text>
          <Text style={styles.currency}>${currency}</Text>
        </View>
      </View>
      <FlatList
        data={testItems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.gridContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  headerContainer: {
    backgroundColor: '#1a1a1a',
    padding: 16,
    paddingTop: 48,
    marginHorizontal: -16,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
    textAlign: 'center',
  },
  currency: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2ecc71',
    position: 'absolute',
    right: 0,
  },
  gridContainer: {
    paddingVertical: 16,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  gridItem: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  itemImage: {
    width: '100%',
    height: 150,
    backgroundColor: '#eee',
  },
  itemInfo: {
    padding: 12,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 16,
    color: '#2ecc71',
    fontWeight: '500',
  },
});

export default Market;  