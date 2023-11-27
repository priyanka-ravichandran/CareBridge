import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import * as AuthSession from "expo-auth-session";
import axios from "axios";
import sharedStyle from "../shared/styles/sharedStyle";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [dbError, setDbError] = useState(null);
  const [errors, setErrors] = useState({});
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

  const validateFields = (field) => {
    let errorMessages = { ...errors };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (field == "email") {
      if (!email) {
        errorMessages.email = "Email is required.";
      } else if (!emailRegex.test(email)) {
        errorMessages.email = "Invalid email address.";
      }
    }
    if (!password && field === "password") {
      errorMessages.password = "Password is required";
    }
    setErrors(errorMessages);
  };

  const handleLogin = () => {
    if (Object.keys(errors).length === 0) {
      let reqBody = {
        email,
        password,
      };
      axios
        .post("http://csci5308vm20.research.cs.dal.ca:8080/login", reqBody)
        .then((response) => {
          if (response.data !== -1) {
            const userId = response.data;
            console.log("Password matches for the given email ID.");
            navigation.replace("UserTabs", { userId });
          } else {
            setErrors((prevErrors) => {
              let newErrors = {
                ...prevErrors,
                dbError: "Password does not match or user not found.",
              };
              return newErrors;
            });
          }
        });
    }
  };

  return (
    <View style={sharedStyle.container}>
      <Text style={styles.header}>Login</Text>
      <TextInput
        style={sharedStyle.input}
        placeholder="email"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          setErrors((prevErrors) => {
            let newErrors = { ...prevErrors };
            delete newErrors.email;
            delete newErrors.dbError;
            return newErrors;
          });
        }}
        onBlur={() => validateFields("email")}
      />
      {errors.email && (
        <Text style={sharedStyle.errorText}>{errors.email}</Text>
      )}

      <TextInput
        style={sharedStyle.input}
        placeholder="Password"
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          setErrors((prevErrors) => {
            let newErrors = { ...prevErrors };
            delete newErrors.password;
            delete newErrors.dbError;
            return newErrors;
          });
        }}
        onBlur={() => validateFields("password")}
        secureTextEntry
      />
      {errors.password && (
        <Text style={sharedStyle.errorText}>{errors.password}</Text>
      )}

      <Pressable style={sharedStyle.pressableStyle} onPress={handleLogin}>
        <Text style={sharedStyle.pressableText}>Login</Text>
      </Pressable>

      {errors.dbError && (
        <Text style={sharedStyle.errorText}>{errors.dbError}</Text>
      )}
      <Pressable onPress={() => navigation.navigate("LandingScreen")}>
        <Text style={styles.landingPage}>Go Back</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  landingPage: {
    color: "black",
    padding: 10,
  },
});

export default LoginScreen;
