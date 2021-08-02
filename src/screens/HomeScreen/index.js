import React from 'react'
import { ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native'
import { View, Text } from 'react-native'
import CustomListItem from '../../components/CustomListItem'
import styles from './styles'

const HomeScreen = () => {
    return (
        <SafeAreaView>
            <ScrollView>
                <CustomListItem />
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen
