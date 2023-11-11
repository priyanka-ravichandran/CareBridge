import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
//import AddExisting from "./familyAndFriends/addexisting/AddExisting";

const FamilyHomeScreen = () => {

  return (
    <View style={styles.container}>
     <Text>Family Home Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  }
});

export default FamilyHomeScreen;
