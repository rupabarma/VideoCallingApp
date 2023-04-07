import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import CallActionBox from '../CallActionBox';

const CallScreen = () => {
  return (
    <View style={Styles.page}>
      <View style={Styles.cameraPreview}/>

      <CallActionBox/>
    </View>
  )
}

export default CallScreen;

const Styles = StyleSheet.create({
    page:{
        height: '100%',
        backgroundColor: '#0739',
    },
    cameraPreview:{
        width: 100,
        height: 150,
        backgroundColor: '#473348',
        borderRadius: 10,
        position: 'absolute',
        right: 10,
        top: 80,
    },
});