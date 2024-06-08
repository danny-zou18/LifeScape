import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

const Account = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Account Details</Text>
      {"More details"}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    marginVertical: 20,
  },
});

export default Account;