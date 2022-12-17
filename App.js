import {StyleSheet, Text, View, SafeAreaView, StatusBar} from 'react-native';
import React from 'react';

import ContactScreen from './src/screens/ContactScreen';
import CallingScreen from './src/screens/CallingScreen';
import IncommingCallScreen from './src/screens/IncommingCallScreen';
import CallScreen from './src/screens/CallScreen';
import Navigation from './src/navigation';
const App = () => {
  return (
    <>
      <StatusBar barStyle={'light-content'} />
      {/* <ContactScreen /> */}
      {/* <CallingScreen /> */}
      {/* <IncommingCallScreen /> */}
      {/* <CallScreen /> */}
      <Navigation />
    </>
  );
};

export default App;

const styles = StyleSheet.create({});
