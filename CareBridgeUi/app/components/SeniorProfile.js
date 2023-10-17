import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Pressable, ScrollView} from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';

const SeniorprofileScreen = () => {
  const [FirstName, setFirstname] = useState("");
  const [LastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [Numbera, setnumberb] = useState("");
  const [Numberb, setnumbera] = useState("");
  const [Age, setage] = useState("");
  const [Address, setaddress] = useState("");

  const [userType, setuserType] = useState(null);
  const [userTypes, setuserTypes] = useState([
    {label: 'Male', value: 'male'},
    {label: 'Female', value: 'female'}
  ]);  
  const [open, setOpen] = useState(false);
  const handleSave = () => {
    // TODO: Implement login logic
  };
  return (
    <View style={styles.container}>
    <Text style={styles.header}>Add New</Text>
        <View style={styles.innerContainer}>
        <Text>First Name</Text> 
            <TextInput
            style={styles.input}
            placeholder="FirstName"
            value={FirstName}
            onChangeText={setFirstname}
            />
            <Text>Last Name</Text>
            <TextInput
            style={styles.input}
            placeholder="LastName"
            value={LastName}
            onChangeText={setLastname}
            />
            <Text>Email Id</Text>
           
            <TextInput
            style={styles.input}
            placeholder="email"
            value={email}
            onChangeText={setEmail}
            />
            <Text>Phone Number</Text>
              
            <TextInput
            style={styles.input}
            placeholder="Numbera"
            value={Numbera}
            onChangeText={setnumbera}
            />
            <Text>Alternate Number</Text>

            <TextInput
            style={styles.input}
            placeholder="Numberb"
            value={Numberb}
            onChangeText={setnumberb}
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
    <Pressable  style={styles.save} onPress={handleSave}>
      <Text style={styles.saveText}>SAVE</Text>
    </Pressable >
    <View style={styles.row}>
      
    </View>
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
  save: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: '80%',
    zIndex: -1
  },
  saveText: {
    color: 'white',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    marginTop: 10,
    zIndex: -1
  },
  forgotPassword: {
    color: 'black',
    textDecorationLine: 'underline',
  },
  login: {
    color: 'black',
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

export default SeniorprofileScreen;
