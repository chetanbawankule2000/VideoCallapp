import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';
import {Voximplant} from 'react-native-voximplant';
import {ACC_NAME, APP_NAME} from '../../constants';
import {useNavigation} from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const voximplant = Voximplant.getInstance();

  useEffect(() => {
    const connect = async () => {
      const status = await voximplant.getClientState();
      console.log('the status ', status);
      if (status === Voximplant.ClientState.DISCONNECTED) {
        await voximplant.connect();
      } else if (status === Voximplant.ClientState.LOGGED_IN) {
        redirectHome();
        return;
      }
    };

    connect();
  }, []);
  const signin = async () => {
    console.log('signing in', userName, password);
    try {
      const fqUserName = `${userName}@${APP_NAME}.${ACC_NAME}.voximplant.com`;
      console.log('user string', fqUserName);
      await voximplant.login(
        'user1@videocalling.chetanbawankule.voximplant.com',
        password,
      );
      redirectHome();
    } catch (e) {
      console.log(e);
      Alert.alert(e.name, `Error code ${e.code}`);
    }
  };

  const redirectHome = () => {
    navigation.reset({index: 0, routes: [{name: 'Contact'}]});
  };
  return (
    <View style={styles.page}>
      <TextInput
        placeholder="username"
        style={styles.input}
        placeholderTextColor="grey"
        value={userName}
        onChangeText={setUserName}
      />
      <TextInput
        secureTextEntry={true}
        placeholder="password"
        style={styles.input}
        placeholderTextColor="grey"
        onChangeText={setPassword}
        value={password}
      />
      <Pressable style={styles.button} onPress={signin}>
        <Text>Sign in</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    padding: 10,
    alignItems: 'stretch',
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    color: 'black',
  },
  button: {
    backgroundColor: 'dodgerblue',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
});
export default LoginScreen;
