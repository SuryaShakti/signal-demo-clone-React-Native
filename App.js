import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';


const Stack = createStackNavigator();

const glolbalScreenOptions = {
  headerStyle: {
    backgroundColor: '#2e6bed',
  },
  headerTitleStyle: {color: '#fff'},
  headerTintColor: '#fff',
  headerTitleAlign: 'center',
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={glolbalScreenOptions}>
        <Stack.Screen name={'Login'} component={LoginScreen} /> 
        <Stack.Screen name={'Register'} component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
