import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
const FamilyHomeScreen = () => {
  return (
    <View style={styles.container}>
       family screen
  </View>
  );
};
const styles =  StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  }
});

export default FamilyHomeScreen;