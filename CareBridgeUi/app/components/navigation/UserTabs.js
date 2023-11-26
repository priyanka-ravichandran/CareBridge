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
import Booking from "../familyAndFriends/volunteerBooking/Booking";
import InitiateBooking from "../familyAndFriends/volunteerBooking/InitiateBooking";

import VolunteerBooking from "../shared/VolunteerBooking";

import FamilyProfile from "../familyAndFriends/FamilyProfile";
import AddNew from "../familyAndFriends/addexisting/AddNew";

import UserDetailsContext from "../shared/context/userDetailsContext";
import AddSeniorCitizen from "../familyAndFriends/addexisting/AddSeniorCitizen";
import FamilyHomeScreen from "../familyAndFriends/FamilyHomeScreen";
import Verification from "../familyAndFriends/addexisting/Verification";
import { Pressable } from "react-native";
import Sos from "../seniorCitizen/Sos";
import EmergencyContacts from "../seniorCitizen/EmergencyContacts";
import Reminder from "../shared/Reminder";

const Tab = createBottomTabNavigator();
const ChecklistStack = createStackNavigator();
const SeniorProfileStack = createStackNavigator();
const VolunteerStack = createStackNavigator();
const ChecklistNavigator = () => {
  return (
    <ChecklistStack.Navigator>
      <ChecklistStack.Screen
        name="ShoppingList"
        component={CheckLists}
        options={({ navigation, route }) => ({
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
      name="pairingDashboard"
      component={AddSeniorCitizen}
      options={{ headerShown: false }}
    />
    <SeniorProfileStack.Screen name="AddNew" component={AddNew} />
    <SeniorProfileStack.Screen name="Verification" component={Verification} />
  </SeniorProfileStack.Navigator>
);
const VolunteerStackNavigator = () => (
  <VolunteerStack.Navigator>
    <VolunteerStack.Screen
      name="VolunteerBookingDashboard"
      component={Booking}
      options={{ headerShown: false }}
    />
    <VolunteerStack.Screen name="InitiateBooking" component={InitiateBooking} />
    <VolunteerStack.Screen
      name="VolunteerBooking"
      component={VolunteerBooking}
    />
  </VolunteerStack.Navigator>
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
        name="ShoppingListDashboard"
        component={ChecklistNavigator}
        options={{
          headerShown: false,
          tabBarIcon: () => null,
          tabBarButton: (props) => null,
        }}
        key="checklist"
      />,
      <Tab.Screen
        name="Reminders"
        component={Reminder}
        key="reminder"
        options={{
          headerShown: false,
          tabBarIcon: () => null,
          tabBarButton: (props) => null,
        }}
      />,

      <Tab.Screen
        name="sosButton"
        component={Sos}
        options={({ navigation, route }) => ({
          tabBarIcon: () => null,
          tabBarButton: (props) => null,
          headerShown: false,
        })}
        key="sos"
      />,
      <Tab.Screen
        name="EmergencyContacts"
        component={EmergencyContacts}
        key="emergencyContacts"
        options={({ navigation, route }) => ({
          tabBarIcon: () => null,
          tabBarButton: (props) => null,
        })}
      />,
      <Tab.Screen name="Profile" component={SeniorProfile} key="profile" />
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
        name="Reminders"
        component={Reminder}
        key="reminder"
        options={{
          headerLeft: () => (
            <Pressable
              onPress={() => {
                navigation.navigate("Home");
              }}
            >
              <MaterialIcons name={"arrow-back"} size={24} color="black" />
            </Pressable>
          ),
          tabBarIcon: () => null,
          tabBarButton: (props) => null,
        }}
      />,
      <Tab.Screen
        name="ShoppingListDashboard"
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
        name="Booking"
        component={VolunteerStackNavigator}
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
        key="booking"
      />,
      <Tab.Screen name="Profile" component={FamilyProfile} key="profile" />
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
        key="volunteerbooking"
      />,
      <Tab.Screen name="Profile" component={VolunteerProfile} key="profile" />
    );
  }
  return tabs;
};

const UserTabs = ({ route }) => {
  const { userId } = route.params;
  const [userDetails, setUserDetails] = useState(null);
  useEffect(() => {
    let userInfo;
    const fetchUserDetails = async () => {
      try {
        const usersResponse = await axios.get(
          `http://csci5308vm20.research.cs.dal.ca:8080/users`
        );
        if (usersResponse && usersResponse.data) {
          let filteredUser = usersResponse.data.filter(
            (user) => user.userID === userId
          );
          if (filteredUser[0].type !== "senior") {
            const userPairingResponse = await axios.get(
              `http://csci5308vm20.research.cs.dal.ca:8080/pairings/q?familyId=${userId}`
            );
            if (userPairingResponse && userPairingResponse.data) {
              let pairingInfo = userPairingResponse.data.map((senior) => {
                const user = usersResponse.data.find(
                  (user) => user.userID === senior.seniorCitizenId
                );
                if (user) {
                  return {
                    ...senior,
                    email: user.email,
                    firstName: user.first_name,
                    lastName: user.last_name,
                  };
                }
                return senior;
              });
              userInfo = {
                ...filteredUser[0],
                pairings: pairingInfo,
              };
            }
          } else if (filteredUser[0].type === "senior") {
            const userPairingResponse = await axios.get(
              `http://csci5308vm20.research.cs.dal.ca:8080/pairings/q?elderlyId=${userId}`
            );
            if (userPairingResponse && userPairingResponse.data) {
              let pairingInfo = userPairingResponse.data.map((family) => {
                const user = usersResponse.data.find(
                  (user) => user.userID === family.familyId
                );
                if (user) {
                  return {
                    ...family,
                    email: user.email,
                    firstName: user.first_name,
                    lastName: user.last_name,
                    phoneNumber: user.phone_number,
                  };
                }
                return family;
              });
              userInfo = {
                ...filteredUser[0],
                pairings: pairingInfo,
              };
            }
          } else
            userInfo = {
              ...filteredUser[0],
              pairings: userPairingResponse.data,
            };
          setUserDetails(userInfo);
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
    <UserDetailsContext.Provider value={{ userDetails, setUserDetails }}>
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
          tabBarActiveTintColor: "blue",
          tabBarInactiveTintColor: "black",
          tabBarStyle: [{ display: "flex" }, null],
        })}
      >
        {renderTabsBasedOnUserType(userDetails)}
      </Tab.Navigator>
    </UserDetailsContext.Provider>
  );
};

export default UserTabs;
