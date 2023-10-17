package com.carebridge.backend.entity;

public class AppUser {

    private int userID;
    private String phone_number;
    private String first_name;
    private String last_name;
    private String email;
    private String birthdate;
    private int type;

    public AppUser(final int userID, final String phone_number, final String first_name, final String last_name,
                   final String email, final String birthdate, final int type) {
        this.userID = userID;
        this.phone_number = phone_number;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.birthdate = birthdate;
        this.type = type;
    }

    public int getUserID() {
        return userID;
    }

    public String getPhone_number() {
        return phone_number;
    }

    public String getFirst_name() {
        return first_name;
    }

    public String getLast_name() {
        return last_name;
    }

    public String getEmail() {
        return email;
    }

    public String getBirthdate() {
        return birthdate;
    }

    public int getType() {
        return type;
    }
}
