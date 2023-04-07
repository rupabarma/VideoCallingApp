import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Navigation from './navigation/Navigation';
import { useNavigation } from '@react-navigation/native';

const CallActionBox = ({onHangupPress}) => {
    
    const navigation = useNavigation();
    const [isCameraOn, setIsCameraOn] = useState(true)
    const [isMicOn, setIsMicOn] = useState(true)

    const onReverseCamera= () => {
        console.warn("Reversed")
    }

    const onToggleCamera= () => {
        setIsCameraOn(!isCameraOn);
    }

    const onToggleMic= () => {
        setIsMicOn(!isMicOn);
    }


  return (
      <View style={Styles.buttonsContainer}>

       <Pressable onPress={onReverseCamera} style={Styles.iconButton}>
        <MaterialIcons
        name='flip-camera-ios'
        size={30}
        color='#fff'
        />
       </Pressable>

       <Pressable onPress={onToggleCamera} 
       style={[Styles.iconButton, {backgroundColor: isCameraOn ? '#4a4a4a' : '#fff' }]}
       >
        <FontAwesome5
        name='video-slash'
        size={23}
        color={isCameraOn? '#fff' : '#4a4a4a'}
        />
        </Pressable>

       <Pressable onPress={onToggleMic} 
        style={[Styles.iconButton, {backgroundColor: isMicOn ? '#4a4a4a' : '#fff' }]}>
        <Ionicons
        name='mic-off'
        size={30}
        color={isMicOn? '#fff' : '#4a4a4a'}
        />
       </Pressable>

       <Pressable 
       onPress={onHangupPress} style={[Styles.iconButton, {backgroundColor: '#cc0000'}]}>
        <MaterialCommunityIcons
        name='phone-hangup'
        size={30}
        color='#fff'
        />
       </Pressable>

    </View>
    )
}

export default CallActionBox;

const Styles = StyleSheet.create({
    buttonsContainer:{
        backgroundColor: '#333333',
        padding: 15,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 'auto',
    },
    iconButton:{
        backgroundColor: '#4a4a4a',
        width: 50,
        height: 50,
        borderRadius: 50/2,
        alignItems: 'center',
        justifyContent: 'center',
    },
});