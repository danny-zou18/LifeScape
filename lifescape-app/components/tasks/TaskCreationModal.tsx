import {
  View,
  Text,
  Modal,
  TouchableHighlight,
  Button,
  SafeAreaView,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useState } from "react";

import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

interface TaskCreationModalProps {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const TaskCreationModal: React.FC<TaskCreationModalProps> = ({
  isOpen,
  setOpen,
}) => {
  const [date, setDate] = useState(new Date());

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <Modal
      animationType="slide"
      visible={isOpen}
      onRequestClose={() => {
        setOpen(false);
      }}
    >
      <SafeAreaView>
        <View className="flex flex-row">
          <Button title="Cancel" onPress={() => setOpen(false)}></Button>
        </View>
        <ScrollView className="h-full">
          <View className="flex items-center justify-center mt-5">
            <View>
              <Text className="ml-2 text-md text-neutral-700 pb-1">Name</Text>
              <TextInput
                id="name"
                autoCapitalize="none"
                // onChangeText={(text) => setValue('name', text)}
                autoComplete="name"
                className="w-[300px] h-[50px] bg-black rounded-lg text-white px-3"
              />
            </View>
            <View className="mt-5">
              <Text className="ml-2 text-md text-neutral-700 pb-1">
                Description
              </Text>
              <TextInput
                id="name"
                autoCapitalize="none"
                // onChangeText={(text) => setValue('name', text)}
                autoComplete="name"
                className="w-[300px] h-[50px] bg-black rounded-lg text-white px-3"
                numberOfLines={2}
              />
            </View>
            <View className="mt-5 flex w-[300px]">
              <Text className="ml-2 text-md text-neutral-700 pb-1">
                Due Date
              </Text>
              <View className="w-full h-[50px] bg-black rounded-lg text-white px-3 flex flex-row justify-center items-center">
                <DateTimePicker
                  value={date}
                  mode="date"
                  display="default"
                  onChange={onChange}
                  minimumDate={new Date()}
                />
                <DateTimePicker
                  value={date}
                  mode="time"
                  display="default"
                  onChange={onChange}
                  minimumDate={new Date()}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

export default TaskCreationModal;
