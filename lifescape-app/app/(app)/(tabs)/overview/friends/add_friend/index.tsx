import {
  View,
  Text,
  ScrollView,
  TextInput,
  ActivityIndicator,
  TouchableHighlight,
} from "react-native";
import React, { useState } from "react";
import api from "@/api/axios";
import { useGlobalContext } from "@/context/GlobalProvider";
import { FieldValues, useForm, Controller } from "react-hook-form";
import { isAxiosError } from "axios";

const AddFriend = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useGlobalContext();

  const {
    setValue,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      friendUsername: "",
    },
  });

  const submitHandler = async ({ friendUsername }: FieldValues) => {
    setLoading(true);
    try {
      const response = await api.post(
        `/friends/add/${user.uid}`,
        {
          friendUsername: friendUsername,
        },
        {
          headers: {
            Authorization: await user.getIdToken(),
          },
        },
      );
      if (response.status === 200) {
        console.log(response.data);
        reset();
      }
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error.response?.data);
      } else {
        console.log(error);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <View>
      <ScrollView>
        <View className="mt-5 flex items-center justify-center">
          <View className="w-[85%]">
            <Text className="text-md ml-2 pb-1 text-neutral-700">Username</Text>
            <Controller
              control={control}
              name="friendUsername"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  id="friendUsername"
                  autoCapitalize="none"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  autoComplete="name"
                  className="h-[50px] w-full rounded-lg bg-black px-3 text-white"
                />
              )}
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
                  Add Friend
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
