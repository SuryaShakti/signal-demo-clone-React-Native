import React from 'react'
import { View, Text } from 'react-native'
import styles from './styles';
import { ListItem, Avatar } from 'react-native-elements';

const CustomListItem = () => {
    return (
        <ListItem>
            <Avatar
                rounded
                source={{
                    uri: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'
                }}
            />
            <ListItem.Content>
                <ListItem.Title style={{fontWeight: 'bold'}}>
                    {'Youtube Channel'}
                </ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail" >
                    {'It is my foirst demo  channel in this signal clone app '}
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
}

export default CustomListItem
