import React, { useEffect, useLayoutEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { View, Text } from 'react-native'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import { auth, db } from '../../../firebase'
import CustomListItem from '../../components/CustomListItem'
import styles from './styles'
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {

    const [chats, setChats] = useState([]);

    useEffect(() => {
        const unsubscribe = db.collection('chats').onSnapshot((snapshot) => {
            setChats(snapshot.docs.map((doc => ({
                id: doc.id,
                data: doc.data()
            }))));
        })

        return unsubscribe
    }, [])

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Signal',
            headerStyle: { backgroundColor: '#fff' },
            headerTitleStyle: { color: '#000' },
            headerTintColor: '#000',
            headerRight: () => {
                return <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: 80,
                        marginRight: 20
                    }}
                >
                    <TouchableOpacity activeOpacity={0.5}>
                        <AntDesign name="camerao" size={20} color={'black'} />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => {
                        navigation.navigate('AddChat')
                    }} >
                        <SimpleLineIcons name={'pencil'} size={20} color={'black'} />
                    </TouchableOpacity>
                </View>
            },
            headerLeft: () => (<View style={{ marginLeft: 20 }}>
                <TouchableOpacity activeOpacity={0.5} onPress={() => signOutUser()}>
                    <Avatar source={{ uri: auth?.currentUser?.photoURL }} rounded />
                </TouchableOpacity>
            </View>)
        })
    }, [navigation])

    const signOutUser = () => {
        auth.signOut().then(() => {
            navigation.replace('Login')
        })
    }

    const enterChat = (id, chatName) => {
        navigation.navigate('Chat', { id, chatName })
    }

    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
                {
                    chats.map((chat) => (
                        <CustomListItem enterChat={enterChat} id={chat.id} key={chat.id} chatName={chat.data.chatName} />
                    ))
                }
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen
