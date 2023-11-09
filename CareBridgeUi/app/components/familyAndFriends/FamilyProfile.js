import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView} from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import { Button } from "react-native-elements";

const FamilyProfile = () => {
  const [Username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [Relation, setRelation] = useState("");
  const [phonenumber, setphonenumber] = useState("");
  const [Age, setage] = useState("");
  const [Address, setaddress] = useState("");

  const [userType, setuserType] = useState(null);
  const [userTypes, setuserTypes] = useState([
    {label: 'Male', value: 'male'},
    {label: 'Female', value: 'female'}
  ]);  
  const [open, setOpen] = useState(false);
  const handleSave = () => {

  };
  return (
    <View style={styles.container}>
    <Text style={styles.header}>Family/Friends Profile</Text>
        <View style={styles.innerContainer}>
        <Text>Username</Text> 
            <TextInput
            style={styles.input}
            placeholder="Username"
            value={Username}
            onChangeText={setUsername}
            />
            <Text>Email Id</Text>
            <TextInput
            style={styles.input}
            placeholder="email"
            value={email}
            onChangeText={setEmail}
            />
            <Text>Relation</Text>
            <TextInput
            style={styles.input}
            placeholder="Relation"
            value={Relation}
            onChangeText={setRelation}
            />
            <Text>Phone Number</Text>
            <TextInput
            style={styles.input}
            placeholder="Enter Phone Number"
            value={phonenumber}
            onChangeText={setphonenumber}
            />
           
            <Text>Gender</Text>
            <DropDownPicker
            open={open}
            setOpen={setOpen}
            value={userType}
            items={userTypes}
            setValue={setuserType}
            setItems={setuserTypes}
            style={styles.input}
            dropDownContainerStyle={styles.dropDownContainerStyle}
            dropDownDirection="AUTO"
            />
            <Text>Age</Text> 
            <TextInput
            style={styles.input}
            placeholder="Age"
            value={Age}
            onChangeText={setage}
            />
            <Text>Address</Text>
            <TextInput
              style={styles.addressinput}
              placeholder="Address"
              value={Address}
              onChangeText={setaddress}
            />
        </View>
        <View style={styles.buttonContainer}>
        <Button  
        title="LOGOUT"
        buttonStyle={styles.logout}
        onPress={handleSave}
        /></View>

   
  </View>
  );
};
const styles =  StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  innerContainer: {
    width:'80%'
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    backgroundColor: "#E6E6E6",
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  addressinput: {
    height: 90,
    backgroundColor: "#E6E6E6",
    marginVertical: 10,
    paddingHorizontal: 10,
  },


  buttonContainer: {
    width: '40%',
    marginBottom: 10,
  },
  logout: {
    backgroundColor: 'black', 
    padding: 10,
    borderRadius: 5,
    marginBottom: 10, 
    width: '80%', 
    alignItems: 'center', 
  },
  forgotPassword: {
    color: 'black',
    textDecorationLine: 'underline',
  },
  picker: {
    width: 10,
    height: 50,
  },
  dropDownContainerStyle: {
    backgroundColor: "#E6E6E6",
    zIndex: 1
  }
});

export default FamilyProfile;
