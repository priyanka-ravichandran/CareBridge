package com.carebridge.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.LocalTime;
@Entity
@Table(name="MedicineReminder")
@IdClass(MedicineReminder.class)
public class MedicineReminder implements Serializable {
    @Id
    private String medicineName;
    @Id
    private LocalDateTime time;
    @Id
    private boolean isRecurring;
    @Id
    private int elderlyId;
    @Id
    private int familyMemberId;

    public MedicineReminder(String medicineName, LocalDateTime time, boolean isRecurring, int elderlyId,int familyMemberId) {
        this.medicineName = medicineName;
        this.time = time;
        this.isRecurring = isRecurring;
        this.elderlyId=elderlyId;
        this.familyMemberId=familyMemberId;
    }

    public MedicineReminder() {

    }

    public String getMedicineName() {
        return medicineName;
    }

    public void setMedicineName(String medicineName) {
        this.medicineName = medicineName;
    }

    public LocalDateTime getTime() {
        return time;
    }

    public void setTime(LocalDateTime time) {
        this.time = time;
    }

    public boolean isRecurring() {
        return isRecurring;
    }

    public void setRecurring(boolean recurring) {
        isRecurring = recurring;
    }

    public int getElderlyId() {
        return elderlyId;
    }

    public void setElderlyId(int elderlyId) {
        this.elderlyId = elderlyId;
    }

    public int getFamilyMemberId() {
        return familyMemberId;
    }

    public void setFamilyMemberId(int familyMemberId) {
        this.familyMemberId = familyMemberId;
    }
}
