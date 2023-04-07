import { View, Text,Pressable, PermissionsAndroid, Alert, Platform } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import Styles from './Styles';
import CallActionBox from '../CallActionBox';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Voximplant} from 'react-native-voximplant';

const permissions = [
  PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
  PermissionsAndroid.PERMISSIONS.CAMERA,
];

const CallingScreen = ({navigation,route}) => {
  const [permissionsGranted,setPermissionsGranted] = useState(false);
  const [callStatus,setCallStatus] = useState('Initializing...');
  const [localVideoStreamId, setLocalVideoStreamId] = useState('');
  const [remoteVideoStreamId, setRemoteVideoStreamId] = useState('');
  
  const {user, call: incomingCall, isIncomingCall}= route?.params;

  const  voximplant = Voximplant.getInstance();
  
  const call = useRef(incomingCall);
  const endpoint = useRef(null);

  useEffect(() => {
    const getPermissions = async () => {
      const granted = await PermissionsAndroid.requestMultiple(permissions);
      const recordAudioGranted = 
      granted[PermissionsAndroid.PERMISSIONS.RECORD_AUDIO] === 'granted';
      const cameraGranted = 
      granted[PermissionsAndroid.PERMISSIONS.CAMERA] === 'granted';
      if(!cameraGranted || !recordAudioGranted) {
        Alert.alert("Permissions not granted");
      }else {
        setPermissionsGranted(true);
      }
    }

    if(Platform.OS === 'android') {
      getPermissions();
    }else {
      setPermissionsGranted(true);
    }
  },[])

  useEffect(() => {
    if(!permissionsGranted) {
      return;
    }

    const callSettings = {
      video:{
        sendVideo: true,
        receiveVideo: true,
      },
    };
    

    const makeCall = async () => {
      call.current = await voximplant.call(user.user_name, callSettings);
      subscribeToCallEvents();
    };

    const answerCall = async () => {
      subscribeToCallEvents();
      endpoint.current = call.current.getEndpoints()[0];
      subscribeToEndpointEvent();
      call.current.answer(callSettings);
    };

    const subscribeToCallEvents = () => {
      call.current.on(Voximplant.CallEvents.Failed, (callEvent) => {
        showError(callEvent.reason);
      });
      call.current.on(Voximplant.CallEvents.ProgressToneStart, (callEvent) => {
        setCallStatus('Calling...');
      });
      call.current.on(Voximplant.CallEvents.Connected, (callEvent) => {
        setCallStatus('Connected');
      });
      call.current.on(Voximplant.CallEvents.Disconnected, (callEvent) => {
        navigation.navigate('Contacts');
      });
      call.current.on(Voximplant.CallEvents.LocalVideoStreamAdded, (callEvent) => {
        setLocalVideoStreamId(callEvent.videoStream.id);
      });
      call.current.on(Voximplant.CallEvents.EndpointAdded, (callEvent) => {
        endpoint.current = callEvent.endpoint;
        subscribeToEndpointEvent();
      });
    };

    const subscribeToEndpointEvent = async () => {
      endpoint.current.on(
        Voximplant.EndpointEvents.RemoteVideoStreamAdded, (endpointEvent) => {
          setRemoteVideoStreamId(endpointEvent.videoStream.id);
        }
      )
    }

    const showError = (reason) => {
      Alert.alert("Call Failed", `Reason: ${reason}`, [
        {
          text: 'Ok',
          onPress: navigation.navigate('Contacts')
        }
      ])
    };

    if (isIncomingCall) {
      answerCall();
    } else{
      makeCall();
    }

    return () => {
      call.current.off(Voximplant.CallEvents.Failed);
      call.current.off(Voximplant.CallEvents.ProgressToneStart);
      call.current.off(Voximplant.CallEvents.Connected);
      call.current.off(Voximplant.CallEvents.Disconnected);
    };

  },[permissionsGranted]);

  const onHangupPress = () => {
    call.current.hangup();
  };

  return (
    <View style= {Styles.page}>
      <Pressable style={Styles.backButton}
      onPress={()=> navigation.goBack()}
      >
        <Ionicons
        name='chevron-back'
        size={30}
        color='#fff'
        />
      </Pressable>

      <Voximplant.VideoView
      videoStreamId ={remoteVideoStreamId}
      style={Styles.remoteVideo}
    />

    <Voximplant.VideoView
      videoStreamId ={localVideoStreamId}
      style={Styles.localVideo}
    />
    
    <View style={Styles.cameraPreview}>
      <Text style={Styles.name}>{user?.user_display_name}</Text>
      <Text style={Styles.phoneNumber}>{callStatus}</Text>
    </View>
    <CallActionBox onHangupPress={onHangupPress}/>
    </View>
  )
}

export default CallingScreen;