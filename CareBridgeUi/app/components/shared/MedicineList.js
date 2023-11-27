import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  Modal,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import DropDownPicker from "react-native-dropdown-picker";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import UserDetailsContext from "./context/userDetailsContext";
import sharedStyle from "./styles/sharedStyle";
import Toast from "react-native-toast-message";

const ITEM_HEIGHT = 40;
const MAX_ITEMS_VISIBLE = 4;
const dropdownMaxHeight = ITEM_HEIGHT * MAX_ITEMS_VISIBLE;

const MedicineList = () => {
  let initialMedicineInfo = {
    M: [],
    T: [],
    W: [],
    Th: [],
    F: [],
    S: [],
    Su: [],
  };
  const [selectedDay, setSelectedDay] = useState("");
  const [medicinesByDay, setMedicinesByDay] = useState(initialMedicineInfo);
  const [isModalVisible, setModalVisible] = useState(false);
  const [newMedicineName, setNewMedicineName] = useState("");

  const [newMedicineTime, setNewMedicineTime] = useState(new Date());
  const { userDetails } = useContext(UserDetailsContext);
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

  const days = ["M", "T", "W", "Th", "F", "S", "Su"];
  const keyMap = {
    Monday: "M",
    Tuesday: "T",
    Wednesday: "W",
    Thursday: "Th",
    Friday: "F",
    Saturday: "S",
    Sunday: "Su",
  };

  useEffect(() => {
    if (userDetails.type === "senior") {
      getMedicineList(userDetails.userID);
    } else {
      setItems(setDropDownValue());
      // if (userDetails.pairings.length > 0) {
      //   getMedicineList(initialSeniorCitizenId);
      // }
    }
  }, []);

  useEffect(() => {
    if (userDetails.type !== "senior") {
      getMedicineList(value);
    }
  }, [value]);

  const getMedicineList = (userId) => {
    let today = new Date();
    let dayIndex = today.getDay();
    let days = ["Su", "M", "T", "W", "Th", "F", "S"];
    axios
      .get(
        `http://csci5308vm20.research.cs.dal.ca:8080/medicineReminder/${userId}`
      )
      .then((response) => {
        if (response && response.data) {
          let medicines = initialMedicineInfo;

          response.data.map((medicine) => {
            medicines[keyMap[medicine.day]].push(medicine);
          });
          setMedicinesByDay(medicines);
          setSelectedDay(days[dayIndex]);
        }
      })
      .catch((error) => {
        Toast.show({
          type: "error",
          text1: "There was an error fetching the medicine reminders:",
          text2: error,
        });
      });
  };

  const addMedicine = () => {
    let day = Object.keys(keyMap).find((key) => keyMap[key] === selectedDay);
    const newMedicine = {
      elderlyId: userDetails.userID,
      medicineName: newMedicineName,
      time: newMedicineTime.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
      volunteerId: 1002,
      day: day,
      medicineReminderNumber: userDetails.userID + String(Date.now()),
    };
    axios
      .post(
        "http://csci5308vm20.research.cs.dal.ca:8080/medicineReminder",
        newMedicine,
        {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          setMedicinesByDay({
            ...medicinesByDay,
            [selectedDay]: [...medicinesByDay[selectedDay], newMedicine],
          });
          setNewMedicineName("");
          setModalVisible(false);
        } else
          Toast.show({
            type: "error",
            text1: "unable to update medicine details.",
            text2: "API call failed",
          });
      });
  };

  const removeMedicine = (day, medicineName) => {
    let medicineToDelete = medicinesByDay[day].filter(
      (medicine) => medicine.medicineName === medicineName
    )[0];
    axios
      .delete(
        `http://csci5308vm20.research.cs.dal.ca:8080/medicineReminder/q?medicineReminderNumber=${medicineToDelete.medicineReminderNumber}`
      )
      .then((response) => {
        if (response.status === 200) {
          Toast.show({
            type: "success",
            text1: "Deleted Medicine Successfully ",
            text2: "API call was successful!",
          });
          setMedicinesByDay({
            ...medicinesByDay,
            [day]: medicinesByDay[day].filter(
              (medicine) => medicine.medicineName !== medicineName
            ),
          });
        } else
          Toast.show({
            type: "error",
            text1: "unable to delete medicine.",
            text2: "API call failed",
          });
      });
  };

  const renderMedicine = ({ item }) => {
    const [hours, minutes] = item.time.split(":");
    const currentDate = new Date();
    currentDate.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0);
    return (
      <View style={sharedStyle.flatListItem}>
        <Text style={sharedStyle.flatListItemLeft}>{item.medicineName}</Text>
        <View style={sharedStyle.flatListItemRight}>
          <DateTimePicker
            value={currentDate}
            mode="time"
            display="default"
            onChange={(event, selectedTime) => {
              let day = Object.keys(keyMap).find(
                (key) => keyMap[key] === selectedDay
              );
              const medicine = {
                elderlyId: item.elderlyId,
                medicineName: item.medicineName,
                time: selectedTime.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                }),
                volunteerId: 1002,
                day: day,
                medicineReminderNumber: item.medicineReminderNumber,
              };
              axios
                .put(
                  `http://csci5308vm20.research.cs.dal.ca:8080/medicineReminder/q?elderlyId=${item.elderlyId}&volunteerId=1002&medicineReminderNumber=${item.medicineReminderNumber}`,
                  medicine,
                  {
                    headers: {
                      "Content-Type": "application/json;charset=UTF-8",
                    },
                  }
                )
                .then((response) => {
                  if (response && response.status === 200)
                    Toast.show({
                      type: "success",
                      text1: "Updated Medicine Details Successfully ",
                      text2: "API call was successful!",
                    });
                  else
                    Toast.show({
                      type: "error",
                      text1: "unable to update medicine details.",
                      text2: "API call failed",
                    });
                });
            }}
            style={styles.timePicker}
          />
          <Pressable
            style={styles.deleteButton}
            onPress={() => removeMedicine(selectedDay, item.medicineName)}
          >
            <MaterialIcons name="delete" size={24} color="black" />
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.dayList}>
        {days.map((day, index) => (
          <Pressable
            key={day}
            style={[
              styles.dayButton,
              selectedDay === days[index] && styles.selectedDay,
            ]}
            onPress={() => setSelectedDay(days[index])}
          >
            <Text
              style={[selectedDay === days[index] && styles.selectedDayText]}
            >
              {day}
            </Text>
          </Pressable>
        ))}
      </View>
      {userDetails.type !== "senior" && userDetails.pairings.length === 0 ? (
        <Text style={sharedStyle.emptyText}>
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
        data={medicinesByDay[selectedDay]}
        renderItem={renderMedicine}
        keyExtractor={(item) => item.medicineReminderNumber}
        style={sharedStyle.flatListStyle}
      />
      <View style={styles.row}>
        <Pressable
          style={styles.addButton}
          onPress={() => {
            console.log("in");
            setModalVisible(true);
          }}
        >
          <MaterialIcons name="add" size={24} color="white" />
        </Pressable>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setModalVisible(!isModalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable
              style={sharedStyle.modalClose}
              onPress={() => setModalVisible(false)}
            >
              <MaterialIcons name="close" size={24} color="black" />
            </Pressable>
            <View style={styles.inputRow}>
              <TextInput
                style={styles.input}
                placeholder="Medicine Name"
                value={newMedicineName}
                onChangeText={setNewMedicineName}
              />
              <DateTimePicker
                value={newMedicineTime}
                mode="time"
                display="default"
                onChange={(event, selectedTime) => {
                  setNewMedicineTime(selectedTime || newMedicineTime);
                }}
                style={styles.timePicker}
              />
            </View>
            <Pressable style={sharedStyle.modalButton} onPress={addMedicine}>
              <Text style={sharedStyle.modalButtonText}>Add Medicine</Text>
            </Pressable>
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
  dayList: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: "black",
  },
  dayButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 15,
  },
  selectedDay: {
    backgroundColor: "black",
  },
  selectedDayText: {
    color: "white",
  },
  medicineList: {
    flex: 1,
  },
  medicineItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "black",
  },
  medicineName: {
    color: "black",
    flex: 1,
    fontSize: 16,
  },
  medicineTimeDeleteContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  timePicker: {
    width: 100,
    marginRight: 10,
  },
  deleteButton: {
    marginLeft: 10,
  },
  addButton: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "black",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    fontSize: 30,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
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
    shadowRadius: 4,
    elevation: 5,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "white",
    borderColor: "black",
    borderRadius: 5,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default MedicineList;
