import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from "react-native";

const AddExisting = () => {
  // Sample data for already linked accounts
  const [linkedAccounts, setLinkedAccounts] = useState([
    { id: '1', name: 'Account 1' },
    { id: '2', name: 'Account 2' },
    // Add more accounts as needed
  ]);

  const handleLinkAccount = () => {
    // Implement account linking logic here
    console.log('Link account button pressed');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleLinkAccount}>
        <Text style={styles.buttonText}>+Link Account</Text>
      </TouchableOpacity>

      <FlatList
        data={linkedAccounts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.accountItem}>
            <Text style={styles.accountText}>{item.name}</Text>
          </View>
        )}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 20,
    width: '100%'
  },
  button: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  list: {
    width: '100%',
  },
  accountItem: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    marginTop: 10,
    borderRadius: 5,
    width: '100%',
  },
  accountText: {
    fontSize: 16,
  }
});

export default AddExisting;
