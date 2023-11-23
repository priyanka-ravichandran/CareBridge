package com.carebridge.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(name="Appointment")
public class Appointment implements Serializable {
    @Id
    private String id;
    private int volunteerId;
    private int familyId;
    private int seniorCitizenId;
    private LocalDateTime bookingDate;
    private int timeLengthOfMeeting;
    private int availability;
    private String description;

    public Appointment(int volunteerId, int familyId, int seniorCitizenId, LocalDateTime bookingDate,int timeLengthOfMeeting , int availability, String description) {
        this.id = String.valueOf(volunteerId) + System.currentTimeMillis();
        this.volunteerId = volunteerId;
        this.familyId = familyId;
        this.seniorCitizenId = seniorCitizenId;
        this.bookingDate = bookingDate;
        this.timeLengthOfMeeting=timeLengthOfMeeting;
        this.availability = availability;
        this.description = description;
    }

    public Appointment() {}

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public int getVolunteerId() {
        return volunteerId;
    }

    public void setVolunteerId(int volunteerId) {
        this.volunteerId = volunteerId;
    }

    public int getFamilyId() {
        return familyId;
    }

    public void setFamilyId(int familyId) {
        this.familyId = familyId;
    }

    public LocalDateTime getBookingDate() {
        return bookingDate;
    }

    public int getTimeLengthOfMeeting() {
        return timeLengthOfMeeting;
    }

    public void setTimeLengthOfMeeting(int timeLengthOfMeeting) {
        this.timeLengthOfMeeting = timeLengthOfMeeting;
    }

    public void setBookingDate(LocalDateTime bookingDate) {
        this.bookingDate = bookingDate;
    }


    public int getAvailability() {
        return availability;
    }

    public void setAvailability(int availability) {
        this.availability = availability;
    }

    public int getSeniorCitizenId() {
        return seniorCitizenId;
    }

    public void setSeniorCitizenId(int seniorCitizenId) {
        this.seniorCitizenId = seniorCitizenId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
