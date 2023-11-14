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
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import UserDetailsContext from "./context/userDetailsContext";

// { id: "1", name: "Medicine 1", time: new Date() }
const MedicineList = () => {
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [medicinesByDay, setMedicinesByDay] = useState({
    M: [],
    T: [],
    W: [],
    Th: [],
    F: [],
    S: [],
    Su: [],
  });
  const [isModalVisible, setModalVisible] = useState(false);
  const [newMedicineName, setNewMedicineName] = useState("");
  const [newMedicineTime, setNewMedicineTime] = useState(new Date());
  const userDetails = useContext(UserDetailsContext);

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
    axios
      .get(
        `http://csci5308vm20.research.cs.dal.ca:8080/medicineReminder/${userDetails.userID}`
      )
      .then((response) => {
        if (response && response.data) {
          let medicines = medicinesByDay;

          response.data.map((medicine) => {
            medicines[keyMap[medicine.day]].push(medicine);
          });
          setMedicinesByDay(medicines);
        }
      })
      .catch((error) => {
        // Handle the error
        console.error(
          "There was an error fetching the medicine reminders:",
          error
        );
      });
  }, []);

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
        console.log(response);

        setMedicinesByDay({
          ...medicinesByDay,
          [selectedDay]: [...medicinesByDay[selectedDay], newMedicine],
        });
        setNewMedicineName("");
        setModalVisible(false);
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
        if (response) {
          setMedicinesByDay({
            ...medicinesByDay,
            [day]: medicinesByDay[day].filter(
              (medicine) => medicine.medicineName !== medicineName
            ),
          });
        }
      });
  };
  // /q?elderlyId=${
  //   item.elderlyId
  // }&volunteerId=${item.volunteerId}&medicineReminderNumber=${
  //   item.medicineReminderNumber
  // }&day=${selectedDay}&time=${selectedTime.toLocaleTimeString(
  //   "en-US",
  //   { hour: "2-digit", minute: "2-digit", hour12: false }
  // )}
  const renderMedicine = ({ item }) => {
    const [hours, minutes] = item.time.split(":");
    const currentDate = new Date();
    currentDate.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0);
    return (
      <View style={styles.medicineItem}>
        <Text style={styles.medicineName}>{item.medicineName}</Text>
        <View style={styles.medicineTimeDeleteContainer}>
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
                  `http://csci5308vm20.research.cs.dal.ca:8080/medicineReminder`,
                  medicine,
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
      <FlatList
        data={medicinesByDay[selectedDay]}
        renderItem={renderMedicine}
        keyExtractor={(item) => item.medicineReminderNumber}
        style={styles.medicineList}
      />
      <Pressable style={styles.addButton} onPress={() => setModalVisible(true)}>
        <MaterialIcons name="add" size={24} color="white" />
      </Pressable>
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
              style={styles.closeButton}
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
            <Pressable style={styles.modalButton} onPress={addMedicine}>
              <Text style={styles.modalButtonText}>Add Medicine</Text>
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
  modalButton: {
    backgroundColor: "black",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
export default MedicineList;
