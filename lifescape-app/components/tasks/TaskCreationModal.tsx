import {
  View,
  Text,
  Modal,
  TouchableHighlight,
  Button,
  SafeAreaView,
} from "react-native";
import React from "react";
import { set } from "react-hook-form";

interface TaskCreationModalProps {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const TaskCreationModal: React.FC<TaskCreationModalProps> = ({
  isOpen,
  setOpen,
}) => {
  return (
    <Modal animationType="slide" visible={isOpen}>
      <SafeAreaView>
        <Text>TaskCreationModal</Text>
        <Button title="Cancel" onPress={() => setOpen(false)}></Button>
      </SafeAreaView>
    </Modal>
  );
};

export default TaskCreationModal;
