import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  TextInput,
} from 'react-native';
import React, { useState, useRef } from 'react';
import { isAxiosError } from "axios";
import api from "@/api/axios";
import { useGlobalContext } from '@/context/GlobalProvider';

const AccountInfo = () => {
  const { user, psqlUser } = useGlobalContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [verificationCode, setVerificationCode] = useState<string[]>(Array(6).fill(''));
  
  const sendVerificationEmail = async () => {
    setLoading(true);
    setMessage(null); // Reset any previous message
    try {
      const send = await api.post(`/auth/post/verify-email/${user.uid}`, {
        headers: {
          Authorization: await user.getIdToken(),
        },
      });
      setMessage('Verification email sent successfully.');
      setIsModalVisible(true); // Show modal to enter verification code
    } catch (error) {
      setMessage('Failed to send verification email.');
      if (isAxiosError(error)) {
        console.log(error.response?.data);
      } else {
        console.log(error);
      }
    } finally {
      setLoading(false);
    }
  };

  const submitVerificationCode = async () => {
    if (verificationCode.length !== 6) {
      setMessage('Please enter a valid 6-digit code.');
      return;
    }
    setLoading(true);
    setMessage(null); // Reset message
    try {
      const verify = await api.post(`/auth/post/confirm-verification/${user.uid}`, {
        code: verificationCode,
        headers: {
          Authorization: await user.getIdToken(),
        },
      });
      setMessage('Verification successful.');
      setIsModalVisible(false); // Close modal after successful verification
    } catch (error) {
      setMessage('Failed to verify code.');
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
              psqlUser?.emailVerified ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {psqlUser?.emailVerified ? 'Verified' : 'Not Verified'}
          </Text>
        </View>

        {!psqlUser?.emailVerified && (
          <TouchableOpacity
            onPress={() => setIsModalVisible(true)}
            disabled={loading}
            className="mt-3 bg-blue-500 rounded-lg py-2 px-4"
          >
            <Text className="text-white text-center">
              {loading ? <ActivityIndicator color="#fff" /> : 'Send Verification Email'}
            </Text>
          </TouchableOpacity>
        )}

        {message && <Text className="mt-2 text-center text-sm text-blue-500">{message}</Text>}
      </View>

      {/* Modal for 6-digit code entry */}
      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
          <View className="bg-white w-80 p-5 rounded-lg shadow-lg">
            <Text className="text-lg font-bold mb-2">Verify it’s you</Text>
            <Text className="mb-4">Enter the verification code we've sent to your email.</Text>

            <View className="flex-row justify-between mb-4">
              {verificationCode.map((digit, i) => (
                <TextInput
                  key={i}
                  ref={(el) => (inputsRef.current[i] = el)}
                  style={{
                    width: 40,
                    height: 50,
                    borderColor: 'gray',
                    borderWidth: 1,
                    textAlign: 'center',
                    fontSize: 20,
                    borderRadius: 5,
                  }}
                  maxLength={1}
                  keyboardType="numeric"
                  onChangeText={(value) => handleInputChange(value, i)}
                  onKeyPress={(event) => handleKeyPress(event, i)}
                  value={digit}
                />
              ))}
            </View>

            <View className="flex-row justify-between">
              <TouchableOpacity
                onPress={() => setIsModalVisible(false)}
                className="bg-red-500 py-2 px-4 rounded-md"
              >
                <Text className="text-white">Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={submitVerificationCode} className="bg-blue-500 py-2 px-4 rounded-md">
                <Text className="text-white">{loading ? <ActivityIndicator color="#fff" /> : 'Verify'}</Text>
              </TouchableOpacity>
            </View>

            {message && <Text className="mt-2 text-center text-sm text-blue-500">{message}</Text>}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AccountInfo;
