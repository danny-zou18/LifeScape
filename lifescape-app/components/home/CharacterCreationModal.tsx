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
import { isAxiosError } from "axios";
import api from "@/api/axios";

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
      const response = await api.post(
        `/character/create/${user.uid}`,
        {
          name: characterName,
        },
        {
          headers: {
            Authorization: await user.getIdToken(),
          },
        },
      );
      if (response.status === 201) {
        setUserCharacter(response.data);
      }
    } catch (error) {
      if (isAxiosError(error)) {
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
        className="mt-4 h-[45px] w-[225px] rounded-md bg-[#FDFDFD]"
        underlayColor="#FFFFFF"
      >
        <Text className="mx-auto my-auto text-xl font-semibold text-black">
          Make your Character
        </Text>
      </TouchableHighlight>
      <Modal animationType="slide" visible={isOpen}>
        <SafeAreaView className=" flex h-full flex-col items-center bg-red-400 p-20">
          <Text className="text-2xl">Create Your Character</Text>
          <View>
            <Text className="pb-1 text-xl text-neutral-700">Name</Text>
            <TextInput
              id="name"
              autoCapitalize="none"
              onChangeText={(text) => setCharacterName(text)}
              autoComplete="name"
              className="h-[60px] w-[300px] rounded-md bg-black px-3 text-white"
            />
          </View>
          <TouchableHighlight
            className="mt-4 h-[45px] w-[225px] rounded-md bg-[#FDFDFD]"
            underlayColor="#FFFFFF"
            onPress={() => handle_creation()}
          >
            <Text className="mx-auto my-auto text-xl font-semibold text-black">
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
