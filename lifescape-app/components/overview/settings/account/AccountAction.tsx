import { View, Text, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useGlobalContext } from "@/context/GlobalProvider"; // Adjust based on your setup
import { FIREBASE_AUTH } from "@/FirebaseConfig"; // Import Firebase auth
import api from "@/api/axios"; // Ensure this is set up correctly

const AccountAction = () => {
  const { user, setUser } = useGlobalContext(); // Adjust based on your context setup
  const navigation = useNavigation();
  const auth = FIREBASE_AUTH; // Firebase auth instance

  const confirmDeleteAccount = () => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete your account? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive"},
      ]
    );
  };

  return (
    <View>
      <Text className="mb-1 font-[600]">ACCOUNT ACTION</Text>
      <View className="w-full rounded-lg bg-white px-4 py-2 shadow-md">
        <TouchableOpacity onPress={confirmDeleteAccount} className="items-center">
          <Text className="text-lg font-semibold text-red-600">Delete Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AccountAction;
