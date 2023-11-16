import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import * as AuthSession from "expo-auth-session";
import axios from "axios";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [dbError, setDbError] = useState(null);
  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId:
        "1071408551074-7h7t6vcthqqlr13s3m6fibff3lvp6d0u.apps.googleusercontent.com",
      redirectUri: AuthSession.makeRedirectUri({ path: "/login" }),
      scopes: ["profile", "email"],
      responseType: "token",
      accessType: "offline",
      usePKCE: false,
    },
    {
      authorizationEndpoint: "https://accounts.google.com/o/oauth2/v2/auth",
      tokenEndpoint: "https://oauth2.googleapis.com/token",
      revocationEndpoint: "https://oauth2.googleapis.com/revoke",
    }
  );

  useEffect(() => {
    if (response?.type === "success") {
      const { access_token } = response.params;

      console.log("Google Access Token:", access_token);
      console.log("Google Refresh Token:", refresh_token);
      navigation.replace("UserTabs", { userType });
    } else if (response?.type === "error") {
      console.error("Google Sign-In Error:", response.error);
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
    setDbError(null);
    if (isEmailValid && isPasswordValid) {
      axios
        .get("http://csci5308vm20.research.cs.dal.ca:8080/users")
        .then((response) => {
          const user = response.data.find((user) => user.email === email);
          if (user && user.hashedPassword === password) {
            const userId = user.userID;
            console.log("Password matches for the given email ID.");
            navigation.replace("UserTabs", {userId});
          } else {
            setDbError("Password does not match or user not found.");
          }
        });
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

      <Pressable style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>Login</Text>
      </Pressable>

      {dbError && <Text style={styles.errorText}>{dbError}</Text>}

      <Pressable style={styles.googleButton} onPress={() => promptAsync()}>
        <Text style={styles.googleButtonText}>Login with Google</Text>
      </Pressable>

      <View style={styles.row}>
        <Pressable onPress={() => console.log("Forgot Password")}>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </Pressable>
        <Text style={styles.separator}>|</Text>
        <Pressable onPress={() => navigation.navigate("LandingScreen")}>
          <Text style={styles.landingPage}>Go Back</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: 40,
    backgroundColor: "#E6E6E6",
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  loginButton: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: "80%",
  },
  loginText: {
    color: "white",
    textAlign: "center",
  },
  googleButton: {
    backgroundColor: "#db4437",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: "80%",
  },
  googleButtonText: {
    color: "white",
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    marginTop: 10,
  },
  forgotPassword: {
    color: "black",
    textDecorationLine: "underline",
  },
  separator: {
    marginHorizontal: 5,
  },
  landingPage: {
    color: "black",
  },
  errorText: {
    color: "red",
    textAlign: "left",
    width: "80%",
    marginTop: 5,
  },
});

export default LoginScreen;
