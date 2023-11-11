import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  FlatList,
  Pressable,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const AddSeniorCitizen = ({ navigation }) => {
  const handleAddNew = () => {
    navigation.navigate("AddNew");
  };

  const handleAddExisting = () => {
    navigation.navigate('Verification');
  };

  const [names, setNames] = useState([
    { id: "1", name: "Alice" },
    { id: "2", name: "Bob" },
    { id: "3", name: "Charlie" },
    // Add more names here
  ]);

  const handlePressItem = (id) => {
    // Assuming 'Profile' is the screen name you have in your navigation
    // and that you pass the profile's ID as a parameter
    navigation.navigate("Profile", { profileId: id });
  };

  const renderItem = ({ item }) => (
    <View style={styles.listItem}>
      <TouchableOpacity
        onPress={() => handlePressItem(item.id)}
      >
        <Text style={styles.itemText}>{item.name}</Text>
      </TouchableOpacity>
      <Pressable onPress={() => deleteItem(index)} style={styles.deleteButton}>
        <MaterialIcons name="delete" size={24} color="black" />
      </Pressable>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleAddNew}>
          <Text style={styles.buttonText}>Add New</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleAddExisting}>
          <Text style={styles.buttonText}>Add Existing</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.heading}>Linked Accounts</Text>

      <FlatList
        data={names}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "flex-start", // Align content to the left
    justifyContent: "flex-start",
    paddingTop: 20,
    paddingHorizontal: 20, // Add horizontal padding
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "stretch", // Take the full width of the parent container
    marginBottom: 20,
  },
  button: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 5,
    flex: 1, // Make buttons take equal space
    marginHorizontal: 5, // Add space between buttons
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  deleteButton: {
    marginLeft: 8,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    alignSelf: "flex-start", // Align heading to the left
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "black",
  },
  itemText: {
    fontSize: 16,
  },
  list: {
    alignSelf: "stretch", // Ensure FlatList takes the full width
  },
});

export default AddSeniorCitizen;
