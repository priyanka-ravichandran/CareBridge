import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  Pressable,
} from "react-native";
import Toast from "react-native-toast-message";
import axios from "axios";
import { MaterialIcons } from "@expo/vector-icons";
import UserDetailsContext from "../context/userDetailsContext";
import DropDownPicker from "react-native-dropdown-picker";
import sharedStyle from "../styles/sharedStyle";

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
          if (response.status === 200) {
            Toast.show({
              type: "success",
              text1: "Added checklist " + checklistData.checklist_name,
              text2: "API call was successful!",
            });
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
          } else {
            Toast.show({
              type: "error",
              text1:
                "Unable to add new checklist" + checklistData.checklist_name,
              text2: "API call failed",
            });
          }
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

  const getChecklists = (userId) => {
    axios
      .get("http://csci5308vm20.research.cs.dal.ca:8080/checklist/" + userId)
      .then((response) => {
        const fetchedList = response.data;
        if (response.status === 200) {
          setChecklists(fetchedList);
        } else {
          Toast.show({
            type: "error",
            text1: "Unable to fetch checklist info.",
            text2: "API call failed",
          });
        }
      });
  };

  const deleteChecklist = (checklistData) => {
    axios
      .delete(
        "http://csci5308vm20.research.cs.dal.ca:8080/checklist/q?checklistNumber=" +
          checklistData.checklist_number
      )
      .then((response) => {
        if (response.status === 200) {
          Toast.show({
            type: "success",
            text1: "Deleted checklist " + checklistData.checklist_name,
            text2: "API call was successful!",
          });
          setChecklists(
            checklists.filter(
              (checklist) =>
                checklist.checklist_number !== checklistData.checklist_number
            )
          );
        } else {
          Toast.show({
            type: "error",
            text1: "Unable to fetch checklist info.",
            text2: "API call failed",
          });
        }
      });
  };

  return (
    <View style={sharedStyle.container}>
      {userDetails.type !== "senior" && userDetails.pairings.length === 0 ? (
        <Text style={sharedStyle.emptyTextt}>
          Pair with a senior citizen to view checklists.
        </Text>
      ) : (
        <>
          {userDetails.type !== "senior" && (
            <>
              <Text style={sharedStyle.inputText}>Select Senior Citizen</Text>
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
            </>
          )}
          <Text style={sharedStyle.inputText}>ShoppingList Name</Text>
          <TextInput
            style={sharedStyle.input}
            value={newChecklist}
            onChangeText={setNewChecklist}
            placeholder="New Shopping List"
          />

          <Pressable
            style={sharedStyle.pressableStyle}
            onPress={createChecklist}
          >
            <Text style={sharedStyle.pressableText}>Create</Text>
          </Pressable>

          <FlatList
            data={checklists}
            keyExtractor={(item) => item.checklist_number}
            style={sharedStyle.flatListStyle}
            renderItem={({ item }) => (
              <View style={sharedStyle.flatListItem}>
                <Pressable
                  onPress={() =>
                    navigation.navigate("ShoppingListItems", { item })
                  }
                >
                  <Text style={sharedStyle.inputText}>
                    {item.checklist_name}
                  </Text>
                </Pressable>
                <Pressable onPress={() => deleteChecklist(item)}>
                  <Text>
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

export default CheckLists;
