// App.js
import React, { useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './app/components/AuthNavigator';
import SeniorProfile from './app/components/SeniorProfile';
import FamilyProfile from './app/components/FamilyProfile';
import TodoApp from './app/components/TodoApp';
import ReminderApp from './app/components/ReminderApp';
import AddReminder from './app/components/AddReminder';
import MedicineList from './app/components/MedicineList';
import HomeScreen1 from './app/components/HomeScreen1';




const App = () => {
  const [userType, setUserType] = useState(null); // Change to 'admin' or 'user' when the user is logged in

  return (
    
    <NavigationContainer>
      {userType ? <UserTabs userType={userType} /> : <AuthNavigator />}
    </NavigationContainer> 
   // <SeniorProfile/>
    //<FamilyProfile/>
    //<TodoApp/>
    //<MedicineList/>
    
    //<HomeScreen1/>

   ///<ReminderApp/>
  );
};

export default App;
