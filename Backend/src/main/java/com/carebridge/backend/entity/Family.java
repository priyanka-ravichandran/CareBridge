package com.carebridge.backend.entity;

//import jakarta.persistence.*;

//@Entity
//@Table
public class Family extends AppUser{
    /*@Id
    @SequenceGenerator(
            name="Family_sequence",
            sequenceName = "Family_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "Family_sequence"
    )*/
    private String FamilyMemberID;
    private String Languages;

    public String getFamilyMemberID() {
        return FamilyMemberID;
    }

    public void setFamilyMemberID(String familyMemberID) {
        FamilyMemberID = familyMemberID;
    }

    public String getLanguages() {
        return Languages;
    }

    public void setLanguages(String languages) {
        Languages = languages;
    }
}
