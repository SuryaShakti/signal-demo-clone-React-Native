import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import styles from './styles'
import { Button, Input, Image } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView } from 'react-native';
import { auth } from '../../../firebase';

const LoginScreen = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if(authUser){
                navigation.replace("Home")
            }
        })

        return unsubscribe;
    },[])

    const signIn = () => {
        auth.signInWithEmailAndPassword(email, password)
        .catch(err => alert(err.message))
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
                    onSubmitEditing={signIn}
                />
            </View>
            <Button containerStyle={styles.button} title={'Login'} onPress={() => signIn()} />
            <Button
                containerStyle={styles.button}
                type={'outline'}
                onPress={() => navigation.navigate('Register')}
                title={'Register'}
            />
        </KeyboardAvoidingView>
    )
}

export default LoginScreen
