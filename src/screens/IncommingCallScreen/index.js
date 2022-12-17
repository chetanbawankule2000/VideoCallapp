import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Pressable,
} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';

import bg from '../../../assets/images/ios_bg.png';

const IncommingCallScreen = () => {
  const onDecline = () => {
    console.warn('On Decline');
  };

  const onAccept = () => {
    console.warn('On Accept');
  };
  return (
    <ImageBackground source={bg} style={styles.bg} resizeMode="cover">
      <Text style={styles.name}>Abcd</Text>
      <Text style={styles.phoneNumber}>WhatsApp Video</Text>
      <View style={[styles.row, {marginTop: 'auto'}]}>
        <View style={styles.iconContainer}>
          <Ionicons name="alarm" color={'white'} size={30} />
          <Text style={styles.iconText}>Remind Me</Text>
        </View>
        <View style={styles.iconContainer}>
          <Entypo name="message" color={'white'} size={30} />

          <Text style={styles.iconText}>Message</Text>
        </View>
      </View>
      <View style={styles.row}>
        {/* Decline Button */}
        <Pressable style={styles.iconContainer} onPress={onDecline}>
          <View style={styles.iconButtonContainer}>
            <Feather name="x" color={'white'} size={50} />
          </View>
          <Text style={styles.iconText}>Decline</Text>
        </Pressable>
        {/* Accept Button */}
        <Pressable style={styles.iconContainer} onPress={onAccept}>
          <View
            style={[styles.iconButtonContainer, {backgroundColor: '#2e7bff'}]}>
            <Feather name="check" color={'white'} size={50} />
          </View>
          <Text style={styles.iconText}>Message</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
};

export default IncommingCallScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  bg: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 100,
    marginBottom: 15,
  },
  phoneNumber: {
    fontSize: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  iconContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  iconText: {
    marginTop: 10,
  },
  iconButtonContainer: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 50,
    margin: 10,
  },
});
