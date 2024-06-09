import {
  View,
  Text,
  TouchableHighlight,
  Button,
  Modal,
  SafeAreaView,
  Image
} from "react-native";
import React, { useState, useEffect } from "react";

import { useGlobalContext } from "@/context/GlobalProvider";

import CharacterCreationModal from "@/components/home/CharacterCreationModal";

const Home = () => {  
  const [loading, setLoading] = useState<boolean>(false);
  const [characterCreationModalVisible, setCharacterCreationModalVisible] =
    useState<boolean>(false);

  const { userCharacter } = useGlobalContext();

  return (
    <SafeAreaView>
      {userCharacter ? (
        <View className="bg-red-300 flex flex-row h-[17vh] p-5">
            <Text>Hello</Text>
        </View>
      ) : (
        <CharacterCreationModal isOpen={characterCreationModalVisible} setOpen={setCharacterCreationModalVisible} isLoading={loading} setIsLoading={setLoading}  />
      )}
    </SafeAreaView>
  );
};

export default Home;
