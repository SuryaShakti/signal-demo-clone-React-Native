import React, { useState } from 'react'
import { View, Text, KeyboardAvoidingView } from 'react-native';
// import { Button } from 'react-native-elements/dist/buttons/Button';
// import { Input } from 'react-native-elements/dist/input/Input';
import styles from './styles';
import { Button, Input, Image } from 'react-native-elements';
import { useLayoutEffect } from 'react';
import { auth } from '../../../firebase';


const RegisterScreen = ({ navigation }) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: 'Back to Login'
        })
    }, [navigation])

    const register = () => {
        auth.createUserWithEmailAndPassword(email, password)
            .then(authUser => {
                authUser.user.updateProfile({
                    displayName: name,
                    photoURL: imageUrl || 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png',

                })
            }).catch(error => alert(error.message))
    }

    return (
        <KeyboardAvoidingView style={styles.container}>
            <Text style={{ marginVertical: 20, fontSize: 18 }}>
                {'Create an Account'}
            </Text>
            <View style={styles.formContainer}>
                <Input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChangeText={text => setName(text)} autoFocus
                />
                <Input
                    type="Email"
                    placeholder="Email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                />
                <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    secureTextEntry
                />
                <Input
                    type="text"
                    placeholder="Profile Picture URL (Optional)"
                    value={imageUrl}
                    onChangeText={text => setImageUrl(text)}
                    onSubmitEditing={register}
                />
            </View>
            <Button raised containerStyle={styles.button} title={'Register'} onPress={register} />
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen
