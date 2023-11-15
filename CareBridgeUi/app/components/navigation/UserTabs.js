import React, { useState, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createStackNavigator,
  HeaderBackButton,
} from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import CheckLists from "../shared/checklist/CheckLists";
import MedicineList from "../shared/MedicineList";
import SeniorProfile from "../shared/SeniorProfile";
import SeniorCitizenHome from "../seniorCitizen/SeniorCitizenHome";
import CheckListItems from "../shared/checklist/CheckListItems";
import axios from "axios";
import VolunteerProfile from "../volunteer/VolunteerProfile";
import VolunteerHomeScreen from "../volunteer/VolunteerHomeScreen";

import FamilyProfile from "../familyAndFriends/FamilyProfile";
import AddNew from "../familyAndFriends/addexisting/AddNew";
import VolunteerBooking from "../volunteer/VolunteerBooking";
import UserDetailsContext from "../shared/context/userDetailsContext";
import AddSeniorCitizen from "../familyAndFriends/addexisting/AddSeniorCitizen";
import FamilyHomeScreen from "../familyAndFriends/FamilyHomeScreen";
import Verification from "../familyAndFriends/addexisting/Verification";
import { Pressable } from "react-native";

const Tab = createBottomTabNavigator();
const ChecklistStack = createStackNavigator();
const SeniorProfileStack = createStackNavigator();
const ChecklistNavigator = () => {
  const navigation = useNavigation();
  return (
    <ChecklistStack.Navigator>
      <ChecklistStack.Screen
        name="ShoppingList"
        component={CheckLists}
        options={({ navigation, route }) => ({
          // headerTitle: (props) => <LogoTitle {...props} />,
          headerLeft: () => (
            <Pressable
              onPress={() => {
                navigation.navigate("Home");
              }}
            >
              <MaterialIcons name={"arrow-back"} size={24} color="black" />
            </Pressable>
          ),
        })}
      />
      <ChecklistStack.Screen
        name="ShoppingListItems"
        component={CheckListItems}
      />
    </ChecklistStack.Navigator>
  );
};
const SeniorProfileListNavigator = () => (
  <SeniorProfileStack.Navigator>
    <SeniorProfileStack.Screen
      name="AddSeniorCitizen"
      component={AddSeniorCitizen}
      options={{ headerShown: false }}
    />
    <SeniorProfileStack.Screen name="AddNew" component={AddNew} />
    <SeniorProfileStack.Screen name="Verification" component={Verification} />
  </SeniorProfileStack.Navigator>
);
const renderTabsBasedOnUserType = (userDetails) => {
  let tabs = [];
  if (userDetails.type === "senior") {
    tabs.push(
      <Tab.Screen name="Home" component={SeniorCitizenHome} key="home" />,
      <Tab.Screen
        name="Medicine"
        component={MedicineList}
        key="medicine"
        options={{
          headerShown: false,
          tabBarIcon: () => null,
          tabBarButton: (props) => null,
        }}
      />,
      <Tab.Screen
        name="ShoppingList"
        component={ChecklistNavigator}
        options={{
          headerShown: false,
          tabBarIcon: () => null,
          tabBarButton: (props) => null,
        }}
        key="checklist"
      />,
      <Tab.Screen
        name="Profile"
        component={SeniorProfile}
        options={{ headerShown: false }}
        key="profile"
      />
    );
  } else if (userDetails.type === "family") {
    tabs.push(
      <Tab.Screen
        name="Home"
        component={FamilyHomeScreen}
        //options={{ headerShown: false }}
        key="home"
      />,
      <Tab.Screen
        name="Medicine"
        component={MedicineList}
        key="medicine"
        options={({ navigation, route }) => ({
          tabBarIcon: () => null,
          tabBarButton: (props) => null,
          headerLeft: () => (
            <Pressable
              onPress={() => {
                navigation.navigate("Home");
              }}
            >
              <MaterialIcons name={"arrow-back"} size={24} color="black" />
            </Pressable>
          ),
        })}
      />,
      <Tab.Screen
        name="ShoppingList"
        component={ChecklistNavigator}
        options={({ navigation, route }) => ({
          tabBarIcon: () => null,
          tabBarButton: (props) => null,
          headerShown: false,
        })}
        key="checklist"
      />,
      <Tab.Screen
        name="AddSeniorCitizen"
        component={SeniorProfileListNavigator}
        options={({ navigation, route }) => ({
          tabBarIcon: () => null,
          tabBarButton: (props) => null,
          headerLeft: () => (
            <Pressable
              onPress={() => {
                navigation.navigate("Home");
              }}
            >
              <MaterialIcons name={"arrow-back"} size={24} color="black" />
            </Pressable>
          ),
        })}
        key="addseniorcitizen"
      />,
      <Tab.Screen
        name="Profile"
        component={FamilyProfile}
        options={{ headerShown: false }}
        key="profile"
      />
    );
  } else if (userDetails.type === "volunteer") {
    tabs.push(
      <Tab.Screen
        name="Home"
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
        name="Profile"
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
            } else if (route.name === "ShoppingList") {
              iconName = "view-list";
            } else if (route.name === "AddSeniorCitizen") {
              iconName = "person-add";
            } else if (route.name === "Profile") {
              iconName = "person";
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
