
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
} from 'react-native';
import Navigation from './src/screens/navigation/Navigation';


const App = () => {

  return (
    <>
      <StatusBar
        barStyle={'dark-content'}
      />
      <Navigation/>
    </>
  );
}


export default App;
