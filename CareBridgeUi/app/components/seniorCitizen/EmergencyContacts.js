import React, { useState, useEffect, useContext } from "react";
import { View, Text, FlatList, TouchableOpacity, Linking } from "react-native";
import UserDetailsContext from "../shared/context/userDetailsContext";

const EmergencyContacts = ({ navigation }) => {
  const { userDetails } = useContext(UserDetailsContext);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => Linking.openURL(`tel:${item.phoneNumber}`)}
      style={{ padding: 20, borderBottomWidth: 1, borderBottomColor: "#ccc" }}
    >
      <Text style={{ fontSize: 18 }}>
        {item.firstName + " " + item.lastName}
      </Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={userDetails.pairings}
      renderItem={renderItem}
      keyExtractor={(item) => item.phoneNumber}
    />
  );
};

export default EmergencyContacts;
