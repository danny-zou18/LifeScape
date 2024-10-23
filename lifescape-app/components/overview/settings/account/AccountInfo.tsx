import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useGlobalContext } from '@/context/GlobalProvider';
import api from '@/api/axios'; // Import your axios instance to handle API calls

const AccountInfo = () => {
  const { user, psqlUser } = useGlobalContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [polling, setPolling] = useState<boolean>(false); // Polling state
  const [message, setMessage] = useState<string | null>(null);

  // Function to refresh user from Firebase and check email verification status
  const refreshUser = async () => {
    if (user) {
      await user.reload(); // Reload user information from Firebase
      if (user.emailVerified) {
        console.log('User is verified');
        setMessage('Your email is now verified!');
        setPolling(false); // Stop polling when user is verified
      } else {
        setMessage('Your email is not yet verified.');
      }
    }
  };

  // Polling function to periodically check the user's email verification status
  const startPolling = () => {
    const interval = setInterval(async () => {
      await refreshUser();
      if (user?.emailVerified) {
        clearInterval(interval); // Stop polling if the user is verified
      }
    }, 10000); // Check every 10 seconds
  };

  // Automatically start polling after sending the verification email
  useEffect(() => {
    if (polling) {
      startPolling();
    }
    return () => setPolling(false); // Cleanup polling on component unmount
  }, [polling]);

  const sendVerificationEmail = async () => {
    if (!user) {
      console.log('User is not authenticated');
      setMessage('User is not authenticated');
      return;
    }

    setLoading(true);
    setMessage(null); // Reset any previous message

    try {
      console.log('Sending email verification');
      const idToken = await user.getIdToken(); // Ensure the ID token is generated correctly

      // Send request to your backend API to trigger the email
      await api.post(`/auth/verify-email/${user.uid}`, {}, {
        headers: {
          Authorization: `Bearer ${idToken}`, // Include Firebase ID token in the request
        },
      });

      // Set polling state to true after the email is sent
      setLoading(false);
      setMessage('Verification email sent successfully.');
      setPolling(true); // Start polling after the email is sent

    } catch (error) {
      console.log('Error sending email verification:', error);
      setMessage('Failed to send verification email.');
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
              user?.emailVerified ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {user?.emailVerified ? 'Verified' : 'Not Verified'}
          </Text>
        </View>

        {!user?.emailVerified && (
          <>
            <TouchableOpacity
              onPress={sendVerificationEmail}
              disabled={loading}
              style={{
                marginTop: 10,
                backgroundColor: '#4CAF50',
                borderRadius: 5,
                paddingVertical: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={{ color: '#fff' }}>Send Verification Email</Text>
              )}
            </TouchableOpacity>
          </>
        )}

        {message && <Text className="mt-2 text-center text-sm text-blue-500">{message}</Text>}
      </View>
    </View>
  );
};

export default AccountInfo;
