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

import CharacterOverview from "@/components/home/CharacterOverview";
import CharacterCreationModal from "@/components/home/CharacterCreationModal";

const Home = () => {  
  const [loading, setLoading] = useState<boolean>(false);
  const [characterCreationModalVisible, setCharacterCreationModalVisible] =
    useState<boolean>(false);

  const { userCharacter } = useGlobalContext();

  return (
    <SafeAreaView>
      {userCharacter ? (
        <CharacterOverview />
      ) : (
        <CharacterCreationModal isOpen={characterCreationModalVisible} setOpen={setCharacterCreationModalVisible} isLoading={loading} setIsLoading={setLoading}  />
      )}
    </SafeAreaView>
  );
};

export default Home;
