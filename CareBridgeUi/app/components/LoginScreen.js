import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import * as AuthSession from 'expo-auth-session';


const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  console.log("Generated Redirect URI:", AuthSession.makeRedirectUri());
  
  const [request, response, promptAsync] = AuthSession.useAuthRequest({
    clientId: '1071408551074-7h7t6vcthqqlr13s3m6fibff3lvp6d0u.apps.googleusercontent.com',
    redirectUri: AuthSession.makeRedirectUri(),
    scopes: ['profile', 'email'],
    responseType: 'token',
    usePKCE: false,
  }, {
    authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenEndpoint: 'https://oauth2.googleapis.com/token',
    revocationEndpoint: 'https://oauth2.googleapis.com/revoke',
  });

  useEffect(() => {
    if (response?.type === 'success') {
      console.log(response.params.access_token);
    }
  }, [response]);

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError("Email is required.");
      return false;
    } else if (!emailRegex.test(email)) {
      setEmailError("Invalid email address.");
      return false;
    } else {
      setEmailError(null);
      return true;
    }
  };

  const validatePassword = () => {
    if (!password) {
      setPasswordError("Password is required.");
      return false;
    } else {
      setPasswordError(null);
      return true;
    }
  };

  const handleLogin = () => {
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    if (isEmailValid && isPasswordValid) {
      let userType = 'seniorCitizen';
      navigation.replace('UserTabs', { userType });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        onBlur={validateEmail}
      />
      {emailError && <Text style={styles.errorText}>{emailError}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        onBlur={validatePassword}
        secureTextEntry
      />
      {passwordError && <Text style={styles.errorText}>{passwordError}</Text>}

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.googleButton} onPress={() => promptAsync()}>
        <Text style={styles.googleButtonText}>Login with Google</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
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
    width: '80%',
  },
  loginText: {
    color: 'white',
    textAlign: 'center',
  },
  googleButton: {
    backgroundColor: '#db4437',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: '80%',
  },
  googleButtonText: {
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
  errorText: {
    color: 'red',
    textAlign: 'left',
    width: '80%',
    marginTop: 5,
  },
});

export default LoginScreen;