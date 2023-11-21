import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  Pressable,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import axios from "axios";
import { MaterialIcons } from "@expo/vector-icons";
import UserDetailsContext from "../context/userDetailsContext";
import DropDownPicker from "react-native-dropdown-picker";

const ITEM_HEIGHT = 40;
const MAX_ITEMS_VISIBLE = 4;
const dropdownMaxHeight = ITEM_HEIGHT * MAX_ITEMS_VISIBLE;

const CheckLists = ({ route, navigation }) => {
  const [checklists, setChecklists] = useState([]);
  const [newChecklist, setNewChecklist] = useState("");
  const { userDetails } = useContext(UserDetailsContext);
  const [open, setOpen] = useState(false);
  const initialSeniorCitizenId =
    userDetails.pairings[0]?.seniorCitizenId || null;
  const [value, setValue] = useState(initialSeniorCitizenId);
  const [items, setItems] = useState([]);
 

  const setDropDownValue = () => {
    return userDetails.pairings.map((pairing) => ({
      label: pairing.email,
      value: pairing.seniorCitizenId,
    }));
  };
  const createChecklist = () => {
    if (newChecklist) {
      let checklistData = {
        guardian_id: 1002,
        elderly_id: userDetails.userID,
        checklist_number: String(userDetails.userID) + String(Date.now()),
        checklist_name: newChecklist,
      };
      axios
        .post(
          "http://csci5308vm20.research.cs.dal.ca:8080/checklist",
          checklistData,
          {
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
            },
          }
        )
        .then((response) => {
          console.log(response);
          setChecklists([
            ...checklists,
            {
              checklist_name: checklistData.checklist_name,
              checklist_number: checklistData.checklist_number,
              elderly_id: checklistData.elderly_id,
              guardian_id: checklistData.guardian_id,
            },
          ]);
          setNewChecklist("");
        });
    }
  };
  useEffect(() => {
    if (userDetails.type === "senior") {
      getChecklists(userDetails.userID);
    } else {
      setItems(setDropDownValue());
      if (userDetails.pairings.length > 0) {
        getChecklists(initialSeniorCitizenId);
      }
    }
  }, []);

  useEffect(() => {
    getChecklists(value);
  }, [value]);
  // useEffect(() => {
  //   if (isFocused && userDetails.type !== "senior") {
  //     getChecklists(userDetails.pairings[0].seniorCitizenId);
  //   }
  // }, [isFocused]);
  const getChecklists = (userId) => {
    axios
      .get("http://csci5308vm20.research.cs.dal.ca:8080/checklist/" + userId)
      .then((response) => {
        const fetchedList = response.data;
        if (response && response.data) {
          setChecklists(fetchedList);
        }
      });
  };

  const deleteChecklist = (checklistNum) => {
    axios
      .delete(
        "http://csci5308vm20.research.cs.dal.ca:8080/checklist/q?checklistNumber=" +
          checklistNum
      )
      .then((response) => {
        setChecklists(
          checklists.filter(
            (checklist) => checklist.checklist_number !== checklistNum
          )
        );
      });
  };

  return (
    <View style={styles.container}>
      {userDetails.type !== "senior" && userDetails.pairings.length === 0 ? (
        <Text style={styles.noPairingsText}>
          Pair with a senior citizen to view checklists.
        </Text>
      ) : (
        <>
          {userDetails.type !== "senior" && (
            <>
            <Text style={styles.text}>Select Senior Citizen</Text>
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              placeholder="Select Senior Citizen"
              maxHeight={dropdownMaxHeight}
              style={styles.dropdown}
            />
            </>
          )}
           <Text style={styles.text}>ShoppingList Name</Text>
          <TextInput
            style={styles.input}
            value={newChecklist}
            onChangeText={setNewChecklist}
            placeholder="New Shpping List"
          />

          <Pressable style={styles.createButton} onPress={createChecklist}>
            <Text style={styles.createText}>Create</Text>
          </Pressable>

          <FlatList
            data={checklists}
            keyExtractor={(item) => item.checklist_number}
            renderItem={({ item }) => (
              <View style={styles.listItem}>
                <Pressable
                  onPress={() =>
                    navigation.navigate("ShoppingListItems", { item })
                  }
                >
                  <Text style={styles.text}>{item.checklist_name}</Text>
                </Pressable>
                <Pressable
                  onPress={() => deleteChecklist(item.checklist_number)}
                >
                  <Text style={styles.text}>
                    <MaterialIcons name="delete" size={24} color="black" />
                  </Text>
                </Pressable>
              </View>
            )}
          />
        </>
      )}
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
    paddingTop: 20,
    paddingBottom: 200,
  },
  text: {
    color: "black",
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    marginTop: 10,
    color: "black",
    marginBottom: 20,
  },
  createButton: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: "100%",
  },
  createText: {
    color: "white",
    textAlign: "center",
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "black",
  },
  noPairingsText: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 16,
    color: "grey",
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "black",
    marginTop: 10,
    marginBottom: 20,
    zIndex: 1000,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
  },
};

export default CheckLists;
