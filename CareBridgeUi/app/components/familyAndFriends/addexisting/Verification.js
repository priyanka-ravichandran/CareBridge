import React, { useState, useEffect, useContext } from "react";
import { View, TextInput, Text, StyleSheet, Pressable } from "react-native";
import Autocomplete from "react-native-autocomplete-input";
import axios from "axios";
import UserDetailsContext from "../../shared/context/userDetailsContext";

const Verification = ({ navigation }) => {
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedValue, setSelectedValue] = useState({});
  const [disableAutoComplete, setDisableAutoComplete] = useState(true);
  const [verificationCode, setVerificationCode] = useState("");
  const [data, setData] = useState([]);
  const [errors, setErrors] = useState({});
  const { userDetails, setUserDetails } = useContext(UserDetailsContext);
  const [pairCode, setPairCode] = useState("");

  const handleSelect = (item) => {
    setQuery(item.first_name + " " + item.last_name);
    setPairCode(item.pairCode);
    setSelectedValue(item);
    setFilteredData([]);
    setDisableAutoComplete(false);
  };
  useEffect(() => {
    axios
      .get("http://csci5308vm20.research.cs.dal.ca:8080/users")
      .then((response) => {
        if (response.data) {
          let seniorCitizens = [];
          response.data.map((user) => {
            if (user.type === "senior") {
              seniorCitizens.push(user);
            }
          });
          setData(seniorCitizens);
        }
      });
  }, []);

  useEffect(() => {
    if (query) {
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
  const verifyCode = () => {
    let errorMessages = errors;
    if (pairCode === verificationCode) {
      let pairingData = {
        seniorCitizenId: selectedValue.userID,
        familyId: userDetails.userID,
      };
      axios
        .post(
          "http://csci5308vm20.research.cs.dal.ca:8080/pairings",
          pairingData,
          {
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            setUserDetails((prevData) => ({
              ...prevData,
              pairings: [
                ...prevData.pairings,
                {
                  ...pairingData,
                  email: selectedValue.email,
                  first_name: selectedValue.first_name,
                  last_name: selectedValue.last_name,
                },
              ],
            }));
            navigation.navigate("AddSeniorCitizen");
          } else {
            console.log(response);
          }
        });
    } else {
      errorMessages.pairingCode = "Incorrect code";
      setErrors(errorMessages);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>Search for senior citizen</Text>
        <Autocomplete
          autoCapitalize="none"
          editable={disableAutoComplete}
          autoCorrect={false}
          containerStyle={styles.autocompleteContainer}
          data={filteredData}
          value={query}
          onChangeText={(text) => setQuery(text)}
          placeholder="Enter Item Name"
          flatListProps={{
            keyboardShouldPersistTaps: "always",
            keyExtractor: (item) => item.first_name + item.last_name,
            renderItem: ({ item }) => (
              <Pressable
                style={styles.itemText}
                onPress={() => handleSelect(item)}
              >
                {item.first_name + " " + item.last_name}
              </Pressable>
            ),
          }}
        />
      </View>
      {!disableAutoComplete && (
        <View>
          <Text style={styles.header}>Enter 6-digit Code</Text>
          <TextInput
            style={styles.input}
            onChangeText={(value) => {
              setVerificationCode(value);
              if (errors.pairCode) {
                setErrors((prevErrors) => {
                  let newErrors = { ...prevErrors };
                  delete newErrors.pairCode;
                  return newErrors;
                });
              }
            }}
            value={verificationCode}
            maxLength={6}
            placeholder=""
            textAlign="center"
          />
          {errors.pairingCode && (
            <Text style={{ color: "red" }}>{errors.pairingCode}</Text>
          )}
          <View style={styles.buttonContainer}>
            <Pressable style={styles.button} onPress={verifyCode}>
              <Text style={styles.buttonText}>Verify</Text>
            </Pressable>

            <Pressable
              style={styles.button}
              onPress={() => {
                setQuery("");
                setDisableAutoComplete(true);
              }}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    paddingTop: 25,
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "left",
  },
  autocompleteContainer: {
    marginLeft: 10,
    marginRight: 10,
  },
  itemText: {
    fontSize: 15,
    margin: 2,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "white",
    color: "black",
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
});

export default Verification;
