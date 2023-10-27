// AuthNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignupScreen from './SignupScreen';
import UserTabs from './UserTabs';
import LoginScreen from './LoginScreen';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="UserTabs" component={UserTabs} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
