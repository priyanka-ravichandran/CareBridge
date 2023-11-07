import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  Pressable,
} from "react-native";
import axios from "axios";
import { MaterialIcons } from "@expo/vector-icons";
import UserDetailsContext from "../context/userDetailsContext";

const CheckLists = ({ route, navigation }) => {
  const [checklists, setChecklists] = useState([]);
  const [newChecklist, setNewChecklist] = useState("");
  const userDetails =useContext(UserDetailsContext);
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
    axios
      .get(
        "http://csci5308vm20.research.cs.dal.ca:8080/checklist/" +
          userDetails.userID
      )
      .then((response) => {
        const fetchedList = response.data;
        if (response && response.data) {
          setChecklists(fetchedList);
        }
      });
  }, []);

  const deleteChecklist = (checklistNum) => {
    setChecklists(
      checklists.filter(
        (checklist) => checklist.checklist_number !== checklistNum
      )
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={newChecklist}
        onChangeText={setNewChecklist}
        placeholder="New Checklist"
        />
      <Button title="Create" onPress={createChecklist} color="black" />
        
      <FlatList
        data={checklists}
        keyExtractor={(item) => item.checklist_number}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Pressable
              onPress={() => navigation.navigate("CheckListItems", { item })}
            >
              <Text style={styles.text}>{item.checklist_name}</Text>
            </Pressable>
            <Pressable onPress={() => deleteChecklist(item.checklist_number)}>
              <Text style={styles.text}>
                <MaterialIcons name="delete" size={24} color="black" />
              </Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
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
  button: {
    backgroundColor: "black",
    color: "white",
    marginTop: 10,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "black",
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "black",
  },
};

export default CheckLists;
