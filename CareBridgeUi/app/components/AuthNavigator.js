// AuthNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignupScreen from './SignupScreen';
import UserTabs from './UserTabs';
import LoginScreen from './LoginScreen';
import MedicineList from './MedicineList';
import TodoApp from './TodoApp';
import SeniorProfile from './SeniorProfile';


const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="UserTabs" component={UserTabs} />
      <Stack.Screen name="AddMedicines" component={MedicineList} />
      <Stack.Screen name="ShoppingList" component={TodoApp} />
      <Stack.Screen name="Profile" component={SeniorProfile} />

    </Stack.Navigator>
  );
};


export default AuthNavigator;
