import {
  Pressable,
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  Platform,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CallActionBox from '../../components/CallActionBox';
import {Voximplant} from 'react-native-voximplant';
import {useRoute, useNavigation} from '@react-navigation/native';

const permissions = [
  PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
  PermissionsAndroid.PERMISSIONS.CAMERA,
];

const CallingScreen = () => {
  const route = useRoute();
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [callStatus, setCallStatus] = useState('Initializing...');

  const callSettings = {
    video: {
      sendVideo: true,
      receiveVideo: true,
    },
  };

  const {user_display_name, user_id, user_name} = route?.params?.user;
  const voximplant = Voximplant.getInstance();

  const navigation = useNavigation();

  useEffect(() => {
    const requestPermissions = async () => {
      const granted = await PermissionsAndroid.requestMultiple(permissions);
      const recordAudioGranted =
        granted[PermissionsAndroid.PERMISSIONS.RECORD_AUDIO] === 'granted';
      const cameraGranted =
        granted[PermissionsAndroid.PERMISSIONS.CAMERA] === 'granted';
      if (!cameraGranted || !recordAudioGranted) {
        Alert.alert('Permissions not granted');
      } else {
        setPermissionGranted(true);
      }
    };
    if (Platform.OS === 'android') {
      requestPermissions();
    } else {
      setPermissionGranted(true);
    }
  }, []);

  useEffect(() => {
    if (!permissionGranted) {
      return;
    }
    let call;

    const makeCall = async () => {
      try {
        call = await voximplant.call(user_name, callSettings);
        subscribeToCallEvent(call);
      } catch (e) {
        console.log('Error in call', e);
      }
    };

    const subscribeToCallEvent = async call => {
      call.on(Voximplant.CallEvents.Failed, callEvent => {
        showCallError(callEvent.reason);
      });
      call.on(Voximplant.CallEvents.ProgressToneStart, callEvent => {
        setCallStatus('Calling...');
      });
    };

    const showCallError = reason => {
      Alert.alert('Call Failed', `Reason: ${reason}`, [
        {
          text: 'Ok',
          onPress: navigation.navigate('Contact'),
        },
      ]);
    };

    makeCall();

    return () => {
      call.off(Voximplant.CallEvents.Failed);
    };
  }, [permissionGranted]);

  const goBack = () => {
    navigation.goBack();
  };

  // console.log(route.params);
  return (
    <View style={styles.page}>
      <Pressable style={styles.backButton} onPress={goBack}>
        <Ionicons name="chevron-back" color={'white'} size={30} />
      </Pressable>
      <View style={styles.camerapreview}>
        <Text style={styles.name}>{user_display_name}</Text>
        <Text style={styles.phoneNumber}>{callStatus}</Text>
      </View>
      <CallActionBox />
      {/* <View style={styles.buttonsContainer}>
        <View style={styles.iconButton}>
          <Ionicons name="ios-camera-reverse" size={30} color={'white'} />
        </View>
        <View style={styles.iconButton}>
          <MaterialIcons name="camera-off" size={30} color={'white'} />
        </View>
        <View style={styles.iconButton}>
          <MaterialIcons name="microphone-off" size={30} color={'white'} />
        </View>
        <View style={[styles.iconButton, {backgroundColor: 'red'}]}>
          <MaterialIcons name="phone-hangup" size={30} color={'white'} />
        </View>
      </View> */}
    </View>
  );
};

export default CallingScreen;

const styles = StyleSheet.create({
  page: {
    height: '100%',
    backgroundColor: '#7b4e80',
  },
  backButton: {
    position: 'absolute',
    left: 25,
    top: 25,
  },
  camerapreview: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: 15,
  },
  phoneNumber: {
    fontSize: 20,
  },
  buttonsContainer: {
    backgroundColor: '#333333',
    padding: 20,
    paddingBottom: 40,
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
    marginTop: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconButton: {
    backgroundColor: '#4a4a4a',
    padding: 15,
    borderRadius: 50,
  },
});
