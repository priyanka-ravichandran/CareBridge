import React, { useState, useEffect, useContext } from "react";
import { useIsFocused } from "@react-navigation/native";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  FlatList,
  Pressable,
} from "react-native";
import axios from "axios";
import { MaterialIcons } from "@expo/vector-icons";
import UserDetailsContext from "../../shared/context/userDetailsContext";

const AddSeniorCitizen = ({ navigation }) => {
  const [pairings, setPairing] = useState([]);
  const isFocused = useIsFocused();
  const userDetails = useContext(UserDetailsContext);

  useEffect(() => {
    getPairings();
  }, []);
  useEffect(() => {
    if (isFocused) {
      getPairings();
    }
  }, [isFocused]);
  const getPairings = () => {
    axios
      .get(`http://csci5308vm20.research.cs.dal.ca:8080/pairings`) ///q?familyId=${userDetails.userID}
      .then(async (response) => {
        const fetchedList = [];
        const usersList = await fetchUserDetails();
        if (response && response.data) {
          response.data.map((pair) => {
            let pairObj = pair;
            let seniorCitizen = usersList.filter(function (user) {
              return pair.seniorCitizenId === user.userID;
            });
            console.log(seniorCitizen);
            pairObj.firstName = seniorCitizen[0].first_name;
            pairObj.lastName = seniorCitizen[0].last_name;
            fetchedList.push(pairObj);
          });
          setPairing(fetchedList);
        }
      });
  };

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(
        `http://csci5308vm20.research.cs.dal.ca:8080/users`
      );
      if (response && response.data) {
        return response.data;
      }
    } catch (error) {
      console.error("There was an error fetching the user details", error);
    }
  };

  const handleAddNew = () => {
    navigation.navigate("AddNew");
  };

  const handleAddExisting = () => {
    navigation.navigate("Verification");
  };

  const handlePressItem = (seniorCitizenId) => {};

  const renderItem = ({ item }) => (
    <View style={styles.listItem}>
      <TouchableOpacity onPress={() => handlePressItem(item.seniorCitizenId)}>
        <Text style={styles.itemText}>
          {console.log(item)}
          {item.firstName + " " + item.lastName}
        </Text>
      </TouchableOpacity>
      <Pressable onPress={() => {}} style={styles.deleteButton}>
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
        data={pairings}
        renderItem={renderItem}
        keyExtractor={(item) => item.seniorCitizenId}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "stretch",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
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
