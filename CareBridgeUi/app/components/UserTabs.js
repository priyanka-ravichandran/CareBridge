// TabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FamilyHomeScreen from './FamilyHomeScreen';
import SeniorCitizenHomeScreen from './SeniorCitizenHomeScreen';
import VolunteerHomeScreen from './VolunteerHomeScreen';
import TodoApp from './TodoApp';

const Tab = createBottomTabNavigator();

const UserTabs = ({ route, navigation }) => {
    const { userType } = route.params;
    return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      {userType === 'family' && <Tab.Screen name="familyHomeScreen" component={FamilyProfile} />}
      {userType === 'seniorCitizen' && <Tab.Screen name="seniorCitizenHomeScreen" component={TodoApp} />}
      {userType === 'volunteer' && <Tab.Screen name="volunteerHomeScreen" component={VolunteerHomeScreen} />}
    </Tab.Navigator>
  );
};

export default UserTabs;
