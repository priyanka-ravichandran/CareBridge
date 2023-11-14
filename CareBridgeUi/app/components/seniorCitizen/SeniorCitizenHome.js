import React, { useContext } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  Image,
} from "react-native";
import UserDetailsContext from "../shared/context/userDetailsContext";

const { width } = Dimensions.get("window");
const boxSize = width / 2;

const SeniorCitizenHome = ({ navigation }) => {
  const userDetails = useContext(UserDetailsContext);
  const navigateToPage = (page) => {
    navigation.navigate(page);
  };

  return (
    <View style={styles.container}>
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>
          Welcome back, {userDetails.first_name}
        </Text>
      </View>
      <View style={styles.boxRow}>
        <TouchableOpacity
          style={[styles.imageBox, styles.leftBox]}
          //onPress={() => navigateToPage("SOS")}
        >
          <Image
            source={require("../../assets/sos.png")}
            style={{ width: boxSize - 35, height: boxSize - 35 }}
          />
          <Text style={styles.boxText}>SOS</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.imageBox, , styles.rightBox]}
          onPress={() => navigateToPage("ShoppingList")}
        >
          <Image
            source={require("../../assets/shopping.jpg")}
            style={{ width: boxSize - 35, height: boxSize - 35 }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.boxRow}>
        <TouchableOpacity
          style={[styles.imageBox, styles.leftBox]}
          onPress={() => navigateToPage("Reminders")}
        >
          <Image
            source={require("../../assets/alarm.png")}
            style={{ width: boxSize - 35, height: boxSize - 35 }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.imageBox, styles.rightBox]}
          onPress={() => navigateToPage("Medicine")}
        >
          <Image
            source={require("../../assets/pills.jpg")}
            style={{ width: boxSize - 35, height: boxSize - 35 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  welcomeContainer: {
    width: "100%",
    alignItems: "flex-start",
    marginTop: 10,
    paddingHorizontal: 20,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  boxRow: {
    flexDirection: "row",
    marginBottom: 10,
    justifyContent: "space-around",
    width: "100%",
  },
  box: {
    width: boxSize - 15,
    height: boxSize - 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    marginHorizontal: 5,
  },
  imageBox: {
    padding: 10,
  },
  leftBox: {
    marginRight: 5,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8, // Only has effect on Android
    borderRadius: 10,
  },
  rightBox: {
    marginLeft: 5,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    borderRadius: 10,
  },
  boxText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});

export default SeniorCitizenHome;
