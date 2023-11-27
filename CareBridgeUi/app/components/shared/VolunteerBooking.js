import React, { useState, useMemo, useEffect, useContext } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
  Modal,
  Alert,
} from "react-native";
import moment from "moment";
import { Calendar } from "react-native-calendars";
import axios from "axios";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import UserDetailsContext from "./context/userDetailsContext";
import sharedStyle from "./styles/sharedStyle";
import Toast from "react-native-toast-message";
const Arrow = ({ direction }) => {
  return (
    <MaterialIcons
      name={direction === "left" ? "arrow-back" : "arrow-forward"}
      size={24}
      color="black"
    />
  );
};

const VolunteerBooking = ({ route, navigation }) => {
  const { userDetails } = useContext(UserDetailsContext);
  let selectedVolunteer,
    selectedSeniorCitizen,
    description = null;
  if (userDetails.type !== "volunteer") {
    selectedVolunteer = route.params.selectedVolunteer;
    selectedSeniorCitizen = route.params.selectedSeniorCitizen;
    description = route.params.description;
  }
  const [slots, setSlots] = useState({});
  const [selectedSlot, setSelectedSlot] = useState();
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [seniorCitizenInfo, setSeniorCitizenInfo] = useState(null);

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

  const openModal = (bookingDetails) => {
    setSelectedSlot(bookingDetails);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSeniorCitizenInfo(null);
    setSelectedSlot(null);
  };

  const renderSlots = (date) => {
    const daySlots = slots[date] || [];
    const rows = [];

    for (let i = 0; i < daySlots.length; i += 2) {
      rows.push(
        <View key={i} style={styles.row}>
          {daySlots.slice(i, i + 2).map((slot, index) => {
            let slotStyle;
            let onPressAction;
            const isSelected =
              selectedSlot &&
              selectedSlot.bookingStartTime === slot.bookingStartTime &&
              selectedSlot.bookingEndTime === slot.bookingEndTime;
            const today = moment().startOf("day");
            const selectedDay = moment(date);
            switch (slot.availability) {
              case 0:
                slotStyle = styles.notAvailableSlot;
                if (
                  userDetails.type === "volunteer" &&
                  selectedDay.isAfter(today)
                ) {
                  onPressAction = () => toggleSlotAvailability(slot);
                }
                break;
              case 1:
                slotStyle = styles.availableSlot;
                if (
                  userDetails.type === "volunteer" &&
                  selectedDay.isAfter(today)
                ) {
                  onPressAction = () => toggleSlotAvailability(slot);
                } else if (userDetails.type !== "volunteer"){
                  onPressAction = () => setSelectedSlot(slot);
                }
                break;
              case 2:
                slotStyle = styles.bookedSlot;
                onPressAction = () => {
                  if (userDetails.type === "volunteer") {
                    openModal(slot);
                    setSelectedSlot(slot);
                  }
                };
                break;
              default:
                slotStyle = styles.availableSlot;
            }

            return (
              <Pressable
                key={index}
                style={[
                  styles.slot,
                  slotStyle,
                  isSelected && styles.selectedSlot,
                ]}
                onPress={onPressAction}
              >
                <Text style={styles.slotText}>
                  {slot.bookingStartTime + " - " + slot.bookingEndTime}
                </Text>
              </Pressable>
            );
          })}
        </View>
      );
    }

    return rows;
  };

  useEffect(() => {
    const fetchData = async () => {
      if (
        selectedSlot &&
        selectedSlot.availability === 2 &&
        userDetails.type === "volunteer"
      ) {
        try {
          const response = await axios.get(
            `http://csci5308vm20.research.cs.dal.ca:8080/users/${selectedSlot.seniorCitizenId}`
          );
          if (response.status === 200) {
            setSeniorCitizenInfo(response.data);
          }
        } catch (error) {
          console.error("Error fetching senior citizen details:", error);
        }
      }
    };

    fetchData();
  }, [selectedSlot]);
  const deleteAppoinment = (bookingObj) => {
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
            axios
              .delete(
                `http://csci5308vm20.research.cs.dal.ca:8080/appointment/q?volunteerId=${bookingObj.volunteerId}&familyId=${bookingObj.familyId}&bookingDate=${bookingObj.bookingDate}&bookingStartTime=${bookingObj.bookingStartTime}`
              )
              .then((response) => {
                if (response) {
                  setSelectedSlot(null);
                }
              });
          },
        },
      ]
    );
  };
  const BookingDetailsModal = () => {
    const today = moment().startOf("day");
    const selectedDay = moment(selectedDate);
    if (!selectedSlot || !seniorCitizenInfo) return null;
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={closeModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable style={sharedStyle.modalClose} onPress={closeModal}>
              <MaterialIcons name="close" size={24} color="black" />
            </Pressable>
            <Text style={styles.modalText}>Booking Details</Text>
            <Text>
              Name:{" "}
              {seniorCitizenInfo.first_name + " " + seniorCitizenInfo.last_name}
            </Text>
            <Text>Address: {seniorCitizenInfo.address}</Text>
            <Text>phone number: {seniorCitizenInfo.phone_number}</Text>
            <Text>Description: {selectedSlot.description}</Text>
            {selectedDay.isAfter(today) && (
              <Pressable
                style={sharedStyle.modalButton}
                onPress={() => deleteAppoinment(selectedSlot)}
              >
                <Text style={sharedStyle.modalButtonText}>Delete</Text>
              </Pressable>
            )}
          </View>
        </View>
      </Modal>
    );
  };

  const toggleSlotAvailability = async (slot) => {
    const reqBody = {
      volunteerId: slot.volunteerId,
      familyId: slot.familyId,
      seniorCitizenId: slot.seniorCitizenId,
      bookingDate: slot.bookingDate,
      bookingStartTime: slot.bookingStartTime,
      bookingEndTime: slot.bookingEndTime,
      availability: slot.availability === 1 ? 0 : 1,
      description: slot.description,
    };
    if (userDetails.type === "volunteer") {
      try {
        if (slot.id !== null) {
          updateSlot(reqBody, slot, "toggleSlotAvailability");
        } else {
          addSlot(reqBody, slot, "toggleSlotAvailability");
        }
      } catch (error) {
        console.error("Error toggling slot status:", error);
      }
    }
  };

  const fetchSlotsForDate = async (date) => {
    try {
      const response = await axios.get(
        `http://csci5308vm20.research.cs.dal.ca:8080/appointment/${
          selectedVolunteer ? selectedVolunteer.userID : userDetails.userID
        }/q?date=${date}`
      );
      const occupiedSlots = response.data;

      const timeSlots = [
        "6:00 AM - 8.00 AM",
        "8:00 AM - 10.00 AM",
        "12.00 PM - 2.00 PM",
        "2:00 PM - 4.00 PM",
        "4:00 PM - 6.00 PM",
        "6.00 PM - 8.00 PM",
        "8:00 PM - 10.00 PM",
        "10:00 PM - 12.00 AM",
      ];

      const newSlots = timeSlots.map((timeRange) => ({
        volunteerId: selectedVolunteer
          ? selectedVolunteer.userID
          : userDetails.userID,
        familyId: null,
        seniorCitizenId: null,
        bookingDate: date,
        bookingStartTime: timeRange.split(" - ")[0],
        bookingEndTime: timeRange.split(" - ")[1],
        availability: 1,
        description: null,
        id: null,
      }));

      occupiedSlots.forEach((slot) => {
        const index = newSlots.findIndex(
          (s) =>
            s.bookingStartTime === slot.bookingStartTime &&
            s.bookingEndTime === slot.bookingEndTime
        );
        console.log(slot.bookingStartTime, slot.bookingEndTime);
        if (index !== -1) {
          newSlots[index] = { ...slot };
        }
      });

      setSlots((currentSlots) => ({
        ...currentSlots,
        [date]: newSlots,
      }));
    } catch (error) {
      console.error("Error fetching slots:", error);
    }
  };

  const bookAppointment = async (slot) => {
    const reqBody = {
      volunteerId: slot.volunteerId,
      familyId: userDetails.userID,
      seniorCitizenId: selectedSeniorCitizen.seniorCitizenId,
      bookingDate: slot.bookingDate,
      bookingStartTime: slot.bookingStartTime,
      bookingEndTime: slot.bookingEndTime,
      availability: 2,
      description: description,
    };
    try {
      if (slot.id !== null) {
        updateSlot(reqBody, slot, "bookAppoinment");
      } else {
        addSlot(reqBody, slot, "bookAppoinment");
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
    }
  };

  const addSlot = async (reqBody, slot, calledFrom) => {
    const response = await axios.post(
      "http://csci5308vm20.research.cs.dal.ca:8080/appointment",
      reqBody
    );
    if (response.status == 200) {
      Toast.show({
        type: "success",
        text1: "Slot Updated Successfully.",
        text2: "API call was successful!",
      });
      fetchSlotsForDate(selectedDate);
      setSelectedSlot(null);
    } else {
      Toast.show({
        type: "error",
        text1: "Unable to update the slot.",
        text2: "API call failed",
      });
    }
  };

  const updateSlot = async (reqBody, slot, calledFrom) => {
    const response = await axios.put(
      `http://csci5308vm20.research.cs.dal.ca:8080/appointment/q?id=${slot.id}`,
      reqBody
    );
    if (response.status == 200) {
      Toast.show({
        type: "success",
        text1: "Slot updated Successfully.",
        text2: "API call was successful!",
      });
      setSlots((currentSlots) => {
        const updatedSlots = { ...currentSlots };
        const slotIndex = updatedSlots[slot.bookingDate].findIndex(
          (s) =>
            s.bookingStartTime === slot.bookingStartTime &&
            s.bookingEndTime === slot.bookingEndTime
        );

        if (slotIndex !== -1 && calledFrom === "bookAppoinment") {
          updatedSlots[slot.bookingDate][slotIndex].availability = 2;
        } else if (
          slotIndex !== -1 &&
          calledFrom === "toggleSlotAvailability"
        ) {
          updatedSlots[slot.bookingDate][slotIndex].availability =
            reqBody.availability;
        }

        return updatedSlots;
      });

      setSelectedSlot(null);
    } else {
      Toast.show({
        type: "error",
        text1: "Unable to update the slot.",
        text2: "API call failed",
      });
    }
  };

  useEffect(() => {
    if (selectedDate) {
      fetchSlotsForDate(selectedDate);
      setSelectedSlot(null);
    }
  }, [selectedDate]);

  return (
    <View style={styles.container}>
      <Calendar
        monthFormat={"yyyy MMMM"}
        onDayPress={(day) => {
          const today = moment().startOf("day");
          const selectedDay = moment(day.dateString);

          if (userDetails.type !== "volunteer" && selectedDay.isBefore(today)) {
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
      <ScrollView style={styles.slotsContainer}>
        {selectedDate ? (
          renderSlots(selectedDate)
        ) : (
          <Text>Select a date to see available slots.</Text>
        )}
        {selectedSlot && userDetails.type !== "volunteer" && (
          <Pressable
            style={sharedStyle.pressableStyle}
            onPress={() => bookAppointment(selectedSlot)}
          >
            <Text style={sharedStyle.pressableText}>Book Appointment</Text>
          </Pressable>
        )}
      </ScrollView>
      <BookingDetailsModal />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "white",
    padding: 5,
  },
  slotsContainer: {
    flex: 1,
    paddingTop: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  slot: {
    flex: 1,
    marginHorizontal: 5,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },
  slotText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  availableSlot: {
    backgroundColor: "white",
  },
  notAvailableSlot: {
    backgroundColor: "#D3D3D3",
  },
  bookedSlot: {
    backgroundColor: "#A9A9A9",
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
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 10,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  selectedSlot: {
    borderColor: "black",
    borderWidth: 2,
  },
});

export default VolunteerBooking;
