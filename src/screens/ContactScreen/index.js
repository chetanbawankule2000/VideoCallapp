import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import dummy from '../../../assets/data/contacts.json';
import {useNavigation} from '@react-navigation/native';

const ContactScreen = () => {
  const [searText, setSearchText] = useState('');
  const [contacts, setContacts] = useState(dummy);

  const navigation = useNavigation();

  useEffect(() => {
    if (!searText) {
      setContacts(dummy);
      return;
    }
    const newContacts = dummy.filter(item =>
      item.user_display_name.toLowerCase().includes(searText.toLowerCase()),
    );
    setContacts(newContacts);
  }, [searText]);

  const callUser = user => {
    navigation.navigate('Calling', {user});
  };
  return (
    <View style={styles.page}>
      <TextInput
        placeholder="Search"
        style={styles.textInputStyles}
        placeholderTextColor="black"
        value={searText}
        onChangeText={setSearchText}
      />
      <FlatList
        data={contacts}
        renderItem={({item}) => (
          <Pressable onPress={() => callUser(item)}>
            <Text style={styles.contacatName}>{item?.user_display_name}</Text>
          </Pressable>
        )}
        ItemSeparatorComponent={() => <View style={styles.seperator} />}
      />
    </View>
  );
};

export default ContactScreen;

const styles = StyleSheet.create({
  page: {
    padding: 15,
    flex: 1,
  },
  contacatName: {
    fontSize: 16,
    margin: 10,
    color: 'black',
  },
  seperator: {
    width: '100%',
    height: 1,
    backgroundColor: 'grey',
    opacity: 0.7,
  },
  textInputStyles: {
    backgroundColor: 'lightgray',
    padding: 10,
    borderRadius: 5,
    color: 'black',
  },
});
