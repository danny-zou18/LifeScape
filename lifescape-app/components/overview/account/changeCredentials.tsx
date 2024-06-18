import { Text, View, Modal, Button, SafeAreaView, TextInput} from 'react-native';
import React, { useState } from 'react';

const ChangeUsernameModal = () => {
    const [isModalVisible, setModalVisible] = useState(false);

    return (
        <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
            <Button
                title="Change username or password"
                onPress={() => setModalVisible(true)}
                color="midnightblue"
            />
            <Modal
                visible={isModalVisible}
                onRequestClose={() => setModalVisible(false)}
                animationType="slide" // none, slide, fade
                presentationStyle="formSheet"> // fullScreen, pageSheet, formSheet, overFullScreen

                <SafeAreaView>
                    <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
                        <Text>Would you like to change username or password?</Text>
                        <Button title="Change username" color="black" onPress={() => console.log("do smth")}/>
                        <Button title="Change password" color="black" onPress={() => console.log("do smth")}/>

                        <Button title="Close" color="white" onPress={() => setModalVisible(false)} />
                    </View>
                </SafeAreaView>
            </Modal>
        </View>
    );
}