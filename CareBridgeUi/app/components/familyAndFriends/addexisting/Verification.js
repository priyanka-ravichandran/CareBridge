import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';


function Verification() {
  const [code, setCode] = useState('');

  const handleVerify = () => {
    // Assume verification is done for the example; implement actual verification logic here
    const verificationDone = true; // This should be the result of your actual verification logic

    if (verificationDone) {
      Alert.alert('Verification', 'Verification is done!', [{ text: 'OK' }]);
    } else {
      Alert.alert('Verification', 'Verification not done.', [{ text: 'OK' }]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Enter 6-digit Code</Text>
      
      <TextInput
        style={styles.input}
        onChangeText={setCode}
        value={code}
        keyboardType="numeric"
        maxLength={6}
        placeholder=""
        textAlign="center"
      />
      
      <TouchableOpacity style={styles.button} onPress={handleVerify}>
        <Text style={styles.buttonText}>VERIFY</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
      container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
      },
      header: {
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center',
      },
      button:{
        backgroundColor: 'black',
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
        marginBottom: 10,
       
      },
      buttonText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
      },
      input: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        fontSize: 24,
        marginBottom: 20,
        padding: 10,
      },
    });
    
export default Verification;
