package com.carebridge.backend.entity;

import com.carebridge.backend.entity.id.ReminderId;
import jakarta.persistence.*;

import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name = "Reminders")
@IdClass(ReminderId.class)
public class Reminder implements Serializable {
    @Id
    @Column(name = "ElderlyID")
    private int elderlyId;

    @Id
    @Column(name = "VolunteerID")
    private int volunteerId;

    @Id
    @Column(name = "ReminderNumber")
    private String reminderNumber;

    @Column(name = "Time")
    private String time;

    @Column(name = "Description")
    private String description;

    @Column(name = "Date")
    private String date;

    public Reminder(int elderlyId, int volunteerId, String reminderNumber, String time, String description, String date) {
        this.elderlyId = elderlyId;
        this.volunteerId = volunteerId;
        this.reminderNumber = reminderNumber;
        this.time = time;
        this.description = description;
        this.date = date;
    }

    public Reminder() {}

    public int getElderlyId() {
        return elderlyId;
    }

    public int getVolunteerId() {
        return volunteerId;
    }

    public String getTime() {
        return time;
    }

    public String getDescription() {
        return description;
    }

    public String getDate() {
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

    public void setDescription(String description) {
        this.description = description;
    }

    public void setDate(String day) {
        this.date = day;
    }

    public String getReminderNumber() {
        return reminderNumber;
    }

    public void setMedicineReminderNumber(String medicineReminderNumber) {
        this.reminderNumber = reminderNumber;
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.elderlyId, this.volunteerId, this.time, this.description);
    }

    @Override
    public String toString() {
        return "Reminder{" + "ElderlyId=" + this.elderlyId + ", volunteerId=" + this.volunteerId +
                ", time='" + this.time + "', description='" + description + "'}";
    }
}
