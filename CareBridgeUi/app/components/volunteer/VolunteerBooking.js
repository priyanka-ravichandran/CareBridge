import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const Arrow = ({ direction }) => {
  return (
    <MaterialIcons
      name={direction === "left" ? "arrow-back" : "arrow-forward"}
      size={24}
      color="black"
    />
  );
};

LocaleConfig.locales["en"] = {
  monthNames: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  monthNamesShort: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  dayNames: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
};
LocaleConfig.defaultLocale = "en";

const VolunteerBooking = () => {
  const [slots, setSlots] = useState({
    "2023-11-11": {
      "06:00 AM - 8.00 AM": "available",
      "8:00 AM - 10.00 AM": "not available",
      "12.00 PM - 2.00 PM": "booked",
      "2:00 PM - 4.00 PM": "available",
      "4:00 PM - 6.00 PM": "not available",
      "6.00 PM - 8.00 PM": "booked",
      "8:00 PM - 10.00 PM": "available",
      "10:00 PM - 12.00 PM": "not available",
    },
    // Additional dates here
  });
  const [selectedDate, setSelectedDate] = useState("");
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

  const toggleSlotAvailability = (date, time) => {
    setSlots((currentSlots) => {
      const newSlots = { ...currentSlots };
      newSlots[date][time] =
        newSlots[date][time] === "available" ? "not-available" : "available";
      return newSlots;
    });
  };

  const getBookingDetails = (date, time) => {
    // Placeholder function to simulate fetching booking details
    // Replace this with your actual logic to fetch booking details
    alert(`Details for booking on ${date} at ${time}`);
  };

  const renderSlots = (date) => {
    const daySlots = slots[date] || {};
    const slotTimes = Object.keys(daySlots);
    const rows = [];

    for (let i = 0; i < slotTimes.length; i += 2) {
      rows.push(
        <View key={i} style={styles.row}>
          {slotTimes.slice(i, i + 2).map((time) => (
            <TouchableOpacity
              key={time}
              style={[
                styles.slot,
                daySlots[time] === "available"
                  ? styles.availableSlot
                  : daySlots[time] === "booked"
                  ? styles.bookedSlot
                  : styles.notAvailableSlot,
              ]}
              onPress={() =>
                setSelectedSlot({ date, time, status: daySlots[time] })
              }
              disabled={daySlots[time] === "booked"}
            >
              <Text style={styles.slotText}>{time}</Text>
            </TouchableOpacity>
          ))}
        </View>
      );
    }

    return rows;
  };

  return (
    <View style={styles.container}>
      <Calendar
        monthFormat={"yyyy MMMM"}
        onDayPress={(day) => {
          setSelectedDate(day.dateString);
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
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#f0f0f0",
  },
  slotsContainer: {
    flex: 1,
    paddingTop: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between", // Distribute slots evenly across the container
    paddingHorizontal: 10, // Side padding to ensure there's space on the sides
    marginBottom: 10, // Space between rows
  },
  slot: {
    flex: 1, // This ensures each slot will take up an equal amount of space
    marginHorizontal: 5, // Ensure there's space between slots
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    // Shadow and elevation styles as before
  },
  slotText: {
    fontSize: 16,
    fontWeight: "bold", // If the text is bold in the image
    color: "#333",
  },
  availableSlot: {
    // Additional styles for available slot if needed
  },
  bookedSlot: {
    backgroundColor: "#A9A9A9", // Darker grey to indicate booked slot
  },
  notAvailableSlot: {
    backgroundColor: "#D3D3D3", // Lighter grey to indicate not available slot
  },
});

export default VolunteerBooking;
