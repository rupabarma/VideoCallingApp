import { 
    View, 
    Text,
    FlatList,
    TextInput, 
    Pressable,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Styles from './Styles';
import dummyContacts from '../../../assets/data/contacts.json';
import {Voximplant} from 'react-native-voximplant';

const ContactsScreen = ({navigation}) => {

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredContacts, setFilteredContacts] =useState(dummyContacts);

    const  voximplant = Voximplant.getInstance();

    useEffect(() => {
      voximplant.on(Voximplant.ClientEvents.IncomingCall, (IncomingCallEvent) => {
        navigation.navigate('IncomingCall', {call: IncomingCallEvent.call})
      });
      return () => {
        voximplant.off(Voximplant.ClientEvents.IncomingCall);
      };
    },[]);

    
    useEffect(() => {
        const newContacts = dummyContacts.filter(
            contact => contact.user_display_name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        setFilteredContacts(newContacts);
    },[searchTerm])

    const callUser = (user) => {
      navigation.navigate('Calling', {user})
    }

  return (
    <View style={Styles.page}>
        <TextInput 
        placeholder='Search' 
        style={Styles.searchBar} 
        value= {searchTerm}
        onChangeText={setSearchTerm}
        />

        <FlatList
        data={filteredContacts}
        renderItem={({item}) => (
          <Pressable onPress={ () => callUser(item)}>
          <Text style={Styles.contactName}>{item.user_display_name}</Text>
          </Pressable>
        )}
        ItemSeparatorComponent={()=> <View style={Styles.separator}/>}
        />
    </View>
  )
}

export default ContactsScreen;