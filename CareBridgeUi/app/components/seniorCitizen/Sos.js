import React from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const Sos = () => {
  const handlePress = () => {
    // Handle the SOS button press here
    Alert.alert(
      'Emergency',
      'Contacting the nearest hospital, police station to your current location.',
      [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
    );
    // Here you would typically integrate the actual emergency contact functionality
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.sosButton} onPress={handlePress}>
        <MaterialIcons name="add-alert" size={64} color="white" />
        <Text style={styles.sosText}>SOS</Text>
      </TouchableOpacity>
      <Text style={styles.instructionText}>
        After pressing the SOS button, we will contact the nearest hospital, police station to your current location.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  sosButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    width: 100,
    height: 100,
    borderRadius: 50,
    elevation: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  sosText: {
    color: 'white',
    fontSize: 18,
    position: 'absolute',
  },
  instructionText: {
    marginTop: 20,
    paddingHorizontal: 20,
    textAlign: 'center',
  },
});

export default Sos;
