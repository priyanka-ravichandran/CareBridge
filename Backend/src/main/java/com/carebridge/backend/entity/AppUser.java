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

    public AppUser() {}

    public AppUser(final long userID, final String phone_number, final String first_name, final String last_name,
                   final String email, final Date birthdate, final int type) {
        this.userID = userID;
        this.phone_number = phone_number;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.birthdate = birthdate;
        this.type = type;
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

    @Override
    public int hashCode() {
        return Objects.hash(this.userID, this.first_name, this.last_name);
    }

    @Override
    public String toString() {
        return "User{" + "id=" + this.userID + ", name='" + this.first_name + " " + this.last_name + "'" + "}";
    }
}
