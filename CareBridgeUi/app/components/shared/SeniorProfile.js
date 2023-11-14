import axios from "axios";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Button, Pressable} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialIcons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";

const SeniorProfile = ({navigation}) => {
  const [FirstName, setFirstname] = useState("");
  const [LastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [Address, setAddress] = useState("");

  const [gender, setgender] = useState(null);
  const [genders, setgenders] = useState([
    { label: "Male", value: 1 },
    { label: "Female", value: 2 },
  ]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [userId, setUserId] = useState(1001);
  useEffect(() => {
    axios
      .get("http://csci5308vm20.research.cs.dal.ca:8080/users/" + userId)
      .then((response) => {
        setFirstname(response.data.first_name);
        setLastname(response.data.last_name);
        setEmail(response.data.email);
        setPhonenumber(response.data.phone_number);
        setBirthDate("1955-05-21");
        setAddress(response.data.address);
        setgender(response.data.gender)
      });
  }, []);
  // Validation Functions
  const onChangeBirthDate = (event, selectedDate) => {
    const currentDate = selectedDate || birthDate;
    setShowDatePicker(false);
    setBirthDate(currentDate.toISOString().split("T")[0]);
    setErrors((prevErrors) => {
      let newErrors = { ...prevErrors };
      delete newErrors.birthDate;
      return newErrors;
    });
  };
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (number) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(number);
  };

  const validateName = (name) => {
    return name && name.trim().length > 0;
  };

  const validateBirthDate = () => {
    const birthDateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!birthDate) {
      return false;
    } else if (!birthDateRegex.test(birthDate)) {
      return false;
    } else {
      return true;
    }
  };

  const handleSave = () => {
    let errorMessages = {};

    if (!validateName(FirstName))
      errorMessages.FirstName = "First Name is required";
    if (!validateName(LastName))
      errorMessages.LastName = "Last Name is required";
    if (!validateEmail(email)) errorMessages.email = "Invalid email";
    if (!validatePhoneNumber(phonenumber))
      errorMessages.phonenumber = "Invalid phone number";
    if (!gender) errorMessages.gender = "Please select a gender";
    if (!validateBirthDate()) errorMessages.birthDate = "Invalid Birth Date";

    setErrors(errorMessages);
   
    if (Object.keys(errorMessages).length === 0) {
      const userData = {
        userId: userId,
        email,
        phone_number: phonenumber,
        first_name: FirstName,
        last_name: LastName,
        birthdate: birthDate,
        gender: gender,
        address: Address,
      };
      axios
        .put(
          "http://csci5308vm20.research.cs.dal.ca:8080/users/" + userId,
          userData,
          {
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
            },
          }
        )
        .then((response) => {
          console.log(response);
        });
    }
  };
  const handleLogout = () =>{
    navigation.navigate("LandingScreen");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile</Text>
      <View style={styles.innerContainer}>
        <Text>First Name</Text>
        <TextInput
          style={styles.input}
          placeholder="FirstName"
          value={FirstName}
          onChangeText={(value) => {
            setFirstname(value);
            setErrors((prevErrors) => {
              let newErrors = { ...prevErrors };
              delete newErrors.FirstName;
              return newErrors;
            });
          }}
        />
        <Text style={{ color: "red" }}>{errors.FirstName}</Text>

        <Text>Last Name</Text>
        <TextInput
          style={styles.input}
          placeholder="LastName"
          value={LastName}
          onChangeText={(value) => {
            setLastname(value);
            setErrors((prevErrors) => {
              let newErrors = { ...prevErrors };
              delete newErrors.LastName;
              return newErrors;
            });
          }}
        />
        <Text style={{ color: "red" }}>{errors.LastName}</Text>

        <Text>Email Id</Text>
        <TextInput
          style={styles.input}
          placeholder="email"
          value={email}
          onChangeText={(value) => {
            setEmail(value);
            setErrors((prevErrors) => {
              let newErrors = { ...prevErrors };
              delete newErrors.email;
              return newErrors;
            });
          }}
        />
        <Text style={{ color: "red" }}>{errors.email}</Text>
        <Text>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={phonenumber}
          onChangeText={(value) => {
            setPhonenumber(value);
            setErrors((prevErrors) => {
              let newErrors = { ...prevErrors };
              delete newErrors.phonenumber;
              return newErrors;
            });
          }}
        />
        <Text style={{ color: "red" }}>{errors.phonenumber}</Text>
        <Text>Gender</Text>
        <DropDownPicker
          open={open}
          setOpen={setOpen}
          value={gender}
          items={genders}
          setValue={setgender}
          setItems={setgenders}
          style={{ borderColor: errors.gender ? "red" : "#000" }}
        />
        <Text style={{ color: "red" }}>{errors.gender}</Text>
        <Text>Birthdate</Text>
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
            <MaterialIcons
              name={"calendar-today"}
              size={"20"}
              color={"black"}
            />
          </Text>
        </Pressable>
        <Text style={{ color: "red" }}>{errors.birthDate}</Text>

        {showDatePicker && (
          <DateTimePicker
            value={birthDate ? new Date(birthDate) : new Date()}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onChangeBirthDate}
          />
        )}
        <Text style={{ color: "red" }}>{errors.birthDate}</Text>

        <Text>Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Address"
          value={Address}
          onChangeText={(value) => {
            setAddress(value);
          }}
        />
      </View>
      
    
    <Pressable style={styles.buttonContainer} onPress={handleLogout}>
        <Text style={styles.createText}>Save</Text>
      </Pressable>
      <Pressable style={styles.buttonContainer} onPress={handleLogout}>
        <Text style={styles.createText}>Logout</Text>
      </Pressable>
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
  innerContainer: {
    width: "80%",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
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
    backgroundColor: "black",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: "50%",
  },
  logout: {
    backgroundColor: 'black', 
    padding: 10,
    borderRadius: 5,
    marginBottom: 10, 
    width: '80%', 
    alignItems: 'center', 
  },
  createText: {
    color: "white",
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    marginTop: 10,
    zIndex: -1,
  },
  forgotPassword: {
    color: "black",
    textDecorationLine: "underline",
  },
  login: {
    color: "black",
  },
  picker: {
    width: 10,
    height: 50,
  },
  dropDownContainerStyle: {
    backgroundColor: "#E6E6E6",
    zIndex: 1,
  },
  dateInputContainer: {
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E6E6E6",
    marginVertical: 10,
    paddingHorizontal: 10,
  },
});

export default SeniorProfile;
