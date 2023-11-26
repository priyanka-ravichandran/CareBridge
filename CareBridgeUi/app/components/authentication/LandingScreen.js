import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import sharedStyle from "../shared/styles/sharedStyle";

const LandingScreen = ({ navigation }) => {
  return (
    <View style={sharedStyle.container}>
      <Image source={require("../../assets/appLogo.jpeg")} style={styles.logo} />
      <Pressable
        style={sharedStyle.pressableStyle}
        title="Login"
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={sharedStyle.pressableText}>Login</Text>
      </Pressable>
      <Pressable
        style={sharedStyle.pressableStyle}
        title="Signup"
        onPress={() => navigation.navigate("Signup")}
      >
        <Text style={sharedStyle.pressableText}>Signup</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginBottom: 0
  },
});
export default LandingScreen;
