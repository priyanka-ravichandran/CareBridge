import React, { useState } from "react";
import { Text,StyleSheet, View } from "react-native";
const SeniorCitizenHomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text> senior citizen screen </Text>
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

export default SeniorCitizenHomeScreen;