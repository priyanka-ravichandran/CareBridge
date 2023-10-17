// App.js
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './app/components/AuthNavigator';
const App = () => {
  const [userType, setUserType] = useState(null); // Change to 'admin' or 'user' when the user is logged in

  return (
    <NavigationContainer>
      {userType ? <UserTabs userType={userType} /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default App;
