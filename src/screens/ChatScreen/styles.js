import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        padding: 15
    },
    textInput: {
        bottom: 0,
        height: 40,
        flex: 1,
        marginRight: 15,
        backgroundColor: '#ececec',
        padding: 10,
        borderRadius: 30
    },
    reciever: {
        padding: 15,
        backgroundColor: '#ececec',
        alignSelf: 'flex-end',
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: '80%',
        position: 'relative',
    },
    sender:{
        padding: 15,
        backgroundColor: '#2b68e6',
        alignSelf: 'flex-start',
        borderRadius: 20,
        margin: 15,
        marginBottom: 20,
        maxWidth: '80%',
        position: 'relative',
    },
    senderText:{
        color: '#fff',
        fontWeight: '500',
        // marginLeft: 10,
        marginBottom: 4,
    },
    senderName:{
        left: 10,
        top: 10,
        paddingRight: 10,
        fontSize: 10,
        color: 'white',
    }, 
    recieverText:{
        color: '#000',
        fontWeight: '500',
        // marginLeft: 10, 
    }
})

export default styles;