import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';

const VolunteerSlot = () => {
  // Add state and functions as needed for your logic

  return (
    <View style={styles.container}>
      {/* Placeholder for the calendar */}
      <View style={styles.calendarPlaceholder}>
        <Text>Calendar will go here</Text>
      </View>
      
      {/* Action buttons */}
      <View style={styles.actionButtons}>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>SELECT DATE</Text>
        </Pressable>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>SELECT TIME</Text>
        </Pressable>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>CUSTOMIZE</Text>
        </Pressable>
      </View>

      {/* Confirm button */}
      <Pressable style={styles.confirmButton}>
        <Text style={styles.confirmButtonText}>CONFIRM</Text>
      </Pressable>

      {/* Bottom navigation bar placeholders */}
      <View style={styles.bottomNavBar}>
        <View style={styles.navBarItem}></View>
        <View style={styles.navBarItem}></View>
        <View style={styles.navBarItem}></View>
        <View style={styles.navBarItem}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  calendarPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    margin: 10,
    borderRadius: 6,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 10,
  },
  button: {
    backgroundColor: '#e7e7e7',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  buttonText: {
    color: '#333',
  },
  confirmButton: {
    backgroundColor: '#0000ff',
    paddingVertical: 15,
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 6,
  },
  confirmButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  bottomNavBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  navBarItem: {
    width: 50,
    height: 50,
    backgroundColor: '#e7e7e7',
    borderRadius: 25,
  },
});
export default VolunteerSlot;