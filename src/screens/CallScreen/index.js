import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CallActionBox from '../../components/CallActionBox';

const CallScreen = () => {
  return (
    <View style={styles.page}>
      <View style={styles.camerapreview}></View>
      <CallActionBox />
    </View>
  );
};

export default CallScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#7b4e80',
  },
  camerapreview: {
    height: 150,
    width: 100,
    borderRadius: 10,
    position: 'absolute',
    backgroundColor: '#ffff6e',

    right: 10,
    top: 100,
  },
});
