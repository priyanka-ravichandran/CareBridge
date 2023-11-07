import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';

const VolunteerBooking = () => {
  return (
    <View style={styles.container}>
      <Calendar
        // Style and other calendar props
        style={styles.calendar}
        current={'2023-09-02'}
        markedDates={{
          '2023-09-02': { selected: true, marked: true, selectedColor: 'blue' },
        }}
        // Hide the arrows if you don't need them
        hideArrows={true}
        // Theme your calendar to match the image as close as possible
        theme={{
          selectedDayBackgroundColor: '#00adf5',
          todayTextColor: '#00adf5',
          dayTextColor: '#2d4150',
          textDisabledColor: '#d9e1e8',
        }}
      />
      <ScrollView style={styles.appointmentsList}>
        <AppointmentItem
          time="10:00-13:00"
          title="Booking from Mary"
          description="Take him for a walk for 15 mins"
        />
        <AppointmentItem
          time="10:00-13:00"
          title="Booking from David"
          description="Take him for a walk for 15 mins"
        />
        {/* ... other appointments */}
      </ScrollView>
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const AppointmentItem = ({ time, title, description }) => (
  <View style={styles.appointmentItem}>
    <Text style={styles.timeText}>{time}</Text>
    <View style={styles.detailContainer}>
      <Text style={styles.titleText}>{title}</Text>
      <Text style={styles.descriptionText}>{description}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  calendar: {
    borderBottomWidth: 1,
    borderBottomColor: '#ececec',
  },
  appointmentsList: {
    flex: 1,
    marginTop: 10,
  },
  appointmentItem: {
    flexDirection: 'row',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ececec',
    backgroundColor: '#fff',
  },
  timeText: {
    fontSize: 16,
    color: '#333',
    width: 75, // Fixed width for alignment
  },
  detailContainer: {
    flex: 1, // Take up the rest of the space
    paddingLeft: 10, // Give some space between the time and details
  },
  titleText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  descriptionText: {
    fontSize: 14,
    color: '#666',
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  addButtonText: {
    color: 'white',
    fontSize: 30,
    lineHeight: 30, // Adjust the line height to center the plus sign
  },
});

export default VolunteerBooking;
