import { View, Text, TouchableOpacity, Alert, Modal, TextInput } from "react-native";
import React, { useState } from "react";
import { useGlobalContext } from "@/context/GlobalProvider";
import { FIREBASE_AUTH } from "@/FirebaseConfig";
import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import api from "@/api/axios";

const AccountAction = () => {
  const { user, setUser } = useGlobalContext();
  const auth = FIREBASE_AUTH;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const confirmDeleteAccount = () => {
    setIsModalVisible(true); // Show modal for password input
  };

  const reauthenticateUser = async () => {
    if (!user || !password) return;

    try {
      const credential = EmailAuthProvider.credential(user.email, password);
      await reauthenticateWithCredential(user, credential);
      handleDeleteAccount(); // Proceed to delete the account after reauthentication
      setIsModalVisible(false); // Close the modal
    } catch (error) {
      setErrorMessage("Reauthentication failed. Please check your password.");
      console.error("Reauthentication error:", error);
    }
  };

  const handleDeleteAccount = async () => {
    if (!user) return;

    try {
      console.log("Deleting account from server...");

      // API call to delete account data on your server
      const idToken = await user.getIdToken();
      await api.delete(`/auth/delete-account/${user.uid}`, {
        headers: { Authorization: `Bearer ${idToken}` },
      });
      console.log("Successfully deleted account data from server.");

      console.log("Deleting account from Firebase...");
      await user.delete();
      setUser(null);
      Alert.alert("Account Deleted", "Your account has been successfully deleted.");
    } catch (error) {
      console.error("Error deleting account:", error);
      Alert.alert("Error", "Failed to delete account. Please try again.");
    }
  };

  return (
    <View>
      <Text className="mb-1 font-[600]">ACCOUNT ACTION</Text>
      <View className="w-full rounded-lg bg-white px-4 py-2 shadow-md items-center">
        <TouchableOpacity onPress={confirmDeleteAccount} className="items-center">
          <Text className="text-lg font-semibold text-red-600">Delete Account</Text>
        </TouchableOpacity>
      </View>

      {/* Modal for password input */}
      <Modal visible={isModalVisible} transparent animationType="slide">
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
          <View className="w-72 p-6 bg-white rounded-lg">
            <Text className="text-lg font-semibold mb-4 text-center">Enter Password to Confirm</Text>
            <TextInput
              secureTextEntry
              placeholder="Password"
              className="w-full p-2 border border-gray-300 rounded mb-3"
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            {errorMessage ? <Text className="text-red-500 mb-3">{errorMessage}</Text> : null}
            <TouchableOpacity onPress={reauthenticateUser} className="bg-red-500 py-2 rounded mb-3">
              <Text className="text-center text-white font-semibold">Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsModalVisible(false)} className="py-2">
              <Text className="text-center text-gray-600">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AccountAction;
