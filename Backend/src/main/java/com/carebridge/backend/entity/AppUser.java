package com.carebridge.backend.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.GenericGenerator;

import java.util.Date;
import java.util.Objects;

@Entity
@Table(name="AppUser")
public class AppUser {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
    @GenericGenerator(name = "native", strategy = "native")
    private long userID;
    @Column(unique = true)
    private String phone_number;
    private String first_name;
    private String last_name;
    @Column(unique = true)
    private String email;
    private Date birthdate;
    private int type;

    private String hashedPassword;

    public AppUser() {}

    public AppUser(final long userID, final String phone_number, final String first_name, final String last_name,
                   final String email, final Date birthdate, final int type, final String hashedPassword) {
        this.userID = userID;
        this.phone_number = phone_number;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.birthdate = birthdate;
        this.type = type;
        this.hashedPassword = hashedPassword;
    }

    public long getUserID() {
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

    public Date getBirthdate() {
        return birthdate;
    }

    public int getType() {
        return type;
    }

    public String getHashedPassword() {
        return hashedPassword;
    }

    public void setUserID(long userID) {
        this.userID = userID;
    }

    public void setPhone_number(String phone_number) {
        this.phone_number = phone_number;
    }

    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }

    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setBirthdate(Date birthdate) {
        this.birthdate = birthdate;
    }

    public void setType(int type) {
        this.type = type;
    }

    public void setHashedPassword(String hashedPassword) {
        this.hashedPassword = hashedPassword;
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.userID, this.first_name, this.last_name);
    }

    @Override
    public String toString() {
        return "User{" + "id=" + this.userID + ", name='" + this.first_name + " " + this.last_name + "'" + "}";
    }
}
