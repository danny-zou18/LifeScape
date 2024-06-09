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

import CharacterCreationModal from "@/components/home/CharacterCreationModal";
import { isLoaded } from "expo-font";


const Home = () => {  
  const [loading, setLoading] = useState<boolean>(false);
  const [characterCreationModalVisible, setCharacterCreationModalVisible] =
    useState<boolean>(false);

  const { userCharacter } = useGlobalContext();

  return (
    <SafeAreaView>
      {userCharacter ? (
        <Text>{userCharacter.name}</Text>
      ) : (
        <CharacterCreationModal isOpen={characterCreationModalVisible} setOpen={setCharacterCreationModalVisible} isLoading={loading} setIsLoading={setLoading}  />
      )}
    </SafeAreaView>
  );
};

export default Home;
