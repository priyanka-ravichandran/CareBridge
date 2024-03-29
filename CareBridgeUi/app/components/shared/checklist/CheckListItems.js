import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Pressable,
  StyleSheet,
  Button,
} from "react-native";
import axios from "axios";
import Checkbox from "expo-checkbox";
import { MaterialIcons } from "@expo/vector-icons";
import sharedStyle from "../styles/sharedStyle";
import Toast from "react-native-toast-message";

const CheckListItems = ({ route }) => {
  const [items, setItems] = useState([]);
  const [newItemName, setNewItemName] = useState("");
  const [newItemAmount, setNewItemAmount] = useState(1);
  const { checklist_name, checklist_number } = route.params.item;
  useEffect(() => {
    axios
      .get(
        `http://csci5308vm20.research.cs.dal.ca:8080/checklistItem/q?checklistNumber=${checklist_number}`
      )
      .then((response) => {
        if (response.status === 200 && response.data) {
          setItems(response.data);
        } else {
          Toast.show({
            type: "error",
            text1: "Unable to fetch checklist items",
            text2: "API call failed",
          });
        }
      });
  }, []);

  const updateNewAmount = (value) => {
    const amount = parseInt(value);
    if (!isNaN(amount) && amount > 0) {
      setNewItemAmount(amount);
    }
  };
  const addItem = () => {
    let checklistItemData = {
      checklistNumber: checklist_number,
      itemName: newItemName,
      amount: newItemAmount,
      status: 0,
    };
    axios
      .post(
        "http://csci5308vm20.research.cs.dal.ca:8080/checklistItem",
        checklistItemData,
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
            text1: "Added shopping list Item " + newItemName,
            text2: "API call was successful!",
          });
          const newItem = {
            itemName: newItemName,
            amount: newItemAmount.toString(),
            checked: false,
          };
          setItems([...items, newItem]);
          setNewItemName("");
          setNewItemAmount(1);
        } else {
          Toast.show({
            type: "error",
            text1: "Unable to add shopping list item ",
            text2: "API call failed",
          });
        }
      });
  };
  const toggleCheckbox = async (value, index) => {
    const newItems = [...items];
    newItems[index].status = value ? 1 : 0;
    let response = await updateTable(newItems[index]);
    if (response) {
      setItems(newItems);
    }
  };

  const updateAmount = async (text, index) => {
    const newItems = [...items];
    newItems[index].amount = text;
    let response = await updateTable(newItems[index]);
    if (response) {
      setItems(newItems);
    }
  };

  const incrementAmount = async (index) => {
    const newItems = [...items];
    newItems[index].amount = String(Number(newItems[index].amount) + 1);
    let response = await updateTable(newItems[index]);
    if (response) {
      setItems(newItems);
    }
  };

  const decrementAmount = async (index) => {
    const newItems = [...items];
    const currentAmount = Number(newItems[index].amount);
    if (currentAmount > 0) {
      newItems[index].amount = String(currentAmount - 1);
      let response = await updateTable(newItems[index]);
      if (response) {
        setItems(newItems);
      }
    }
  };

  const deleteItem = (index) => {
    axios
      .delete(
        `http://csci5308vm20.research.cs.dal.ca:8080/checklistItem/q?checklistNumber=${items[index].checklistNumber}&itemName=${items[index].itemName}`
      )
      .then((response) => {
        if (response.status === 200) {
          Toast.show({
            type: "success",
            text1: "Deleted shopping list Item",
            text2: "API call was successful!",
          });
          const newItems = items.filter((_, i) => i !== index);
          setItems(newItems);
        } else {
          Toast.show({
            type: "error",
            text1: "Unable to delete shopping list item ",
            text2: "API call failed",
          });
        }
      });
  };
  const updateTable = async (updateObj) => {
    try {
      const response = await axios.put(
        "http://csci5308vm20.research.cs.dal.ca:8080/checklistItem/q?checklistNumber=" +
          updateObj.checklistNumber +
          "&itemName=" +
          updateObj.itemName,
        {
          checklistNumber: updateObj.checklistNumber,
          itemName: updateObj.itemName,
          status: updateObj.status,
          amount: updateObj.amount,
        }
      );
      if (response.status === 200) {
        Toast.show({
          type: "success",
          text1: "Updated shopping list Item " + updateObj.itemName,
          text2: "API call was successful!",
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Unable to update shopping list item " + updateObj.itemName,
          text2: "API call failed",
        });
      }
      return response.data;
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Unable to update shopping list item " + updateObj.itemName,
        text2: "API call failed",
      });
      throw error;
    }
  };
  const renderItem = ({ item, index }) => (
    <View>
      <View style={sharedStyle.flatListItem}>
        <View style={sharedStyle.flatListItemLeft}>
          <Checkbox
            value={item.status == 1 ? true : false}
            color={item.checked ? "black" : undefined}
            onValueChange={(value) => toggleCheckbox(value, index)}
            style={styles.checkbox}
          />
          <Text
            style={[
              styles.itemText,
              item.status == 1 ? styles.strikeText : null,
            ]}
          >
            {item.itemName}
          </Text>
        </View>
        <View style={sharedStyle.flatListItemRight}>
          <Pressable
            onPress={() => decrementAmount(index)}
            style={styles.counterButton}
          >
            <Text style={styles.counterButtonText}>-</Text>
          </Pressable>
          <TextInput
            style={[
              styles.amountInput,
              item.checked ? styles.strikeText : null,
            ]}
            onChangeText={(text) => updateAmount(text, index)}
            value={String(item.amount)}
            keyboardType="numeric"
          />
          <Pressable
            onPress={() => incrementAmount(index)}
            style={styles.counterButton}
          >
            <Text style={styles.counterButtonText}>+</Text>
          </Pressable>
          <Pressable
            onPress={() => deleteItem(index)}
            style={styles.deleteButton}
          >
            <MaterialIcons name="delete" size={24} color="black" />
          </Pressable>
        </View>
      </View>
    </View>
  );

  return (
    <View style={sharedStyle.container}>
      <View style={styles.addItemContainer}>
        <View style={styles.addItemRow}>
          <View style={styles.itemInput}>
            <Text style={styles.text}>Item Name</Text>
            <TextInput
              style={sharedStyle.input}
              value={newItemName}
              onChangeText={setNewItemName}
              placeholder="New Item"
            />
          </View>
          <View style={styles.amountControl}>
            <Pressable
              onPress={() =>
                updateNewAmount(String(Math.max(1, newItemAmount - 1)))
              }
              style={styles.counterButton}
            >
              <Text style={styles.counterButtonText}>-</Text>
            </Pressable>
            <TextInput
              style={styles.amountInput}
              value={String(newItemAmount)}
              onChangeText={updateNewAmount}
              keyboardType="numeric"
            />
            <Pressable
              onPress={() => updateNewAmount(String(newItemAmount + 1))}
              style={styles.counterButton}
            >
              <Text style={styles.counterButtonText}>+</Text>
            </Pressable>
          </View>
        </View>
        <Pressable style={sharedStyle.pressableStyle} onPress={addItem}>
          <Text style={sharedStyle.pressableText}>Create Item</Text>
        </Pressable>
      </View>
      <FlatList
        data={items}
        style={sharedStyle.flatListStyle}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  addItemRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  itemNameInput: {
    flex: 1,
    marginRight: 10,
  },
  addItemContainer: {
    marginBottom: 20,
    width: "100%",
  },
  text: {
    color: "black",
    fontWeight: "bold",
  },
  itemInput: {
    width: "65%",
    flexDirection: "column",
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    marginTop: 10,
    color: "black",
    marginBottom: 20,
  },
  amountControl: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  itemText: {
    flex: 1,
    marginLeft: 8,
  },
  amountInput: {
    padding: 8,
    backgroundColor: "white",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "grey",
    width: 50, // Adjust as needed
    textAlign: "center",
  },
  checkbox: {
    marginRight: 8,
  },
  strikeText: {
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
  },
  deleteButton: {
    marginLeft: 8,
  },
  counterButton: {
    backgroundColor: "#e0e0e0",
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 5,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  counterButtonText: {
    fontSize: 18,
    color: "black",
  },
});

export default CheckListItems;
