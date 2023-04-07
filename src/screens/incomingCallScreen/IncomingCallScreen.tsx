import { View, Text, ImageBackground, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import Styles from './Styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Voximplant} from 'react-native-voximplant';

const IncomingCallScreen = ({route,navigation}) => {

  const [caller,setCaller] = useState('');
  const {call} = route.params;

  useEffect(() => {
    setCaller(call.getEndpoints()[0].displayName);

    call.on(Voximplant.CallEvents.Disconnected, (callEvent) => {
      navigation.navigate('Contacts');
    });

      return () => {
        call.off(Voximplant.CallEvents.Disconnected);
      };
  },[])

  const onDecline = () => {
    call.decline();
  }

  const onAccept = () => {
    navigation.navigate('Calling',{
      call,
      isIncomingCall: true
    });
  }

  return (
    <View style={Styles.page}>
      <ImageBackground 
        source={{uri: 'https://i.pinimg.com/564x/bd/8f/1d/bd8f1d333ef700b58b2264a1a3596290.jpg'}}
        resizeMode='cover' style={Styles.cameraPreview}>
      <Text style={Styles.name}>{caller}</Text>
      <Text style={Styles.phoneNumber}>WhatsApp video....</Text>

    <View style={Styles.buttonsContainer}>

      <View style={Styles.buttonRows}>
        <View style={{alignItems: 'center'}}>
        <Ionicons
        name='alarm'
        size={30}
        color='#fff'
        />
        <Text style={Styles.text}>Remind me</Text>
        </View>

        <View style={{alignItems: 'center'}}>
        <MaterialCommunityIcons
        name='message-text'
        size={30}
        color='#fff'
        />
        <Text style={Styles.text}>Message</Text>
        </View>

      </View>

      <View style={Styles.buttonRows}>

        <Pressable onPress={onDecline} style={{alignItems: 'center'}}>
          <View style={[Styles.iconButton, {backgroundColor: '#e31025'}]}>
            <AntDesign
            name='close'
            size={40}
            color='#fff'
            />
          </View>
        <Text style={Styles.text}>Decline</Text>
        </Pressable>

        <Pressable onPress={onAccept} style={{alignItems: 'center'}}>
          <View style={[Styles.iconButton, {backgroundColor: '#30c749'}]}>
            <AntDesign
            name='check'
            size={40}
            color='#fff'
            />
          </View>
        <Text style={Styles.text}>Accept</Text>
        </Pressable>

      </View>

    </View>

      </ImageBackground>
    </View>
  )
}

export default IncomingCallScreen;