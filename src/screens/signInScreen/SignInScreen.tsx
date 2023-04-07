import React, { useState,useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
} from "react-native";
import Styles from './Styles'
import Icon from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather';
import {Voximplant} from 'react-native-voximplant';
import {APP_NAME, ACC_NAME} from '../Constants';

const SignInScreen = ({navigation}) => {

    
    const [username,setUsername] = useState('')
    const [emailIdOrNmber,setEmailIdOrNmber] = useState('')
    const [password,setPassword] = useState('')
    const [data,setData] = React.useState({
        emailId: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
  })
  const textInputChange = (value) =>{
    if(value.length != 0) {
      setData({
        ...data,
        emailId:value,
        check_textInputChange:true
      })
    } else {
        setData({
            ...data,
            emailId:value,
            check_textInputChange:false,
        })
    }
}
const handlePasswordChange = (value) => {
    setData({
      ...data,
      password: value,
    })
    if (value.length != 0) {
        setData({
            ...data,
            password: value,
            check_handlePasswordChange: true,
        })
    } else {
        setData({
            ...data,
            password: value,
            check_handlePasswordChange: false,
        })
    }
}

const updatesecureTextEntry = () =>{
    setData ({
        ...data,
        secureTextEntry: !data.secureTextEntry
    })
}
const voximplant = Voximplant.getInstance();
useEffect(() => {
    const connect = async () => {
      const status = await voximplant.getClientState();
      console.log(status)
      if(status === Voximplant.ClientState.DISCONNECTED) {
        await voximplant.connect();
      }
    }
    connect();
   },[])
  
   const signIn = async () => {
    try{const fqUsername = `${username}@${APP_NAME}.${ACC_NAME}.voximplant.com`;
    await voximplant.login(fqUsername, password);

    redirectHome();
    }catch (e) {
      console.log(e)
      Alert.alert(e.name, `Error code: ${e.code}`)
    }
   }
   const redirectHome = () => {
    navigation.navigate('Contacts')
   }

   return (
    <View style={{flex:1, backgroundColor: '#3333ff', }}>

      <View style={Styles.header}>
        <Text style={{fontSize: 40, fontWeight: '900', color: '#fff'}}>Welcome!</Text>
      </View>

      <View style={Styles.footer}>
      
        <View style={Styles.inputView}>
        <Text style={Styles.inputType}>User name</Text>
        <View style={Styles.textInputAndIconView}>
        <Icon name="person-outline" size={20} color= "#666666" style={{marginTop: 15}}  />
        <TextInput 
            style={Styles.textInput}
            onChangeText= {
              () => setUsername()
              }
        />
        </View>
        </View>



      {/* <View style={Styles.inputView}>
        <Text style={Styles.inputType}>Email address</Text>
        <View style={Styles.textInputAndIconView}>
        <Feather name="at-sign" size={20} color= "#666666" style={{marginTop: 15}}  />
        <TextInput 
            style={Styles.textInput}
            onChangeText= {(value) => textInputChange(value)}
        />
         <View>
              {data.check_textInputChange ? 
              <TouchableOpacity  onPress={() => setPassword()} >
              <Icon
                    name="checkmark-circle-outline"
                    color="#666666"
                    size={25} 
                    style={{marginTop: 10}}
                />
              </TouchableOpacity> 
              : null} 
              </View>
        </View>
        </View> */}


      <View style={Styles.inputView}>
        <Text style={Styles.inputType}>Password</Text>
      <View style={Styles.textInputAndIconView}>
      <Icon name="lock-closed-outline" size={20} color= "#666666" style={{marginTop: 15}} />
        <TextInput 
            style={Styles.textInput}
            secureTextEntry={data.secureTextEntry ? true : false}
            onChangeText={() => setPassword()}
        />
        <View>
             {data.check_handlePasswordChange ?
             <TouchableOpacity
             onPress={updatesecureTextEntry} 
             >
             {data.secureTextEntry ? 
             <Icon
                    name="eye-off-outline"
                    color="#666666"
                    size={25} 
                    style={{marginTop: 10}}  
                /> :
              <Icon
                    name="eye-outline"
                    color="#666666"
                    size={25} 
                    style={{marginTop: 10}} 
                />  
                }
             </TouchableOpacity>
             : null }
             </View>
        </View>
        </View>



        {/* <View> */}
            <TouchableOpacity 
            style={Styles.loginButton}
            onPress={signIn}
            >
                <Text style={Styles.loginButtonText}>Sign in</Text>
            </TouchableOpacity>

            <TouchableOpacity 
            style={Styles.loginButton} 
            onPress={() =>  navigation.navigate('Login')}
            >
                <Text style={Styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
        </View>
      
      </View>
   )
}

export default SignInScreen;