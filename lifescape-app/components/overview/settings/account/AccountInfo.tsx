import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { isAxiosError } from "axios";
import api from "@/api/axios";
import { useGlobalContext } from "@/context/GlobalProvider";

const AccountInfo = () => {
  const { user, psqlUser } = useGlobalContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);

  // Function to refresh user from Firebase and check email verification status
  const refreshUser = async () => {
    if (user) {
      await user.reload(); // Reload user information from Firebase
      if (user.emailVerified) {
        console.log("User is verified");
        setMessage("Your email is now verified!");
      } else {
        setMessage("Your email is not yet verified.");
      }
    }
  };

  // Automatically check email verification when component mounts or psqlUser changes
  useEffect(() => {
    if (psqlUser && !psqlUser?.emailVerified) {
      refreshUser(); // Check if the user is verified
    }
  });

  const sendVerificationEmail = async () => {
    if (!user) {
      console.log("User is not authenticated");
      setMessage("User is not authenticated");
      return;
    }

    console.log("sending email verification");

    const idToken = await user.getIdToken();
    console.log("ID Token:", idToken);
    console.log("User ID:", user.uid);

    setLoading(true);
    setMessage(null); // Reset any previous message

    try {
      const response = await api.post(
        `/auth/verify-email/${user.uid}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${idToken}`, // Use idToken here
          },
        },
      );
      setMessage("Verification email sent successfully.");
      console.log("Verification email sent:", response.data.verificationLink);
    } catch (error) {
      console.log("error: ", error);
      console.log("failed to send");
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
              user?.emailVerified ? "text-green-600" : "text-red-600"
            }`}
          >
            {user?.emailVerified ? "Verified" : "Not Verified"}
          </Text>
        </View>

        {!user?.emailVerified && (
          <>
            <TouchableOpacity
              onPress={async () => {
                await sendVerificationEmail();
              }}
              disabled={loading}
              className="mt-3 rounded-lg bg-blue-500 px-4 py-2"
            >
              <Text className="text-center text-white">
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  "Send Verification Email"
                )}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={refreshUser}
              className="mt-3 rounded-lg bg-gray-500 px-4 py-2"
            >
              <Text className="text-center text-white">
                Refresh Verification Status
              </Text>
            </TouchableOpacity>
          </>
        )}

        {message && (
          <Text className="mt-2 text-center text-sm text-blue-500">
            {message}
          </Text>
        )}
      </View>
    </View>
  );
};

export default AccountInfo;
