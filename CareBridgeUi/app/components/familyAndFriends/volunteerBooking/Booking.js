import React, { useState, useEffect, useContext, useIsFocused } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  FlatList,
  Alert,
} from "react-native";
import axios from "axios";
import UserDetailsContext from "../../shared/context/userDetailsContext";
import { MaterialIcons } from "@expo/vector-icons";
import sharedStyle from "../../shared/styles/sharedStyle";
import DropDownPicker from "react-native-dropdown-picker";
import Toast from "react-native-toast-message";

const Booking = ({ navigation }) => {
  const ITEM_HEIGHT = 40;
  const MAX_ITEMS_VISIBLE = 4;
  const dropdownMaxHeight = ITEM_HEIGHT * MAX_ITEMS_VISIBLE;

  const { userDetails } = useContext(UserDetailsContext);
  const [bookings, setBookings] = useState([]);
  const [allBookings, setAllBookings] = useState([]);
  const [open, setOpen] = useState(false);
  const [volunteers, setVolunteers] = useState([]);
  const initialSeniorCitizenId =
    userDetails.pairings[0]?.seniorCitizenId || null;
  const [value, setValue] = useState(initialSeniorCitizenId);
  const [items, setItems] = useState([]);
  const setDropDownValue = () => {
    return userDetails.pairings.map((pairing) => ({
      label: pairing.email,
      value: pairing.seniorCitizenId,
    }));
  };
  useEffect(() => {
    setBookings([]);
    if (value) {
      const filteredBookings = allBookings.filter(
        (booking) => booking.seniorCitizenId === value
      );
      setBookings(filteredBookings);
    }
  }, [value]);

  useEffect(() => {
    setItems(setDropDownValue());
    getBookings();
    axios
      .get("http://csci5308vm20.research.cs.dal.ca:8080/users")
      .then((response) => {
        if (response.data) {
          let volunteer = [];
          response.data.map((user) => {
            if (user.type === "volunteer") {
              volunteer.push(user);
            }
          });
          setVolunteers(volunteer);
        }
      });
  }, []);

  const getBookings = () => {
    axios
      .get(
        `http://csci5308vm20.research.cs.dal.ca:8080/appointment/q?familyId=${userDetails.userID}`
      )
      .then((response) => {
        if (response.status === 200 && response.data) {
          setAllBookings(response.data);
          setBookings(
            response.data.filter(
              (booking) => booking.seniorCitizenId === initialSeniorCitizenId
            )
          );
        } else {
          Toast.show({
            type: "error",
            text1: "Unable to fetch Bookings.",
            text2: "API call failed",
          });
        }
      });
  };

  const deleteAppoinment = (index, bookingObj) => {
    Alert.alert(
      "Delete Appoinment",
      "Are you sure you want to delete this Appoinment?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            console.log(`http://csci5308vm20.research.cs.dal.ca:8080/appointment/q?volunteerId=${bookingObj.volunteerId}&familyId=${bookingObj.familyId}&bookingDate=${bookingObj.bookingDate}&bookingStartTime=${bookingObj.bookingStartTime}`)
            axios
              .delete(
                `http://csci5308vm20.research.cs.dal.ca:8080/appointment/q?volunteerId=${bookingObj.volunteerId}&familyId=${bookingObj.familyId}&bookingDate=${bookingObj.bookingDate}&bookingStartTime=${bookingObj.bookingStartTime}`,
                {
                  headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                  },
                }
              )
              .then((response) => {
                if (response.status === 200) {
                  Toast.show({
                    type: "success",
                    text1: "Deleted Booking successfully.",
                    text2: "API call was successful!",
                  });
                  getBookings();
                } else {
                  Toast.show({
                    type: "error",
                    text1: "Unable to delete booking.",
                    text2: "API call failed",
                  });
                }
              });
          },
        },
      ]
    );
  };

  const handleNewBooking = () => {
    navigation.navigate("InitiateBooking");
  };

  return (
    <View style={sharedStyle.container}>
      <Pressable style={sharedStyle.pressableStyle} onPress={handleNewBooking}>
        <Text style={sharedStyle.pressableText}>New Booking</Text>
      </Pressable>

      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        placeholder="Select Senior Citizen"
        maxHeight={dropdownMaxHeight}
        style={sharedStyle.dropdown}
      />
      <FlatList
        data={bookings}
        renderItem={({ item, index }) => {
          let foundVolunteer = volunteers.find(
            (object) => object.userID === item.volunteerId
          );
          return (
            <View style={styles.itemContainer}>
              <View style={styles.detailsContainer}>
                <Text style={styles.text}>
                  Volunteer Name:{" "}
                  {foundVolunteer
                    ? foundVolunteer.first_name + " " + foundVolunteer.last_name
                    : ""}
                </Text>
                <Text style={styles.text}>
                  Description: {item.description || "N/A"}
                </Text>
                <Text style={styles.text}>
                  Booking Date: {item.bookingDate}
                </Text>
                <Text style={styles.text}>
                  Start Time: {item.bookingStartTime}
                </Text>
                <Text style={styles.text}>End Time: {item.bookingEndTime}</Text>
              </View>
              <Pressable
                style={styles.deleteButton}
                onPress={() => deleteAppoinment(index, item)}
              >
                <MaterialIcons name="delete" size={24} color="black" />
              </Pressable>
            </View>
          );
        }}
        keyExtractor={(item) => item.id}
        style={sharedStyle.flatListStyle}
        ListEmptyComponent={
          <Text style={sharedStyle.emptyText}>No bookings yet</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "black",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
    color: "white",
  },
  details: {
    fontSize: 16,
    color: "white",
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  detailsContainer: {
    flex: 1,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  deleteButton: {
    marginLeft: 10,
  },
});
export default Booking;
