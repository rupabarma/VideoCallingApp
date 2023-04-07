import { View, Text } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

//Screens
import ContactsScreen from '../../screens/contactsScreen/ContactsScreen';
import CallingScreen from '../../screens/callingScreen/CallingScreen';
import IncomingCallScreen from '../../screens/incomingCallScreen/IncomingCallScreen';
import CallScreen from '../../screens/callScreen/CallScreen';
import SignInScreen from '../signInScreen/SignInScreen';
import Login from '../loginScreen/LoginScreen';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
      initialRouteName='Login'
      >
        <Stack.Screen 
        name='SignInScreen'
        component={SignInScreen}
        options={{
            headerShown: false
            // title: 'Contacts',
            // headerTitleAlign: 'center'
        }}
        />
        <Stack.Screen 
        name='Login'
        component={Login}
        options={{
            headerShown: false
            // title: 'Contacts',
            // headerTitleAlign: 'center'
        }}
        />
        <Stack.Screen 
        name='Contacts'
        component={ContactsScreen}
        options={{
            // headerShown: false
            title: 'Contacts',
            headerTitleAlign: 'center'
        }}
        />
        <Stack.Screen 
        name='Calling'
        component={CallingScreen}
        options={{
            headerShown: false
        }}
        />
        <Stack.Screen 
        name='IncomingCall'
        component={IncomingCallScreen}
        options={{
            headerShown: false
        }}
        />
        <Stack.Screen 
        name='Call'
        component={CallScreen}
        options={{
            headerShown: false
        }}
        />
      </Stack.Navigator>  
    </NavigationContainer>
  )
}

export default Navigation;