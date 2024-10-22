import React, { useState } from "react";
import { 
  View, Text, Modal, TextInput, Button, Alert, TouchableHighlight 
} from "react-native";
import { firebase } from "@react-native-firebase/auth";

const LoginMethod = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  
  const user = firebase.auth().currentUser;

  const modalSwitch = () => setIsModalVisible(!isModalVisible);

  const handlePasswordUpdate = async () => {
    try {
      await user?.updatePassword(newPassword);
      Alert.alert("Success", "Password updated successfully!");
      modalSwitch();
    } catch (error) {
      Alert.alert("Error", "Failed to update password");
    }
  };

  return (
    <>
  <Modal visible={isModalVisible} animationType="slide" transparent={true}>
      <View className="flex-1 justify-center items-center">
        <View className="bg-white p-5 rounded-lg w-4/5">
          <Text className="mb-2 text-lg font-semibold">
            Enter New Password
          </Text>

          <TextInput
            secureTextEntry
            placeholder="New Password"
            value={newPassword}
            onChangeText={setNewPassword}
            className="border-b mb-5 p-2 text-base"
          />

          <Button title="Update Password" onPress={handlePasswordUpdate} />
          <View className="mt-2">
            <Button title="Close" onPress={() => setIsModalVisible(false)} />
          </View>
        </View>
      </View>
    </Modal>
      {/* Login Methods Section */}
      <View>
        <Text className="mb-1 ml-2 font-[600]">LOGIN METHODS</Text>
        <View className="w-full rounded-lg bg-white px-4 py-2 shadow-md">
          <View className="flex flex-row items-center justify-between">
            <View>
              <Text className="text-lg font-semibold">Password</Text>
              <Text>Set</Text>
            </View>
            <TouchableHighlight onPress={modalSwitch} underlayColor="#DDDDDD">
              <Text className="text-lg font-[400]">Change Password</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </>
  );
};

export default LoginMethod;
