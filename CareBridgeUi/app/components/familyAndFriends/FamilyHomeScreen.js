import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

const FamilyHomeScreen = () => {

  const handleAddNew = () => {
    // TODO: Implement what should happen when "Add New" is pressed
  };

  const handleAddExisting = () => {
    // TODO: Implement what should happen when "Add Existing" is pressed
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleAddNew}>
        <Text style={styles.buttonText}>Add New</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleAddExisting}>
        <Text style={styles.buttonText}>Add Existing</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  button: {
    backgroundColor: 'black', 
    padding: 10,
    borderRadius: 5,
    marginBottom: 10, 
    width: '80%', 
    alignItems: 'center', 
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default FamilyHomeScreen;
