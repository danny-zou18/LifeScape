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
        <CharacterCreationModal isOpen={characterCreationModalVisible} setOpen={setCharacterCreationModalVisible} />
      )}
    </SafeAreaView>
  );
};

export default Home;
