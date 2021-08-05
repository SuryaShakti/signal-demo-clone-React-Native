import React, { useLayoutEffect, useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView } from 'react-native';
import styles from './styles';
import { ScrollView } from 'react-native';
import { Input } from 'react-native-elements';
import { TextInput } from 'react-native';
import { Keyboard } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';
import { Platform } from 'react-native';
import firebase from 'firebase/app';
import { auth, db } from '../../../firebase';


const ChatScreen = ({ navigation, route }) => {

    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: route.params.chatName,
            headerTitleAlign: 'left',
            headerBackTitleVisible: false,
            headerRight: () => (
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: 80,
                    marginRight: 20
                }} >
                    <TouchableOpacity activeOpacity={0.5} >
                        <FontAwesome name={'video-camera'} size={20} color={'white'} />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.5} >
                        <Ionicons name={'call'} size={20} color={'white'} />
                    </TouchableOpacity>
                </View>
            )
        })
    }, [navigation])

    const sendMessage = () => {
        Keyboard.dismiss();

        db.collection('chats').doc(route.params.id).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            photoURL: auth.currentUser.photoURL,
        })

        setInput('');
    }

    useLayoutEffect(() => {
        const unsubscribe = db.collection('chats').doc(route.params.id).collection('messages').orderBy('timestamp', 'asc').onSnapshot((snapshot) => {
            setMessages(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data()
                }))
            )
        })

        return unsubscribe;
    }, [route])


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <StatusBar style={'light'} />

            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={120}
            >
                <TouchableWithoutFeedback onPrss={Keyboard.dismiss}>
                    <>
                        <ScrollView style={{ paddingTop: 7, paddingBottom: 7 }}>
                            {
                                messages.map(({ id, data }) => (
                                    data.email === auth.currentUser.email ? (
                                        <View key={id} style={styles.reciever}>
                                            <Avatar
                                                rounded
                                                size={30}
                                                position={'absolute'}
                                                bottom={-15}
                                                right={-5}
                                                //WEB
                                                containerStyle={{
                                                    position: 'absolute',
                                                    bottom: -15,
                                                    right: -5
                                                }}
                                                source={{ uri: data.photoURL }}
                                            />
                                            <Text style={styles.recieverText}>{data.message}</Text>
                                        </View>
                                    ) : (
                                        <View key={id} style={styles.sender}>
                                            <Avatar
                                                rounded
                                                size={30}
                                                position={'absolute'}
                                                bottom={-15}
                                                left={-5}
                                                //WEB
                                                containerStyle={{
                                                    position: 'absolute',
                                                    bottom: -15,
                                                    left: -5
                                                }}
                                                source={{ uri: data.photoURL }}
                                            />
                                            <Text style={styles.senderText}>{data.message}</Text>
                                            <Text style={styles.senderName}>{data.displayName}</Text>
                                        </View>
                                    )
                                ))
                            }
                        </ScrollView>
                        <View style={styles.footer}>
                            <TextInput
                                placeholder={'Type your message here'}
                                value={input}
                                onChangeText={text => setInput(text)}
                                style={styles.textInput}
                                onSubmitEditing={sendMessage}
                            />
                            <TouchableOpacity onPress={() => sendMessage()} activeOpacity={0.5} >
                                <Ionicons name="send" size={20} color={'#2b68e6'} />
                            </TouchableOpacity>
                        </View>
                    </>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ChatScreen
