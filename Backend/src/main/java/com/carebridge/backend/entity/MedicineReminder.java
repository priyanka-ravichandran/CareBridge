package com.carebridge.backend.entity;

import jakarta.persistence.*;

import java.io.Serializable;
import java.sql.Date;
import java.util.Objects;

@Entity
@Table(name="MedicineReminders")
@IdClass(MedicineReminder.class)
public class MedicineReminder implements Serializable {
    @Id
    @Column(name = "ElderlyID")
    private int elderlyId;

    @Id
    @Column(name = "VolunteerID")
    private int volunteerId;

    @Id
    @Column(name = "Time")
    private String time;

    @Id
    @Column(name = "MedicineName")
    private String medicineName;

    @Id
    @Column(name = "Date")
    private Date date;

    public MedicineReminder(int elderlyId, int volunteerId, String time, String medicineName, Date date) {
        this.elderlyId = elderlyId;
        this.volunteerId = volunteerId;
        this.time = time;
        this.medicineName = medicineName;
        this.date = date;
    }

    public MedicineReminder() {}

    public int getElderlyId() {
        return elderlyId;
    }

    public int getVolunteerId() {
        return volunteerId;
    }

    public String getTime() {
        return time;
    }

    public String getMedicineName() {
        return medicineName;
    }

    public Date getDate() {
        return date;
    }

    public void setElderlyId(int elderlyId) {
        this.elderlyId = elderlyId;
    }

    public void setVolunteerId(int volunteerId) {
        this.volunteerId = volunteerId;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public void setMedicineName(String medicineName) {
        this.medicineName = medicineName;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.elderlyId, this.volunteerId, this.time, this.medicineName);
    }

    @Override
    public String toString() {
        return "MedicineReminder{" + "ElderlyId=" + this.elderlyId + ", volunteerId=" + this.volunteerId +
                ", time='" + this.time + "', medicine='" + medicineName + "'}";
    }
}
