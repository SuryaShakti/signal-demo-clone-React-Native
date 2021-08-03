import React, { useLayoutEffect } from 'react'
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

    return (
        <SafeAreaView>
            <ScrollView>
                <CustomListItem />
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen
