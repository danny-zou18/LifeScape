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
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);
  interface Item {
    id: string;
    name: string;
    price: number;
    image: string;
    description: string;
    condition: string;
    seller: string;
  }
  
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');
  const [items, setItems] = useState([
    { 
      id: '1', 
      name: 'Item 1', 
      price: 10,
      image: 'https://via.placeholder.com/150',
      description: 'A detailed description of Item 1. This item is perfect for your needs!',
      condition: 'New',
      seller: 'John Doe'
    },
    { 
      id: '2', 
      name: 'Item 2', 
      price: 20,
      image: 'https://via.placeholder.com/150',
      description: 'A detailed description of Item 2. Great value for money!',
      condition: 'Used - Like New',
      seller: 'Jane Smith'
    },
    { 
      id: '3', 
      name: 'Item 3', 
      price: 30,
      image: 'https://via.placeholder.com/150',
      description: 'A detailed description of Item 3. Don\'t miss this amazing deal!',
      condition: 'Used - Good',
      seller: 'Mike Johnson'
    },
    { 
      id: '4', 
      name: 'Item 4', 
      price: 40,
      image: 'https://via.placeholder.com/150',
      description: 'A detailed description of Item 4. Limited time offer!',
      condition: 'New',
      seller: 'Sarah Wilson'
    },
  ]);

  const handleAddItem = () => {
    if (newItemName && newItemPrice) {
      const newItem = {
        id: (items.length + 1).toString(),
        name: newItemName,
        price: parseFloat(newItemPrice),
        image: 'https://via.placeholder.com/150',
        description: 'No description provided',
        condition: 'New',
        seller: 'Anonymous'
      };
      setItems([...items, newItem]);
      setModalVisible(false);
      setNewItemName('');
      setNewItemPrice('');
    }
  };

  const handleItemPress = (item: Item) => {
    setSelectedItem(item);
    setDetailsModalVisible(true);
  };

  const screenWidth = Dimensions.get('window').width;
  const numColumns = 2;
  const itemWidth = (screenWidth - (styles.container.padding * 2) - (numColumns - 1) * 10) / numColumns;

  const renderItem = ({ item }: { item: Item }) => (
    <TouchableOpacity 
      style={[styles.gridItem, { width: itemWidth }]}
      onPress={() => handleItemPress(item)}
    >
      <Image 
        source={{ uri: item.image }} 
        style={styles.itemImage}
        resizeMode="cover"
      />
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>${item.price}</Text>
      </View>
    </TouchableOpacity>
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

      {/* Item Details Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={detailsModalVisible}
        onRequestClose={() => setDetailsModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setDetailsModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={[styles.modalContainer, styles.detailsModalContainer]}>
                <View style={styles.modalContent}>
                  {selectedItem && (
                    <>
                      <Image 
                        source={{ uri: selectedItem.image }} 
                        style={styles.detailsImage}
                        resizeMode="cover"
                      />
                      <Text style={styles.detailsTitle}>{selectedItem.name}</Text>
                      <Text style={styles.detailsPrice}>${selectedItem.price}</Text>
                      
                      <View style={styles.detailsSection}>
                        <Text style={styles.detailsLabel}>Condition</Text>
                        <Text style={styles.detailsText}>{selectedItem.condition}</Text>
                      </View>
                      
                      <View style={styles.detailsSection}>
                        <Text style={styles.detailsLabel}>Seller</Text>
                        <Text style={styles.detailsText}>{selectedItem.seller}</Text>
                      </View>
                      
                      <View style={styles.detailsSection}>
                        <Text style={styles.detailsLabel}>Description</Text>
                        <Text style={styles.detailsDescription}>
                          {selectedItem.description}
                        </Text>
                      </View>

                      <TouchableOpacity 
                        style={styles.buyButton}
                        onPress={() => {
                          // Add purchase logic here
                          setDetailsModalVisible(false);
                        }}
                      >
                        <Text style={styles.buttonText}>Buy Now</Text>
                      </TouchableOpacity>
                    </>
                  )}
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  detailsModalContainer: {
    width: '90%',
    maxWidth: 500,
  },
  detailsImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  detailsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  detailsPrice: {
    fontSize: 22,
    color: '#2ecc71',
    fontWeight: 'bold',
    marginBottom: 16,
  },
  detailsSection: {
    marginBottom: 16,
  },
  detailsLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginBottom: 4,
  },
  detailsText: {
    fontSize: 16,
    color: '#333',
  },
  detailsDescription: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  buyButton: {
    backgroundColor: '#2ecc71',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
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