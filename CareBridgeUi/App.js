// App.js
import React, { useState } from "react";

import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./app/components/navigation/AuthNavigator";
import UserTabs from "./app/components/navigation/UserTabs";



import VolunteerSlot from "./app/components/volunteer/VolunteerSlot";
import VolunteerBooking from "./app/components/volunteer/VolunteerBooking";


import FamilyProfile from "./app/components/familyAndFriends/FamilyProfile";
import Reminder from "./app/components/shared/Reminder";
import BookVolunteer from "./app/components/familyAndFriends/BookVolunteer";
import MedicineList from "./app/components/shared/MedicineList";
import Verification from "./app/components/familyAndFriends/addexisting/Verification";





const App = () => {
  const [userType, setUserType] = useState(null); // Change to 'admin' or 'user' when the user is logged in

  return (
   <NavigationContainer>
      {userType ? <UserTabs userType={userType} /> : <AuthNavigator />}
    </NavigationContainer>
    //<AddNew/>
  );
};

export default App;
