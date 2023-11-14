import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  Image,
} from "react-native";


const { width } = Dimensions.get("window");
const boxSize = width / 2;

const FamilyHomeScreen = ({ navigation }) => {
  const navigateToPage = (page) => {
    navigation.navigate(page);
  };


  return (
    <View style={styles.container}>
      {/* <View style={styles.boxRow}>
        <TouchableOpacity
          style={[styles.imageBox, styles.leftBox]}
          //onPress={() => navigateToPage("SOS")}
        >
          <Image
            source={require("../../assets/seniorprofile.png")}
            style={{ width: boxSize - 35, height: boxSize - 35 }}
            onPress={() => navigateToPage("SeniorProfileListNavigator")}
          />
          <Text style={styles.boxText}>SOS</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.imageBox, , styles.rightBox]}
          onPress={() => navigateToPage("Medicine")}
        >
          <Image
            source={require("../../assets/pills.jpg")}
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
            source={require("../../assets/reminder.png")}
            style={{ width: boxSize - 35, height: boxSize - 35 }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.imageBox, styles.rightBox]}
          onPress={() => navigateToPage("ShoppingList")}
        >
          <Image
            source={require("../../assets/shopping.png")}
            style={{ width: boxSize - 35, height: boxSize -35 }}
          />
        </TouchableOpacity>
      </View> */}
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
  },
  rightBox: {
    marginLeft: 5,
  },
  boxText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});

export default FamilyHomeScreen;
