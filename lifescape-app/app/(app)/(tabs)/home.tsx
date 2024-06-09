import {
  View,
  Text,
  TouchableHighlight,
  Button,
  Modal,
  SafeAreaView,
} from "react-native";

import React, { useState, useEffect } from "react";

import { useGlobalContext } from "@/context/GlobalProvider";

const Home = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [characterCreationModalVisible, setCharacterCreationModalVisible] =
    useState<boolean>(false);

  const { userCharacter, setUserCharacter } = useGlobalContext();

  return (
    <SafeAreaView>
      {userCharacter ? (
        <Text>{userCharacter.name}</Text>
      ) : (
        <View>
          <Text>Plase make a character</Text>
          <TouchableHighlight
            onPress={() => setCharacterCreationModalVisible(true)}
            className="bg-[#FDFDFD] w-[225px] h-[45px] rounded-md mt-4"
            underlayColor="#FFFFFF"
          >
            <Text className="text-black text-xl font-semibold mx-auto my-auto">
              Make your Character
            </Text>
          </TouchableHighlight>
          <Modal
            animationType="slide"
            transparent={true}
            visible={characterCreationModalVisible}
          >
            <SafeAreaView className="bg-red-400 h-full p-20">
              <Text>Hello</Text>
              <Button
                title="close"
                onPress={() => setCharacterCreationModalVisible(false)}
              ></Button>
            </SafeAreaView>
          </Modal>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Home;
