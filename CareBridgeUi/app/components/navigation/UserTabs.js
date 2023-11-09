import React, { useState, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import CheckLists from "../shared/checklist/CheckLists";
import MedicineList from "../shared/MedicineList";
import SeniorProfile from "../shared/SeniorProfile";
import SeniorCitizenHome from "../seniorCitizen/SeniorCitizenHome";
import CheckListItems from "../shared/checklist/CheckListItems";
import axios from "axios";
import FamilyProfile from "../familyAndFriends/FamilyProfile";
import VolunteerProfile from "../volunteer/VolunteerProfile";
import VolunteerHomeScreen from "../volunteer/VolunteerHomeScreen";
import Verification from "../familyAndFriends/Verification";
import AddExisting from "../familyAndFriends/AddExisting";

import FamilyHomeScreen from "../familyAndFriends/FamilyHomeScreen";
import AddNew from "../familyAndFriends/AddNew";
import VolunteerBooking from "../volunteer/VolunteerBooking";
import UserDetailsContext from "../shared/context/userDetailsContext";

const Tab = createBottomTabNavigator();
const ChecklistStack = createStackNavigator();
const ChecklistNavigator = () => (
  <ChecklistStack.Navigator>
    <ChecklistStack.Screen name="CheckLists" component={CheckLists} />
    <ChecklistStack.Screen name="CheckListItems" component={CheckListItems} />
  </ChecklistStack.Navigator>
);
const renderTabsBasedOnUserType = (userDetails) => {
  let tabs = [];
  if (userDetails.type === 0) {
    tabs.push(
      <Tab.Screen
        name="Home"
        component={SeniorCitizenHome}
        options={{ headerShown: false }}
        key="home"
      />,
      <Tab.Screen name="Medicine" component={MedicineList} key="medicine" />,
      <Tab.Screen
        name="CheckList"
        component={ChecklistNavigator}
        options={{ headerShown: false }}
        key="checklist"
      />,
      <Tab.Screen
        name="Profile"
        component={SeniorProfile}
        options={{ headerShown: false }}
        key="profile"
      />
    );
  } else if (userDetails.type === 1) {
    tabs.push(
      <Tab.Screen
        name="Home"
        component={FamilyHomeScreen}
        options={{ headerShown: false }}
        key="home"
      />,
      <Tab.Screen
        name="CheckList"
        component={ChecklistNavigator}
        options={{ headerShown: false }}
        key="checklist"
      />,
      <Tab.Screen
        name="Profile"
        component={FamilyProfile}
        options={{ headerShown: false }}
        key="profile"
      />
      // <Tab.Screen
      // name="AddNew"
      // component={AddNew}
      // options={{headshown:false}}
      // key="addnew"
      // />,
      // <Tab.Screen
      // name="AddExisting"
      // component={AddExisting}
      // options={{headshown:false}}
      // key="addexisting"
      // />
    );
  } else if (userDetails.type === 2) {
    tabs.push(
      <Tab.Screen
        name="home"
        component={VolunteerHomeScreen}
        options={{ headerShown: false }}
        key="home"
      />,
      <Tab.Screen
        name="VolunteerBooking"
        component={VolunteerBooking}
        options={{ headerShown: false }}
        key="volunteerbooking"
      />,
      <Tab.Screen
        name="profile"
        component={VolunteerProfile}
        options={{ headerShown: false }}
        key="profile"
      />
    );
  }
  return tabs;
};

const UserTabs = ({ route }) => {
  const { userId } = route.params;
  const [userDetails, setUserDetails] = useState(null);
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `http://csci5308vm20.research.cs.dal.ca:8080/users/${userId}`
        );
        if (response && response.data) {
          setUserDetails(response.data);
        }
      } catch (error) {
        console.error("There was an error fetching the user details", error);
      }
    };

    fetchUserDetails();
  }, [userId]);

  if (!userDetails) {
    return null;
  }

  return (
    <UserDetailsContext.Provider value={userDetails}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Home") {
              iconName = "home";
            } else if (route.name === "Medicine") {
              iconName = "medical-services";
            } else if (route.name === "CheckList") {
              iconName = "view-list";
            } else if (route.name === "Profile") {
              iconName = userDetails.type === 0 ? "elderly" : "person";
            }
            return <MaterialIcons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: "blue",
          inactiveTintColor: "black",
        }}
      >
        {renderTabsBasedOnUserType(userDetails)}
      </Tab.Navigator>
    </UserDetailsContext.Provider>
  );
};

export default UserTabs;
