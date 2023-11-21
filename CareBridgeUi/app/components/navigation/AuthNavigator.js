// AuthNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import UserTabs from './UserTabs';
import SignupScreen from '../authentication/SignupScreen';
import LoginScreen from '../authentication/LoginScreen';
import LandingScreen from '../authentication/LandingScreen';




const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, gestureEnabled: false }}
    >
      <Stack.Screen name="LandingScreen" component={LandingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="UserTabs" component={UserTabs} />
    </Stack.Navigator>
  );
};


export default AuthNavigator;
