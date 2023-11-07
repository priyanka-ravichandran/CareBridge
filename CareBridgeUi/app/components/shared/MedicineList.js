import React, { useState, useEffect } from "react";
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

const mockMedicines = {
  Monday: [{ id: "1", name: "Medicine 1", time: new Date() }],
};

export default function MedicineList() {
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [medicinesByDay, setMedicinesByDay] = useState(mockMedicines);
  const [isModalVisible, setModalVisible] = useState(false);
  const [newMedicineName, setNewMedicineName] = useState("");
  const [newMedicineTime, setNewMedicineTime] = useState(new Date());

  const days = ["M", "T", "W", "Th", "F", "S", "Su"]; 

  useEffect(() => {
    axios
      .get("http://csci5308vm20.research.cs.dal.ca:8080/medicineReminder/1001")
      .then((response) => {
        if (response && response.data) {
          // Assume response.data is structured correctly
          setMedicinesByDay(response.data);
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
    const newMedicine = {
      id: String(medicinesByDay[selectedDay].length + 1),
      name: newMedicineName,
      time: newMedicineTime,
    };
    setMedicinesByDay({
      ...medicinesByDay,
      [selectedDay]: [...medicinesByDay[selectedDay], newMedicine],
    });
    setNewMedicineName("");
    setModalVisible(false);
  };

  const removeMedicine = (day, id) => {
    setMedicinesByDay({
      ...medicinesByDay,
      [day]: medicinesByDay[day].filter((medicine) => medicine.id !== id),
    });
  };

  const renderMedicine = ({ item }) => (
    <View style={styles.medicineItem}>
      <Text style={styles.medicineName}>{item.name}</Text>
      <View style={styles.medicineTimeDeleteContainer}>
        <DateTimePicker
          value={item.time}
          mode="time"
          display="default"
          onChange={(event, selectedTime) => {
            // Here you should handle updating the time in your state
            // This part will require a function to update the time of a specific medicine
          }}
          style={styles.timePicker}
        />
        <Pressable
          style={styles.deleteButton}
          onPress={() => removeMedicine(selectedDay, item.id)}
        >
          <MaterialIcons name="delete" size="24" color="black" />
        </Pressable>
      </View>
    </View>
  );

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
        keyExtractor={(item) => item.id}
        style={styles.medicineList}
      />
      <Pressable style={styles.addButton} onPress={() => setModalVisible(true)}>
        <MaterialIcons name="add" size="24" color="white" />
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
}
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
