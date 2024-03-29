package com.carebridge.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.io.Serializable;

@Entity
@Table(name="Appointment")
public class Appointment implements Serializable {
    @Id
    private String id;
    private int volunteerId;
    private int familyId;
    private int seniorCitizenId;
    private String bookingDate;
    private String bookingStartTime;
    private String bookingEndTime;
    private int availability;
    private String description;

    public Appointment(int volunteerId, int familyId, int seniorCitizenId, String bookingDate, String bookingStartTime, String bookingEndTime, int availability, String description) {
        this.id = String.valueOf(volunteerId) + System.currentTimeMillis();
        this.volunteerId = volunteerId;
        this.familyId = familyId;
        this.seniorCitizenId = seniorCitizenId;
        this.bookingDate = bookingDate;
        this.bookingStartTime = bookingStartTime;
        this.bookingEndTime = bookingEndTime;
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

    public String getBookingDate() {
        return bookingDate;
    }

    public void setBookingDate(String bookingDate) {
        this.bookingDate = bookingDate;
    }

    public String getBookingStartTime() {
        return bookingStartTime;
    }

    public void setBookingStartTime(String bookingStartTime) {
        this.bookingStartTime = bookingStartTime;
    }

    public String getBookingEndTime() {
        return bookingEndTime;
    }

    public void setBookingEndTime(String bookingEndTime) {
        this.bookingEndTime = bookingEndTime;
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
