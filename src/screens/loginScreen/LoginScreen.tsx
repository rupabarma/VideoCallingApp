import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Button,
    Alert,
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Styles from "./Styles";
import {Voximplant} from 'react-native-voximplant';
import {APP_NAME, ACC_NAME} from '../Constants'

const Login = ({navigation}) => {
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')

const voximplant = Voximplant.getInstance();

useEffect(() => {
  const connect = async () => {
    const status = await voximplant.getClientState();
    // console.log(status)
    if(status === Voximplant.ClientState.DISCONNECTED) {
      await voximplant.connect();
    }else if (status === Voximplant.ClientState.LOGGED_IN) {
      redirectHome();
    }
  };
  connect();
 },[])

 const signIn = async () => {
  try{
    const fqUsername = `${username}@${APP_NAME}.${ACC_NAME}.voximplant.com`;
  await voximplant.login(fqUsername, password);
  
  redirectHome();
}catch (e) {
  console.log(e)
  Alert.alert(e.name, `Error code: ${e.code}`)
}
}
 const redirectHome = () => {
  navigation.reset({
    index: 0,
    routes: [{
      name: 'Contacts',
    },],
  });
 };

   return (
    <View style={{flex:1, backgroundColor: '#3333ff', }}>

      <View style={Styles.header}>
      <TouchableOpacity
      onPress={() => navigation.goBack()}
      >
        <Feather
          name="chevron-left" size={35} color= '#fff' style={{marginBottom: 12}}
        />
      </TouchableOpacity>
        <Text style={Styles.title}>Welcome!</Text>
      </View>

      <View style={Styles.footer}>
        <View style={Styles.inputView}>
        <Text style={Styles.inputType}>User name</Text>
        <View style={Styles.textInputAndIconView}>
        <Icon name="person-outline" size={25} color= "#666666" style={{marginTop: 10}}  />
        <TextInput 
            style={Styles.textInput}
            value={username}
            onChangeText= {setUsername}
        />
        </View>
        </View>

      <View style={Styles.inputView}>
        <Text style={Styles.inputType}>Password</Text>
      <View style={Styles.textInputAndIconView}>
      <Icon name="lock-closed-outline" size={20} color= "#666666" style={{marginTop: 15}} />
        <TextInput 
            style={Styles.textInput}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
        />
        </View>
        </View>

            <TouchableOpacity 
            style={Styles.loginButton} 
            onPress={signIn}
            >
                <Text style={Styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
        
        </View>
      
      </View>
   )
}

export default Login;