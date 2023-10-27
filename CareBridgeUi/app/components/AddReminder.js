import React, { useState } from 'react';
import { View, Text, StyleSheet, Picker, Button } from 'react-native';

export default function App() {
  const [selectedPerson, setSelectedPerson] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button title="<" onPress={() => {}} />
        <Text style={styles.headerText}>September 2023</Text>
        <Button title=">" onPress={() => {}} />
      </View>
      
      {/* ... Add your calendar days here ... */}
      
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedPerson}
          onValueChange={(itemValue) => setSelectedPerson(itemValue)}
        >
          <Picker.Item label="Select Senior Citizen" value="" />
          <Picker.Item label="John" value="John" />
          <Picker.Item label="Alice" value="Alice" />
        </Picker>
      </View>

      <View style={styles.reminder}>
        <Text>10:00-13:00</Text>
        <Text>Reminder for Taking Medicine</Text>
        <Text>Take 1 ranitidine 500 tablet after breakfast</Text>
      </View>

      <View style={styles.appointment}>
        <Text>10:00-13:00</Text>
        <Text>Doctor’s Appointment</Text>
        <Text>Go to ortho doctor for knee rehab.</Text>
      </View>

      {/* ... Add other components as necessary ... */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: 'grey',
    marginBottom: 20,
  },
  reminder: {
    backgroundColor: '#E0E0E0',
    padding: 10,
    marginBottom: 10,
  },
  appointment: {
    backgroundColor: '#E0E0E0',
    padding: 10,
  },
});
