import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";

const LandingScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={require("../../assets/appLogo.png")} style={styles.logo} />
      <Pressable
        style={styles.pressableStyle}
        title="Login"
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.pressableText}>Login</Text>
      </Pressable>
      <Pressable
        style={styles.pressableStyle}
        title="Signup"
        onPress={() => navigation.navigate("Signup")}
      >
        <Text style={styles.pressableText}>Signup</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
    paddingBottom: '30%'
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginBottom: 0
  },
  pressableStyle: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    width: "80%",
  },
  pressableText: {
    color: "white",
    textAlign: "center",
  },
});
export default LandingScreen;
