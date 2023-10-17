// TabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FamilyHomeScreen from './FamilyHomeScreen';
import SeniorCitizenHomeScreen from './SeniorCitizenHomeScreen';
import VolunteerHomeScreen from './VolunteerHomeScreen';

const Tab = createBottomTabNavigator();

const UserTabs = ({ route, navigation }) => {
    const { userType } = route.params;
    return (
    <Tab.Navigator>
      {userType === 'family' && <Tab.Screen name="familyHomeScreen" component={FamilyHomeScreen} />}
      {userType === 'seniorCitizen' && <Tab.Screen name="seniorCitizenHomeScreen" component={SeniorCitizenHomeScreen} />}
      {userType === 'volunteer' && <Tab.Screen name="volunteerHomeScreen" component={VolunteerHomeScreen} />}
    </Tab.Navigator>
  );
};

export default UserTabs;
