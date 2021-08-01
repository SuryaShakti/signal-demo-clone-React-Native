import React, { useState } from 'react'
import { Text, View } from 'react-native'
import styles from './styles'
import { Button, Input, Image } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView } from 'react-native';

const LoginScreen = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = () => {

    }

    return (
        <KeyboardAvoidingView style={styles.container}>
            <StatusBar style="light" />
            <Image
                source={{
                    uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Signal-Logo.svg/900px-Signal-Logo.svg.png',
                }}
                style={{ width: 200, height: 200, borderRadius: 16, marginVertical: 20 }}
            />
            <View style={styles.formContainer}>
                <Input
                    placeholder={'Email'}
                    type="email"
                    autoFocus={true}
                    value={email}
                    onChangeText={text => setEmail(text)}
                />
                <Input
                    placeholder={'Password'}
                    type="password"
                    secureTextEntry
                    value={password}
                    onChangeText={text => setPassword(text)}
                />
            </View>
            <Button containerStyle={styles.button} title={'Login'} onPress={() => signIn()}/>
            <Button containerStyle={styles.button} type={'outline'} title={'Register'} />
        </KeyboardAvoidingView>
    )
}

export default LoginScreen