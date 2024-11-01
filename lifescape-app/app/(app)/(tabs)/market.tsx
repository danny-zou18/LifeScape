import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  Image, 
  Dimensions,
  TouchableOpacity,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback
} from "react-native";
import React from "react";
import { useState } from "react";

const Market = () => {
  const [currency, setCurrency] = useState(100);
  const [modalVisible, setModalVisible] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');
  const [items, setItems] = useState([
    { 
      id: '1', 
      name: 'Item 1', 
      price: 10,
      image: 'https://via.placeholder.com/150'
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
  ]);

  const handleAddItem = () => {
    if (newItemName && newItemPrice) {
      const newItem = {
        id: (items.length + 1).toString(),
        name: newItemName,
        price: parseFloat(newItemPrice),
        image: 'https://via.placeholder.com/150'
      };
      setItems([...items, newItem]);
      setModalVisible(false);
      setNewItemName('');
      setNewItemPrice('');
    }
  };

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
          <TouchableOpacity 
            style={styles.sellButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.sellButtonText}>Sell</Text>
          </TouchableOpacity>
          
          <Text style={styles.header}>Market</Text>
          
          <Text style={styles.currency}>${currency}</Text>
        </View>
      </View>
      
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.gridContainer}
      />

      {/* Add Item Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.modalContainer}
              >
                <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>Sell New Item</Text>
                  
                  <TextInput
                    style={styles.input}
                    placeholder="Item Name"
                    value={newItemName}
                    onChangeText={setNewItemName}
                  />
                  
                  <TextInput
                    style={styles.input}
                    placeholder="Price"
                    value={newItemPrice}
                    onChangeText={setNewItemPrice}
                    keyboardType="numeric"
                  />
                  
                  <View style={styles.modalButtons}>
                    <TouchableOpacity 
                      style={[styles.modalButton, styles.cancelButton]}
                      onPress={() => setModalVisible(false)}
                    >
                      <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                      style={[styles.modalButton, styles.addItemButton]}
                      onPress={handleAddItem}
                    >
                      <Text style={styles.buttonText}>Add Item</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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
    minWidth: 60,
    textAlign: 'right',
  },
  sellButton: {
    backgroundColor: '#2ecc71',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    minWidth: 60,
  },
  sellButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    maxWidth: 400,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#ff6b6b',
  },
  addItemButton: {
    backgroundColor: '#2ecc71',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Market;