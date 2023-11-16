package com.carebridge.backend.entity;

import com.carebridge.backend.entity.id.MedicineReminderId;
import jakarta.persistence.*;

import java.util.Objects;

@Entity
@Table(name="MedicineReminders")
@IdClass(MedicineReminderId.class)
public class MedicineReminder {
    @Id
    @Column(name = "ElderlyID")
    private int elderlyId;

    @Id
    @Column(name = "VolunteerID")
    private int volunteerId;

    @Id
    @Column(name = "MedicineReminderNumber")
    private String medicineReminderNumber;

    @Column(name = "Time")
    private String time;

    @Column(name = "MedicineName")
    private String medicineName;

    @Column(name = "Day")
    private String day;

    public MedicineReminder(int elderlyId, int volunteerId, String medicineReminderNumber, String time, String medicineName, String day) {
        this.elderlyId = elderlyId;
        this.volunteerId = volunteerId;
        this.medicineReminderNumber = medicineReminderNumber;
        this.time = time;
        this.medicineName = medicineName;
        this.day = day;
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

    public String getDay() {
        return day;
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

    public void setDay(String day) {
        this.day = day;
    }

    public String getMedicineReminderNumber() {
        return medicineReminderNumber;
    }

    public void setMedicineReminderNumber(String medicineReminderNumber) {
        this.medicineReminderNumber = medicineReminderNumber;
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
