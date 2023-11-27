CREATE TABLE `Appointment` (
  `VolunteerId` int(11) NOT NULL,
  `FamilyId` int(11) NOT NULL,
  `BookingDate` varchar(11) NOT NULL,
  `BookingStartTime` varchar(9) NOT NULL,
  `BookingEndTime` varchar(9) NOT NULL,
  `Availability` int(11) NOT NULL,
  `Description` varchar(255) DEFAULT NULL,
  `SeniorCitizenId` int(11) DEFAULT NULL,
  `Id` varchar(16) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `AppUser` (
  `USERID` int(11) NOT NULL AUTO_INCREMENT,
  `PHONE_NUMBER` varchar(10) NOT NULL,
  `FIRST_NAME` varchar(255) NOT NULL,
  `LAST_NAME` varchar(255) NOT NULL,
  `EMAIL` varchar(255) NOT NULL,
  `BIRTHDATE` date NOT NULL,
  `TYPE` enum('senior','family','volunteer') NOT NULL,
  `HASHEDPASSWORD` varchar(255) NOT NULL,
  `ADDRESS` varchar(255) NOT NULL,
  `GENDER` smallint(6) NOT NULL,
  `PAIR_CODE` varchar(6) NOT NULL DEFAULT '999999',
  PRIMARY KEY (`USERID`),
  UNIQUE KEY `EMAIL` (`EMAIL`)
) ENGINE=InnoDB AUTO_INCREMENT=1038 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `Certification` (
  `VolunteerID` int(11) NOT NULL,
  `CertificateNumber` int(11) NOT NULL,
  `Title` varchar(255) NOT NULL,
  `Reason` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `Checklist` (
  `GuardianID` int(11) NOT NULL,
  `ElderlyID` int(11) NOT NULL,
  `ChecklistNumber` varchar(20) NOT NULL,
  `ChecklistName` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `ChecklistItem` (
  `ChecklistNumber` varchar(20) NOT NULL,
  `ItemName` varchar(255) NOT NULL,
  `Amount` int(11) DEFAULT NULL,
  `STATUS` smallint(6) NOT NULL DEFAULT 0,
  PRIMARY KEY (`ChecklistNumber`,`ItemName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `Elderly` (
  `ElderlyID` int(11) NOT NULL,
  `GuardianID` int(11) NOT NULL,
  `Hobbies` varchar(255) DEFAULT NULL,
  `EmergencyContactName` varchar(255) NOT NULL,
  `EmergencyContactPhn` varchar(10) NOT NULL,
  PRIMARY KEY (`ElderlyID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `ElderlyCondition` (
  `ElderlyID` int(11) NOT NULL,
  `ConditionID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `FallReminder` (
  `RECEIVERID` int(11) NOT NULL,
  `REMINDERMESSAGE` varchar(255) NOT NULL,
  `SENDERID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `Family` (
  `FamilyMemberID` int(11) NOT NULL,
  `Languages` varchar(10) NOT NULL,
  PRIMARY KEY (`FamilyMemberID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `MedicalCondition` (
  `ConditionID` int(11) NOT NULL,
  `Name` varchar(255) DEFAULT NULL,
  `Symptoms` varchar(255) NOT NULL,
  PRIMARY KEY (`ConditionID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `MedicineReminders` (
  `ElderlyID` int(11) NOT NULL,
  `VolunteerID` int(11) NOT NULL,
  `Time` varchar(255) NOT NULL,
  `MedicineName` varchar(255) NOT NULL,
  `Day` varchar(10) DEFAULT NULL,
  `MedicineReminderNumber` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `Pairings` (
  `Senior_Citizen_ID` int(11) NOT NULL,
  `Family_ID` int(11) NOT NULL,
  PRIMARY KEY (`Senior_Citizen_ID`,`Family_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `Reminders` (
  `ElderlyID` int(11) NOT NULL,
  `VolunteerID` int(11) NOT NULL,
  `Time` varchar(255) NOT NULL,
  `Description` varchar(255) NOT NULL,
  `Date` varchar(10) DEFAULT NULL,
  `ReminderNumber` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `SOSAlerts` (
  `ElderlyID` int(11) NOT NULL,
  `VolunteerID` int(11) NOT NULL,
  `Time` varchar(255) NOT NULL,
  `Reason` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `Volunteer` (
  `VolunteerID` int(11) NOT NULL,
  `PreferredAssistance` varchar(10) NOT NULL,
  `Availability` varchar(255) NOT NULL,
  `Rating` varchar(255) NOT NULL,
  PRIMARY KEY (`VolunteerID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
