package com.carebridge.backend.entity;
//import jakarta.persistence.*;

//@Entity
//@Table
public class Elderly extends AppUser {
    /*@Id
    @SequenceGenerator(
            name="Elderly_sequence",
            sequenceName = "Elderly_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "Elderly_sequence"
    )*/
    private String ElderlyID;
    private String GuardianID;
    private String Hobbies;
    private String EmergencyContact;

    public String getElderlyID() {
        return ElderlyID;
    }

    public void setElderlyID(String elderlyID) {
        ElderlyID = elderlyID;
    }

    public String getGuardianID() {
        return GuardianID;
    }

    public void setGuardianID(String guardianID) {
        GuardianID = guardianID;
    }

    public String getHobbies() {
        return Hobbies;
    }

    public void setHobbies(String hobbies) {
        Hobbies = hobbies;
    }

    public String getEmergencyContact() {
        return EmergencyContact;
    }

    public void setEmergencyContact(String emergencyContact) {
        EmergencyContact = emergencyContact;
    }
}
