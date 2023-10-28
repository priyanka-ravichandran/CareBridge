import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button 
        title="Add Medicines" 
        onPress={() => navigation.navigate('AddMedicines')} 
      />
      <Button 
        title="Add Shopping List" 
        onPress={() => navigation.navigate('ShoppingList')} 
      />
      <Button 
        title="Profile" 
        onPress={() => navigation.navigate('Profile')} 
      />
    </View>
  );
};

const AddMedicines = () => {
  return (
    <View style={styles.pageContainer}>
      <Text>Add Medicines Page</Text>
    </View>
  );
};

const ShoppingList = () => {
  return (
    <View style={styles.pageContainer}>
      <Text>Add Shopping List Page</Text>
    </View>
  );
};

const Profile = () => {
  return (
    <View style={styles.pageContainer}>
      <Text>Profile Page</Text>
    </View>
  );
};

const HomeScreen1 = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AddMedicines" component={AddMedicines} />
        <Stack.Screen name="ShoppingList" component={ShoppingList} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
});

export default HomeScreen1;
