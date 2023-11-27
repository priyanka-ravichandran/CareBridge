import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, Text, Pressable, TextInput } from "react-native";
import Autocomplete from "react-native-autocomplete-input";

import DropDownPicker from "react-native-dropdown-picker";
import UserDetailsContext from "../../shared/context/userDetailsContext";
import sharedStyle from "../../shared/styles/sharedStyle";
import axios from "axios";

const InitiateBooking = ({ navigation }) => {
  const ITEM_HEIGHT = 40;
  const MAX_ITEMS_VISIBLE = 4;
  const dropdownMaxHeight = ITEM_HEIGHT * MAX_ITEMS_VISIBLE;
  const [open, setOpen] = useState(false);
  const { userDetails } = useContext(UserDetailsContext);
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState();
  const [selectedVolunteer, setSelectedVolunteer] = useState();
  const [items, setItems] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const setDropDownValue = () => {
    return userDetails.pairings.map((pairing) => ({
      label: pairing.email,
      value: pairing.seniorCitizenId,
    }));
  };
  const handleSelect = (item) => {
    setQuery(item.first_name + " " + item.last_name);

    setSelectedVolunteer(item);
    setFilteredData([]);
  };
  const handleNewBooking = () => {
    navigation.navigate("VolunteerBooking", {
      selectedVolunteer,
      selectedSeniorCitizen: userDetails.pairings.filter(
        (val) => val.seniorCitizenId === value
      )[0],
      description,
    });
  };
  const calculateAge = (birthdate) => {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  useEffect(() => {
    setItems(setDropDownValue);
    axios
      .get("http://csci5308vm20.research.cs.dal.ca:8080/users")
      .then((response) => {
        if (response.data) {
          let volunteer = [];
          response.data.map((user) => {
            if (user.type === "volunteer") {
              volunteer.push(user);
            }
          });
          setData(volunteer);
        }
      });
  }, []);

  useEffect(() => {
    if (query && selectedVolunteer === null) {
      const regex = new RegExp(`${query.trim()}`, "i");
      setFilteredData(
        data.filter(
          (item) => (item.first_name + " " + item.last_name).search(regex) >= 0
        )
      );
    } else {
      setFilteredData([]);
    }
  }, [query]);

  return (
    <View style={styles.container}>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder="Select Senior Citizen"
        maxHeight={dropdownMaxHeight}
        style={sharedStyle.dropdown}
      />
      <Autocomplete
        autoCapitalize="none"
        autoCorrect={false}
        containerStyle={sharedStyle.autocompleteContainer}
        data={filteredData}
        value={query}
        onChangeText={(text) => {
          setQuery(text);
          if (selectedVolunteer !== null) {
            setSelectedVolunteer(null);
          }
        }}
        placeholder="Enter Volunteer Name"
        flatListProps={{
          keyboardShouldPersistTaps: "always",
          keyExtractor: (item) => item.first_name + item.last_name,
          renderItem: ({ item }) => (
            <Pressable
              style={styles.itemText}
              onPress={() => handleSelect(item)}
            >
              <Text>{item.first_name + " " + item.last_name}</Text>
            </Pressable>
          ),
        }}
      />
      {selectedVolunteer && (
        <View style={styles.userInfo}>
          <Text>Email: {selectedVolunteer.email}</Text>
          <Text>Age: {calculateAge(selectedVolunteer.birthdate)}</Text>
          <Text>Phone Number: {selectedVolunteer.phone_number}</Text>
          <Text>Address: {selectedVolunteer.address}</Text>
        </View>
      )}
      <TextInput
        style={sharedStyle.input}
        placeholder="Description"
        value={description}
        onChangeText={(text) => setDescription(text)}
      />
      <Pressable style={sharedStyle.pressableStyle} onPress={handleNewBooking}>
        <Text style={sharedStyle.pressableText}> Next </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  dropdown: {
    backgroundColor: "white",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 4,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  itemText: {
    padding: 10,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
  },
  userInfo: {
    marginTop: 20,
    marginBottom: 20,
    padding: 10,
    backgroundColor: "white",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 4,
  },
  input: {
    height: 40,
    marginVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: "#E6E6E6",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 4,
  },
});
export default InitiateBooking;
