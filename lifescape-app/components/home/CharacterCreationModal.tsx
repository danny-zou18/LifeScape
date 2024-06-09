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

interface CharacterCreationModalProps {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const CharacterCreationModal: React.FC<CharacterCreationModalProps> = ({
  isOpen,
  setOpen,
}) => {
  const [characterName, setCharacterName] = useState<string>("");

    const handle_creation = () => {
        console.log(characterName);
        
    }


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
