import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity  } from "react-native";
const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedValue, setSelectedValue] = useState("option1");
  const handleLogin = () => {
    let userType = 'seniorCitizen';
    // TODO: Implement login logic
    navigation.replace('UserTabs', { userType });
  };
  return (
    <View style={styles.container}>
    <Text style={styles.header}>Login</Text>
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
    <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
      <Text style={styles.loginText}>Login</Text>
    </TouchableOpacity>
    <View style={styles.row}>
      <TouchableOpacity onPress={() => console.log('Forgot Password')}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>
      <Text style={styles.separator}>|</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.signup}>Signup</Text>
      </TouchableOpacity>
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    backgroundColor: "#E6E6E6",
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  loginButton: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: '80%'
  },
  loginText: {
    color: 'white',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    marginTop: 10,
  },
  forgotPassword: {
    color: 'black',
    textDecorationLine: 'underline',
  },
  separator: {
    marginHorizontal: 5,
  },
  signup: {
    color: 'black',
  },
  picker: {
    width: 200,
    height: 50,
  },
});

export default LoginScreen;