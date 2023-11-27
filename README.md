# CareBridge
## Overview
CareBridge is a mobile application designed to provide a one-stop solution to senior citizens, family members, and volunteers. Use cases for the application are as mentioned below:
 - Senior Citizens:
   - Get medicine reminders
   - Get checklists for groceries
   - Pair with family members
 - Family Members:
   - Can book appointments with volunteers
   - Pair with senior citizens
   - Update / Create checklists for elderly people
 - Volunteers:
   - Get info on senior citizens
   - Provide availability in Appointments

Other miscellaneous features include:
 - Fall Detection for senior citizens (using Accelerometer and Gyroscope)
 - Email services for all members
 - Push notifications for all members

To read more about the dependencies, refer to the `readme.md` mentioned in the respective folders.
## How to use it
### Front End
Set the file to the CareBridgeUi folder
```
cd .\CareBridgeUi\
```
Install npm
``` bash
npm i
```
Install the expo globally and run
``` bash
expo start --tunnel
```
Then enter "w" in the terminal it will start a web server.

Additionally, you can also run our front end application using Expo Go once the Metro builder has initialized. Press "s" to run using Expo Go, after which you can scan the generated QR code using the [Expo Go](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en&gl=US&pli=1) app on your phone.

### Back End
The entire backend folder can be utilized as a separate maven project. Steps to run the project on your local machine:
 - Import the Backend folder in IntelliJ
 - In build configurations, click on **Run / Debug Configurations** > **Edit Configurations**
 - Add a Spring Boot configuration with the below config (To run locally):
   - **Build & Run:** (SDK: Java 21) `com.carebridge.backend.BackendApplication`
 - Add a Maven configuration with the below config (To create a **jar** file):
   - **Run:** `package -DskipTests`


### Database
This project uses MySql as its backend database.
