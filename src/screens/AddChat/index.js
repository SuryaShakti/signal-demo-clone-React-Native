import React, { useLayoutEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { Input } from 'react-native-elements/dist/input/Input'
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements';
import { db } from '../../../firebase';

const AddChat = ({ navigation }) => {

    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Add a new chat'
        })
    }, [navigation])

    const createChat = async () => {
        setLoading(true)
        await db.collection('chats').add({
            chatName: input
        }).then(() => {
            navigation.goBack()
        }).catch((error) => alert(error.message)).finally(() => { setLoading(false) })
    }

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <Input
                    placeholder={'Enter the chat name'}
                    value={input}
                    onChangeText={text => setInput(text)}
                    onSubmitEditing={createChat}
                    leftIcon={
                        <Icon name={'wechat'} type={'antdesign'} color={'black'} size={20} />
                    }
                />
                <Button
                    disabled={!input}
                    onPress={() => createChat()}
                    title={'Add a new chat'}
                    loading={loading}
                />
            </View>
        </View>
    )
}

export default AddChat
