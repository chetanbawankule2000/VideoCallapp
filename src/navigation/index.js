import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CallScreen from '../screens/CallScreen';
import CallingScreen from '../screens/CallingScreen';
import ContactScreen from '../screens/ContactScreen';
import IncommingCallScreen from '../screens/IncommingCallScreen';
import LoginScreen from '../screens/Loginscreen';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Contact" component={ContactScreen} />

        <Stack.Group screenOptions={{headerShown: false}}>
          <Stack.Screen name="Calling" component={CallingScreen} />
          <Stack.Screen name="Call" component={CallScreen} />
          <Stack.Screen name="IncommingCall" component={IncommingCallScreen} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
