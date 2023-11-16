package com.carebridge.backend.entity;

import com.carebridge.backend.entity.id.AppointmentId;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;

import java.io.Serializable;
import java.time.LocalDateTime;
@Entity
@Table(name="Appointment")
@IdClass(AppointmentId.class)
public class Appointment implements Serializable {
    @Id
    private int volunteerId;
    @Id
    private int familyId;
    @Id
    private String bookingDate;
    @Id
    private String bookingStartTime;
    private String bookingEndTime;
    private int availability;

    public Appointment(int volunteerId, int familyId, String bookingDate, String bookingStartTime, String bookingEndTime, int availability) {
        this.volunteerId = volunteerId;
        this.familyId = familyId;
        this.bookingDate = bookingDate;
        this.bookingStartTime = bookingStartTime;
        this.bookingEndTime = bookingEndTime;
        this.availability = availability;
    }

    public Appointment() {}

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
}
