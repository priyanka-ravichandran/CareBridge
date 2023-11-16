import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
} from "react-native";
import * as AuthSession from "expo-auth-session";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialIcons } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import axios from "axios";

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("1975-05-21");
  const [userType, setUserType] = useState("Senior Citizen");
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [phone_numberError, setPhone_numberError] = useState(null);
  const [firstNameError, setFirstNameError] = useState(null);
  const [lastNameError, setLastNameError] = useState(null);
  const [birthDateError, setBirthDateError] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [Address, setAddress] = useState("");
  const [gender, setgender] = useState(null);
  const [genders, setgenders] = useState([
    { label: "Male", value: 1 },
    { label: "Female", value: 2 },
  ]);
  const [openGender, setOpenGender] = useState(false);
  const [openUserType, setOpenUserType] = useState(false);

  const [usertypes, setUserTypes] = useState([
    { label: "Family/Friends", value: 'family' },
    { label: "Seniorcitizen", value: 'senior' },
    { label: "Volunteer", value: 'volunteer' },
  ]);
  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId:
        "1071408551074-7h7t6vcthqqlr13s3m6fibff3lvp6d0u.apps.googleusercontent.com",
      redirectUri: AuthSession.makeRedirectUri(),
      scopes: ["profile", "email"],
      responseType: "token",
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
    } else if (password.length < 4) {
      setPasswordError("Password must be at least 4 characters long.");
      return false;
    } else {
      setPasswordError(null);
      return true;
    }
  };
  const validatePhone_Number = () => {
    for (let i = 0; i < phone_number.length; i++) {
      if (phone_number[i] < "0" || phone_number[i] > "9") {
        return false;
      }
    }

    if (phone_number.length !== 10) {
      return false;
    }

    return true;
  };

  const validateFirstName = () => {
    if (!firstName.trim()) {
      setFirstNameError("First name is required.");
      return false;
    } else {
      setFirstNameError(null);
      return true;
    }
  };

  const validateLastName = () => {
    if (!lastName.trim()) {
      setLastNameError("Last name is required.");
      return false;
    } else {
      setLastNameError(null);
      return true;
    }
  };

  const validateBirthDate = () => {
    const birthDateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!birthDate) {
      setBirthDateError("Invalid Birth Date");
      return false;
    } else {
      return true;
    }
  };
  const onChangeBirthDate = (event, selectedDate) => {
    const currentDate = selectedDate || birthDate;
    setShowDatePicker(false);
    setBirthDate(currentDate.toISOString().split("T")[0]);
    // setErrors((prevErrors) => {
    //   let newErrors = { ...prevErrors };
    //   delete newErrors.birthDate;
    //   return newErrors;
    // });
  };
  const handleSignup = () => {
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isPhone_numberValid = validatePhone_Number();
    const isFirstNameValid = validateFirstName();
    const isLastNameValid = validateLastName();
    const isBirthDateValid = validateBirthDate();
    if (
      isEmailValid &&
      isPasswordValid &&
      isPhone_numberValid &&
      isFirstNameValid &&
      isLastNameValid &&
      isBirthDateValid
    ) {
      const userData = {
        email,
        hashedPassword: password,
        phone_number: phone_number,
        first_name: firstName,
        last_name: lastName,
        birthdate: birthDate,
        gender: gender,
        address: Address,
        type: userType,
        //pairCode: '999999'
      };
      axios
        .post("http://csci5308vm20.research.cs.dal.ca:8080/users", userData, {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
          },
        })
        .then((response) => {
          navigation.navigate("LandingScreen");
        });
        
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Signup</Text>

      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      {firstNameError && <Text style={styles.errorText}>{firstNameError}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
      {lastNameError && <Text style={styles.errorText}>{lastNameError}</Text>}
      
          <DropDownPicker
            open={openGender}
            setOpen={setOpenGender}
            value={gender}
            items={genders}
            setValue={setgender}
            setItems={setgenders}
          />
      
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phone_number}
        onChangeText={setPhone_number}
        onBlur={() => {
          if (!validatePhone_Number(phone_number)) {
            setPhone_numberError("Invalid phone number format.");
          } else {
            setPhone_numberError(null);
          }
        }}
      />
      {phone_numberError && (
        <Text style={styles.errorText}>{phone_numberError}</Text>
      )}
      <Pressable
        onPress={() => setShowDatePicker(true)}
        style={styles.dateInputContainer}
      >
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="YYYY-MM-DD"
          value={birthDate}
          editable={false}
        />
        <Text>
          {" "}
          <MaterialIcons name={"calendar-today"} size={20} color={"black"} />
        </Text>
      </Pressable>
      {birthDateError && <Text style={styles.errorText}>{birthDateError}</Text>}

      {showDatePicker && (
        <DateTimePicker
          value={birthDate ? new Date(birthDate) : new Date()}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChangeBirthDate}
        />
      )}
      <DropDownPicker
        open={openUserType}
        setOpen={setOpenUserType}
        value={userType}
        items={usertypes}
        style={styles.input}
        setValue={setUserType}
        setItems={setUserTypes}
        dropDownContainerStyle={styles.dropDownContainerStyle}
        dropDownDirection="AUTO"
      />


          <TextInput
            style={styles.input}
            placeholder="Address"
            value={Address}
            onChangeText={(value) => {
              setAddress(value);
            }}
          />

      
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        onBlur={validateEmail}
      />
      {emailError && <Text style={styles.errorText}>{emailError}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        onBlur={validatePassword}
        secureTextEntry
      />
      {passwordError && <Text style={styles.errorText}>{passwordError}</Text>}

      <Pressable style={styles.signupButton} onPress={handleSignup}>
        <Text style={styles.signupText}>Signup</Text>
      </Pressable>

      <Pressable
        style={styles.googleButton}
        onPress={() => promptAsync()}
      >
        <Text style={styles.googleButtonText}>Signup with Google</Text>
      </Pressable>

      <View style={styles.row}>
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
    padding: 20,
    width: "100%",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    backgroundColor: "#E6E6E6",
    marginVertical: 10,
    paddingHorizontal: 10,
    zIndex: -1,
  },
  picker: {
    height: 40,
    marginVertical: 10,
    backgroundColor: "#E6E6E6",
  },
  signupButton: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: "80%",
  },
  signupText: {
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
    zIndex: -1,
  },
  landingPage: {
    color: "black",
    textDecorationLine: "underline",
  },
  errorText: {
    color: "red",
    textAlign: "left",
    width: "80%",
    marginTop: 5,
  },
  dateInputContainer: {
    width: "100%",
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E6E6E6",
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  dropDownContainerStyle: {
    backgroundColor: "#E6E6E6",
    zIndex: 1,
  },
});

export default SignupScreen;
