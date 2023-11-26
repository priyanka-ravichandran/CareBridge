import React, { useState, useEffect, useMemo, useContext } from "react";
import {
  View,
  Modal,
  Button,
  TextInput,
  StyleSheet,
  FlatList,
  Text,
  Alert,
  Pressable,
} from "react-native";

import { Calendar } from "react-native-calendars";

import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import moment from "moment";
import sharedStyle from "./styles/sharedStyle";
import axios from "axios";
import UserDetailsContext from "./context/userDetailsContext";
import DropDownPicker from "react-native-dropdown-picker";
const ITEM_HEIGHT = 40;
const MAX_ITEMS_VISIBLE = 4;
const dropdownMaxHeight = ITEM_HEIGHT * MAX_ITEMS_VISIBLE;
const ReminderApp = () => {
  const { userDetails } = useContext(UserDetailsContext);
  const [selectedDate, setSelectedDate] = useState("");
  const [reminders, setReminders] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newReminder, setNewReminder] = useState({
    description: "",
    time: new Date(),
  });
  const [open, setOpen] = useState(false);
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

  const addReminder = () => {
    const modifiedTime = newReminder.time.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const newReminderObj = {
      elderlyId: userDetails.userID,
      time: modifiedTime,
      description: newReminder.description,
      volunteerId: 1002,
      reminderNumber: userDetails.userID + String(Date.now()),
      date: selectedDate,
    };
    axios
      .post(
        "http://csci5308vm20.research.cs.dal.ca:8080/reminder",
        newReminderObj,
        {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
          },
        }
      )
      .then((response) => {
        setReminders([...reminders, newReminderObj]);
        setModalVisible(false);
        setNewReminder({ description: "", time: new Date() });
      });
  };
  const deleteReminder = (index, reminderObj) => {
    Alert.alert(
      "Delete Reminder",
      "Are you sure you want to delete this reminder?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            axios
              .delete(
                `http://csci5308vm20.research.cs.dal.ca:8080/reminder/q?reminderNumber=${reminderObj.reminderNumber}`
              )
              .then((response) => {
                if (response) {
                  setReminders((reminders) =>
                    reminders.filter((_, i) => i !== index)
                  );
                }
              });
          },
        },
      ]
    );
  };
  const getReminder = async (date) => {
    try {
      const selectedUserId =
        userDetails.type === "senior" ? userDetails.userID : value;
      const response = await axios.get(
        `http://csci5308vm20.research.cs.dal.ca:8080/reminder/${selectedUserId}/${date}`
      );
      if (response && response.data) {
        setReminders(response.data);
        console.log(response.data)
      }
    } catch (error) {
      console.error("Error fetching slots:", error);
    }
  };
  useEffect(() => {
    if (selectedDate) {
      getReminder(selectedDate);
    } 
  }, [selectedDate, value]);
  useEffect(() => {
    if (userDetails.type !== "senior") {
      setItems(setDropDownValue());
    }
  }, []);
  const renderReminder = ({ item, index }) => {
    const [hours, minutes] = item.time.split(":");
    const currentDate = new Date();
    currentDate.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0);
    return (
      <View style={sharedStyle.flatListItem}>
        <Text style={sharedStyle.flatListItemLeft}>{item.description}</Text>
        <View style={sharedStyle.flatListItemRight}>
          <DateTimePicker
            value={currentDate}
            mode="time"
            display="default"
            onChange={(event, selectedTime) => {
              const updatedReminderObj = {
                elderlyId: item.elderlyId,
                volunteerId: item.volunteerId,
                reminderNumber: item.reminderNumber,
                time: selectedTime.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                }),
                description: item.description,
                date: selectedDate,
              };
              console.log(updatedReminderObj)
              axios
                .put(
                  `http://csci5308vm20.research.cs.dal.ca:8080/reminder/q?elderlyId=${item.elderlyId}&volunteerId=${item.volunteerId}&reminderNumber=${item.reminderNumber}`,
                  updatedReminderObj,
                  {
                    headers: {
                      "Content-Type": "application/json;charset=UTF-8",
                    },
                  }
                )
                .then((response) => {
                  console.log(response);
                });
            }}
            style={styles.timePicker}
          />
          <Pressable
            style={styles.deleteButton}
            onPress={() => deleteReminder(index, item)}
          >
            <MaterialIcons name="delete" size={24} color="black" />
          </Pressable>
        </View>
      </View>
    );
  };

  const Arrow = ({ direction }) => {
    return (
      <MaterialIcons
        name={direction === "left" ? "arrow-back" : "arrow-forward"}
        size={24}
        color="black"
      />
    );
  };
  const markedDates = useMemo(
    () => ({
      [selectedDate]: {
        selected: true,
        selectedColor: "#222222",
        selectedTextColor: "white",
      },
    }),
    [selectedDate]
  );

  const onTimeSelected = (event, selectedTime) => {
    setNewReminder({
      ...newReminder,
      time: selectedTime,
    });
  };

  return (
    <View style={styles.container}>
      <Calendar
        monthFormat={"yyyy MMMM"}
        onDayPress={(day) => {
          const today = moment().startOf("day");
          const selectedDay = moment(day.dateString);

          if (selectedDay.isBefore(today)) {
            console.log("Cannot select a date in the past");
          } else {
            setSelectedDate(day.dateString);
          }
        }}
        markedDates={markedDates}
        hideExtraDays={true}
        firstDay={1}
        onMonthChange={(month) => {
          console.log("month changed", month);
        }}
        hideArrows={false}
        renderArrow={(direction) => <Arrow direction={direction} />}
        disableAllTouchEventsForDisabledDays={true}
        enableSwipeMonths={true}
      />
      {userDetails.type !== "senior" && userDetails.pairings.length === 0 ? (
        <Text style={styles.noPairingsText}>
          Pair with a senior citizen to view checklists.
        </Text>
      ) : (
        <>
          {userDetails.type !== "senior" && (
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              placeholder="Select Senior Citizen"
              maxHeight={dropdownMaxHeight}
              style={sharedStyle.dropdown}
            />
          )}
        </>
      )}
      <FlatList
        data={reminders}
        renderItem={renderReminder}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={
          <Text style={sharedStyle.emptyText}>No Reminders yet</Text>
        }
        style={sharedStyle.flatListStyle}
      />
      <Pressable style={styles.fab} onPress={() => setModalVisible(true)}>
        <Ionicons name="ios-add" size={24} color="white" />
      </Pressable>
      <Modal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Pressable
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Ionicons name="ios-close" size={30} color="black" />
            </Pressable>
            <TextInput
              style={styles.input}
              placeholder="Medicine Name"
              value={newReminder.description}
              onChangeText={(text) =>
                setNewReminder({ ...newReminder, description: text })
              }
            />
            <DateTimePicker
              value={newReminder.time}
              mode="time"
              display="default"
              onChange={onTimeSelected}
              is24Hour={true}
            />
            <Button title="Add Medicine" onPress={addReminder} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  fab: {
    position: "absolute",
    right: 30,
    bottom: 30,
    backgroundColor: "black",
    borderRadius: 28,
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  remindersList: {
    width: "100%",
  },
  reminder: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  reminderLeft: {
    flex: 3,
    paddingRight: 10, // To ensure text doesn't get too close to the time
  },
  reminderRight: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  reminderText: {
    // Add your styles for reminder text
  },
  reminderTime: {
    marginRight: 10, // Space between time and delete icon
  },
  closeButton: {
    alignSelf: "flex-end",
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 20,
    width: "100%",
  },
  timeInput: {
    borderBottomWidth: 1,
    padding: 10,
    marginBottom: 20,
    width: "100%",
    alignItems: "center",
  },
  reminder: {
    backgroundColor: "white",
    padding: 10,
  },
  reminderText: {
    color: "black",
  },
  timePitimePicker: {
    width: 100,
    marginRight: 10,
  },
  deleteButton: {
    marginLeft: 10,
  },
  timePicker: {
    width: 100,
    marginRight: 10,
  },
  noPairingsText: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 16,
    color: "grey",
  },
});

export default ReminderApp;
