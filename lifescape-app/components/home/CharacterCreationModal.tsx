import {
  View,
  Text,
  TouchableHighlight,
  Modal,
  Button,
  SafeAreaView,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import axios from "axios";

import { useGlobalContext } from "@/context/GlobalProvider";

interface CharacterCreationModalProps {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
const CharacterCreationModal: React.FC<CharacterCreationModalProps> = ({
  isOpen,
  setOpen,
  isLoading,
  setIsLoading,
}) => {
  const { user, setUserCharacter } = useGlobalContext();

  const [characterName, setCharacterName] = useState<string>("");

  const handle_creation = async () => {
    setIsLoading(true);
    console.log(characterName);
    try {
      const response = await axios.post(
        `http://128.113.145.204:8000/character/create/${user.uid}`,
        {
          name: characterName,
        },
        {
          headers: {
            Authorization: await user.getIdToken(),
          },
        }
      );
        setUserCharacter(response.data.character);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // AxiosError type will have a response property
        console.log(error.response?.data);
      } else {
        // Handle other error types if needed
        console.log(error);
      }
    } finally {
      setIsLoading(false);
      setOpen(false);
    }
  };
  return (
    <View>
      <Text>Plase make a character</Text>
      <TouchableHighlight
        onPress={() => setOpen(true)}
        className="bg-[#FDFDFD] w-[225px] h-[45px] rounded-md mt-4"
        underlayColor="#FFFFFF"
      >
        <Text className="text-black text-xl font-semibold mx-auto my-auto">
          Make your Character
        </Text>
      </TouchableHighlight>
      <Modal animationType="slide" visible={isOpen}>
        <SafeAreaView className=" bg-red-400 h-full p-20 flex flex-col items-center">
          <Text className="text-2xl">Create Your Character</Text>
          <View>
            <Text className="text-xl text-neutral-700 pb-1">Name</Text>
            <TextInput
              id="name"
              autoCapitalize="none"
              onChangeText={(text) => setCharacterName(text)}
              autoComplete="name"
              className="w-[300px] h-[60px] bg-black rounded-md text-white px-3"
            />
          </View>
          <TouchableHighlight
            className="bg-[#FDFDFD] w-[225px] h-[45px] rounded-md mt-4"
            underlayColor="#FFFFFF"
            onPress={() => handle_creation()}
          >
            <Text className="text-black text-xl font-semibold mx-auto my-auto">
              Create Character
            </Text>
          </TouchableHighlight>
          <Button title="close" onPress={() => setOpen(false)}></Button>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

export default CharacterCreationModal;
