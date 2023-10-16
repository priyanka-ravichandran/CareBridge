package com.carebridge.backend.entity;

import jakarta.persistence.*;

@Entity
@Table
public class Volunteer extends AppUser{
    @Id
    @SequenceGenerator(
            name="Volunteer_sequence",
            sequenceName = "Volunteer_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "Volunteer_sequence"
    )
    private String VolunteerID;
    private String Preferred_Assistance;
    private String Availability;
    private int Rating;

    public String getVolunteerID() {
        return VolunteerID;
    }

    public void setVolunteerID(String volunteerID) {
        VolunteerID = volunteerID;
    }

    public String getPreferred_Assistance() {
        return Preferred_Assistance;
    }

    public void setPreferred_Assistance(String preferred_Assistance) {
        Preferred_Assistance = preferred_Assistance;
    }

    public String getAvailability() {
        return Availability;
    }

    public void setAvailability(String availability) {
        Availability = availability;
    }

    public int getRating() {
        return Rating;
    }

    public void setRating(int rating) {
        Rating = rating;
    }
}
