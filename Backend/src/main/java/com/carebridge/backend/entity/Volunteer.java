package com.carebridge.backend.entity;

public class Volunteer {
    private int volunteerID;
    private String preferredAssistance;
    private String availability;
    private float rating;

    public Volunteer(int volunteerID, String preferredAssistance, String availability, float rating) {
        this.volunteerID = volunteerID;
        this.preferredAssistance = preferredAssistance;
        this.availability = availability;
        this.rating = rating;
    }

    public int getVolunteerID() {
        return volunteerID;
    }

    public String getPreferredAssistance() {
        return preferredAssistance;
    }

    public String getAvailability() {
        return availability;
    }

    public float getRating() {
        return rating;
    }
}
