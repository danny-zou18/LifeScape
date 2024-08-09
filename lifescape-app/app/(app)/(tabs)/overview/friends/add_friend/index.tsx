import { View, Text, ScrollView, TextInput, ActivityIndicator, TouchableHighlight } from "react-native";
import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

const AddFriend = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const {
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      friendUsername: "",
    },
  });

  const submitHandler = async ({friendUsername}: FieldValues) => {
    setLoading(true);
  }  
  return (
    <View>
      <ScrollView>
        <View className="mt-5 flex items-center justify-center">
          <View className="w-[85%]">
            <Text className="text-md ml-2 pb-1 text-neutral-700">Username</Text>
            <TextInput
              id="friendUsername"
              autoCapitalize="none"
              onChangeText={(text) => setValue("friendUsername", text)}
              autoComplete="name"
              className="h-[50px] w-full rounded-lg bg-black px-3 text-white"
            />
          </View>
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <>
              <TouchableHighlight
                className="mt-10 h-[45px] w-[225px] rounded-md bg-[#000000]"
                underlayColor="#FFFFFF"
                onPress={handleSubmit(submitHandler)}
              >
                <Text className="mx-auto my-auto text-xl font-semibold text-white">
                  Add to Routine
                </Text>
              </TouchableHighlight>
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default AddFriend;
