import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const UserEntry = ({ name, age, contact }) => (
  <View style={styles.userEntry}>
    <View style={styles.userIndicator} />
    <View style={styles.userInfo}>
      <Text style={styles.userName}>{name}</Text>
      <Text style={styles.userAge}>Age: {age}</Text>
      <Text style={styles.userContact}>Contact Number: {contact}</Text>
    </View>
  </View>
);

export default function BookVolunteer() {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formSection}>
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <Text style={styles.label}>Choose Date:</Text>
          {/* Display selected date here */}
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onChangeDate}
          />
        )}
        <TouchableOpacity onPress={() => setShowTimePicker(true)}>
          <Text style={styles.label}>Choose Time:</Text>
          {/* Display selected time here */}
        </TouchableOpacity>
        {showTimePicker && (
          <DateTimePicker
            value={date}
            mode="time"
            display="default"
            onChange={(event, selectedTime) => {
              setShowTimePicker(false);
              if (selectedTime) {
                setDate(selectedTime);
              }
            }}
          />
        )}
      </View>

      <UserEntry name="Samuel" age="28" contact="888-xxxx-748" />
      <UserEntry name="Emma" age="34" contact="882-xxxx-543" />
      <UserEntry name="Daniel" age="31" contact="792-xxxx-775" />

      <TouchableOpacity style={styles.bookButton}>
        <Text style={styles.bookButtonText}>BOOK VOLUNTEER</Text>
      </TouchableOpacity>
      
      {/* Footer placeholder */}
      <View style={styles.footer}>
        {/* Replace with actual navigation components */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  formSection: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginVertical: 8,
  },
  userEntry: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  userIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'red',
    marginRight: 8,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontWeight: 'bold',
  },
  userAge: {},
  userContact: {},
  bookButton: {
    backgroundColor: 'blue',
    borderRadius: 5,
    margin: 20,
    padding: 15,
  },
  bookButtonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
});
