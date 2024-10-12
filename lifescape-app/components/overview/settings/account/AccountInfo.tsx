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

  // Create refs for each input field
  const inputsRef = useRef<Array<TextInput | null>>([]);

  const focusNext = (index: number) => {
    console.log("next");
    if (index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const focusPrevious = (index: number) => {
    console.log("previous");
    if (index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleInputChange = (value: string, index: number) => {
    const newCode = [...verificationCode];
    newCode[index] = value;

    setVerificationCode(newCode);

    if (value !== '') {
      focusNext(index);
    }
  };

  const handleKeyPress = (event: any, index: number) => {
    if (event.nativeEvent.key === 'Backspace') {
      const newCode = [...verificationCode];

      // If current box is empty and backspace is pressed, move to the previous box and delete
      if (newCode[index] === '') {
        if (index > 0) {
          focusPrevious(index);
          newCode[index - 1] = ''; // Clear the previous input
          setVerificationCode(newCode);
        }
      } else {
        // If the current box is not empty, clear it
        newCode[index] = '';
        setVerificationCode(newCode);
      }
    }
  };
  
  const sendVerificationEmail = async () => {
    if (!user) {
      console.log("User is not authenticated");
      setMessage('User is not authenticated');
      return;
    }
  
    console.log("sending email verification");
  
    const idToken = await user.getIdToken(); // Ensure this is not undefined
    console.log("ID Token:", idToken);
    console.log("User ID:", user.uid);
  
    setLoading(true);
    setMessage(null); // Reset any previous message
  
    try {
      console.log("trying to send");
  
      // Use the correct API route
      const response = await api.post(`/auth/verify-email/${user.uid}`, {}, {
        headers: {
          Authorization: `Bearer ${idToken}`,  // Use idToken here
        },
      });
      setMessage('Verification email sent successfully.');
      setIsModalVisible(true); // Show the modal for code entry
      console.log('Verification email sent:', response.data.verificationLink);
    } catch (error) {
      console.log("error: ", error);
      console.log("failed to send");
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
    console.log("submit");
    if (verificationCode.length !== 6) {
      setMessage('Please enter a valid 6-digit code.');
      return;
    }
    setLoading(true);
    setMessage(null); // Reset message
    try {
      const verify = await api.post(`/auth/confirm-verification/${user.uid}`, {
        code: verificationCode,  // Send the code in the body
      }, {
        headers: {
          Authorization: await user.getIdToken(),  // Send the Firebase ID token
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
            onPress={async () => {
              setIsModalVisible(true); // Open the modal
              await sendVerificationEmail(); // Call the function to send the email
            }}
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
