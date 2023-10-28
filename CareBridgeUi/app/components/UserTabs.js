import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import FamilyHomeScreen from './FamilyHomeScreen';
import SeniorCitizenHomeScreen from './SeniorCitizenHomeScreen';
import VolunteerHomeScreen from './VolunteerHomeScreen';
import TodoApp from './TodoApp';
import { View, Text, Button, StyleSheet } from 'react-native';
import MedicineList from './MedicineList';

import SeniorProfile from './SeniorProfile';



const Tab = createBottomTabNavigator();




const UserTabs = ({ route, navigation }) => {
  const { userType } = route.params;

  return (
   /* <Tab.Navigator screenOptions={{ headerShown: false }}>
      {userType === 'family' && <Tab.Screen name="familyHomeScreen" component={FamilyHomeScreen} />}
      {userType === 'seniorCitizen' && <Tab.Screen name="seniorCitizenHomeScreen" component={TodoApp} />}
      {userType === 'volunteer' && <Tab.Screen name="volunteerHomeScreen" component={VolunteerHomeScreen} />}
      
    </Tab.Navigator> */
    <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Details') {
              iconName = focused ? 'details' : 'details-outline';
            }

            // Return the desired icon component
            return <MaterialIcons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'blue',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="medicinelist" component={MedicineList} />
        <Tab.Screen name="Shoppinglist" component={TodoApp} />
        <Tab.Screen name="seniorprofile" component={SeniorProfile} />
      </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default UserTabs;
