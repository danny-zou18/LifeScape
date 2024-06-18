import { Text, View, Modal, Button, SafeAreaView, TextInput} from 'react-native';
import React, { useState } from 'react';
import { reauthenticateWithCredential } from 'firebase/auth';

const ChangeCredentialsModal = () => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleChangeUsername = async () => {
        try {
            // authenticate smth

            const maskedEmail = email.substring(0, 4) + "****@" + email.substring(email.lastIndexOf("@") + 1);

            console.log(`Changing username for user ${user.displayName} with email ${maskedEmail}`);

            const enteredPassword = await TextInput.prompt('Enter your password');

            if (enteredPassword !== password) {
                console.error('Incorrect password');
                return;
            }

            const newUsername = await TextInput.prompt('Enter your new username');

            // Update the username in the Firebase user profile
            await user.updateProfile({ displayName: newUsername });

            console.log('Username has been changed successfully');

            setModalVisible(false);
        } catch (error) {
            console.error('Failed to change username', error);
        }
    };

    const handleChangePassword = () => {
        // Send a magic link to the user's email to change the password
        // Example:
        // axios.post('/api/send-magic-link', { email })
        //     .then(response => {
        //         // Handle success
        //         console.log('Magic link sent successfully');
        //     })
        //     .catch(error => {
        //         // Handle error
        //         console.error('Failed to send magic link', error);
        //     });

        // Close the modal after the magic link is sent
        setModalVisible(false);
    };

    const renderChangeUsernameModal = () => {
        return (
            <Modal
                visible={isModalVisible}
                onRequestClose={() => setModalVisible(false)}
                animationType="slide" // none, slide, fade
                presentationStyle="formSheet"> // fullScreen, pageSheet, formSheet, overFullScreen

                <SafeAreaView>
                    <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
                        <Text>Would you like to change username?</Text>
                        <Button title="Change username" color="black" onPress={handleChangeUsername}/>

                        <Button title="Close" color="white" onPress={() => setModalVisible(false)} />
                    </View>
                </SafeAreaView>
            </Modal>
        );
    };

    const renderChangePasswordModal = () => {
        return (
            <Modal
                visible={isModalVisible}
                onRequestClose={() => setModalVisible(false)}
                animationType="slide" // none, slide, fade
                presentationStyle="formSheet"> // fullScreen, pageSheet, formSheet, overFullScreen

                <SafeAreaView>
                    <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
                        <Text>Would you like to change password?</Text>
                        <Button title="Change password" color="black" onPress={handleChangePassword}/>

                        <Button title="Close" color="white" onPress={() => setModalVisible(false)} />
                    </View>
                </SafeAreaView>
            </Modal>
        );
    };

    return (
        <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
            <Button
                title="Change username"
                onPress={() => setModalVisible(true)}
                color="midnightblue"
            />
            <Button
                title="Change password"
                onPress={() => setModalVisible(true)}
                color="midnightblue"
            />

            {renderChangeUsernameModal()}
            {renderChangePasswordModal()}
        </View>
    );


}