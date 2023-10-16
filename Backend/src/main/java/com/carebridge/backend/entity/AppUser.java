package com.carebridge.backend.entity;
import jakarta.persistence.*;

import java.time.LocalTime;
@Entity
@Table
public class AppUser {
    @Id
    @SequenceGenerator(
            name="AppUser_sequence",
            sequenceName = "AppUser_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "AppUser_sequence"
    )
    protected String UserID;
    protected String Phone_Number;
    protected String First_Name;
    protected String Last_Name;
    protected String Email;
    protected LocalTime BirthDate;

    public String getUserID() {
        return UserID;
    }

    public void setUserID(String userID) {
        UserID = userID;
    }

    public String getPhone_Number() {
        return Phone_Number;
    }

    public void setPhone_Number(String phone_Number) {
        Phone_Number = phone_Number;
    }

    public String getFirst_Name() {
        return First_Name;
    }

    public void setFirst_Name(String first_Name) {
        First_Name = first_Name;
    }

    public String getLast_Name() {
        return Last_Name;
    }

    public void setLast_Name(String last_Name) {
        Last_Name = last_Name;
    }

    public String getEmail() {
        return Email;
    }

    public void setEmail(String email) {
        Email = email;
    }

    public LocalTime getBirthDate() {
        return BirthDate;
    }

    public void setBirthDate(LocalTime birthDate) {
        BirthDate = birthDate;
    }
}
