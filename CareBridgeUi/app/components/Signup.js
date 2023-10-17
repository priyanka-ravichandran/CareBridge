import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';

const SignupScreen = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setuserType] = useState(null);
  const [userTypes, setuserTypes] = useState([
    {label: 'Family/Friends', value: 'family/friends'},
    {label: 'Senior Citizens', value: 'seniorCitizen'},
    {label: 'Volunteer', value: 'volunteer'}
  ]);  
  const [open, setOpen] = useState(false);
  const handleSignUp = () => {
    // TODO: Implement login logic
  };
  return (
    <View style={styles.container}>
    <Text style={styles.header}>Sign Up</Text>
        <View style={styles.innerContainer}>
            <TextInput
            style={styles.input}
            placeholder="username"
            value={userName}
            onChangeText={setUserName}
            />
            <TextInput
            style={styles.input}
            placeholder="email"
            value={email}
            onChangeText={setEmail}
            />
            <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            />
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
        </View>
    <Pressable  style={styles.signupButton} onPress={handleSignUp}>
      <Text style={styles.signUpText}>Sign Up</Text>
    </Pressable >
    <View style={styles.row}>
      <Pressable  onPress={() => navigation.navigate('Login')}>
        <Text style={styles.login}>Log In</Text>
      </Pressable >
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
  signupButton: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: '80%',
    zIndex: -1
  },
  signUpText: {
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
    width: 200,
    height: 50,
  },
  dropDownContainerStyle: {
    backgroundColor: "#E6E6E6",
    zIndex: 1
  }
});

export default SignupScreen;
