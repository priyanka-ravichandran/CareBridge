import axios from "axios";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput, Pressable, ScrollView } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialIcons } from "@expo/vector-icons";
import { unregisterIndieDevice } from "native-notify";

const VolunteerProfile = ({ navigation }) => {
  const [FirstName, setFirstname] = useState("");
  const [LastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [Address, setAddress] = useState("");
  const [volunteerExperience, setVolunteerExperience] = useState("");

  const [gender, setGender] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [genders, setGenders] = useState([
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ]);
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [userId, setUserId] = useState(1001);

  useEffect(() => {
    // Fetch user data...
  }, []);

  // Validation functions...

  const handleSave = () => {
    //TODO
    // Handle the saving of the profile...
  };

  const handleLogout = () => {
    unregisterIndieDevice(email, 14881, "JNsN0VrdyjC41kJb7doGS2");
    navigation.navigate("LandingScreen");
  };

  return (
    <ScrollView style={styles.container}>
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
          setValue={setGender}
          setItems={setGenders}
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
            <MaterialIcons name={"calendar-today"} size={20} color={"black"} />
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
        {/*  
        TODO
        <Text style={styles.label}>Volunteer Experience</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your volunteer experience"
          value={volunteerExperience}
          onChangeText={setVolunteerExperience}
        />

        <View style={styles.buttonGroup}>
          <Pressable
            style={styles.button}
            onPress={() => 
          >
            <Text style={styles.buttonText}>+ Add Certifications</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => 
          >
            <Text style={styles.buttonText}>+ Add Government ID</Text>
          </Pressable>
        </View>
        */}
        <Pressable style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.createText}>Logout</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 50,
  },
  innerContainer: {
    paddingHorizontal: 30,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    marginTop: 10,
  },
  input: {
    height: 40,
    backgroundColor: "#E6E6E6",
    marginVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "black",
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  createText: {
    color: "white",
    textAlign: "center",
  },
  button: {
    backgroundColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  logoutButton: {
    backgroundColor: "black",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
});

export default VolunteerProfile;
