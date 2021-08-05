import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import styles from './styles';
import { ListItem, Avatar } from 'react-native-elements';
import { db, auth } from '../../../firebase';

const CustomListItem = ({ id, chatName, enterChat }) => {

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const unsubscribe = db.collection('chats').doc(id).collection('messages').orderBy('timestamp', 'desc').onSnapshot((snapshot) => {
            setMessages(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data()
                }))
            )
        })

        return unsubscribe;
    }, [])

    return (
        <ListItem onPress={() => enterChat(id, chatName)} bottomDivider key={id}>
            <Avatar
                rounded
                source={{
                    uri: messages?.[0]?.data.photoURL ||
                        'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'
                }}
            />
            <ListItem.Content>
                <ListItem.Title style={{ fontWeight: 'bold' }}>
                    {chatName}
                </ListItem.Title>
                {messages && messages.length > 0 ?
                    <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail" >
                        {messages?.[0]?.data.displayName === auth.currentUser.displayName ? 'You' : messages?.[0]?.data.displayName}: {messages?.[0]?.data.message}
                    </ListItem.Subtitle>
                    : null
                }
            </ListItem.Content>
        </ListItem>
    )
}

export default CustomListItem
