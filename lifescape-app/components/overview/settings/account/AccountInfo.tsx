import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useState } from "react";
import { isAxiosError } from "axios";
import api from "@/api/axios";
import { useGlobalContext } from "@/context/GlobalProvider";

const AccountInfo = () => {
  const { user, psqlUser } = useGlobalContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);

  const sendVerificationEmail = async () => {
    setLoading(true);
    setMessage(null); // Reset any previous message
    try {
      const send = await api.post(`/auth/post/verify-email/${user.uid}`, {
        headers: {
          Authorization: await user.getIdToken(),
        },
      });
      setMessage("Verification email sent successfully.");
    } catch (error) {
      setMessage("Failed to send verification email.");
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
      <Text className="mb-1 ml-2 font-[600]">ACCOUNT INFO</Text>
      <View className="w-full rounded-lg bg-white px-3 py-2 shadow-md">
        <View>
          <Text className="text-lg font-semibold">Username:</Text>
          <Text className="text-base">{psqlUser?.username}</Text>
        </View>

        <View className="my-2">
          <Text className="text-lg font-semibold">Email:</Text>
          <Text className="text-base">{psqlUser?.email}</Text>
        </View>

        <View>
          <Text className="text-lg font-semibold">Email Verification:</Text>
          <Text
            className={`text-base ${
              psqlUser?.emailVerified ? "text-green-600" : "text-red-600"
            }`}
          >
            {psqlUser?.emailVerified ? "Verified" : "Not Verified"}
          </Text>
        </View>

        {!psqlUser?.emailVerified && (
          <TouchableOpacity
            onPress={sendVerificationEmail}
            disabled={loading}
            className="mt-3 bg-blue-500 rounded-lg py-2 px-4"
          >
            <Text className="text-white text-center">
              {loading ? <ActivityIndicator color="#fff" /> : "Send Verification Email"}
            </Text>
          </TouchableOpacity>
        )}

        {message && (
          <Text className="mt-2 text-center text-sm text-blue-500">{message}</Text>
        )}
      </View>
    </View>
  );
};

export default AccountInfo;
