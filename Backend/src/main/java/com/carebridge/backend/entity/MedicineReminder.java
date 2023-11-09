package com.carebridge.backend.entity;

import java.time.LocalDateTime;
import java.time.LocalTime;

public class MedicineReminder {
    private String medicineName;
    private LocalDateTime time;
    private boolean isRecurring;
    private String elderlyName;

    public MedicineReminder(String medicineNameName, LocalDateTime time, boolean isRecurring, String elderlyName) {
        this.medicineName = medicineNameName;
        this.time = time;
        this.isRecurring = isRecurring;
        this.elderlyName=elderlyName;
    }
    public String getElderlyName() {
        return elderlyName;
    }

    public void setElderlyName(String elderlyName) {
        this.elderlyName = elderlyName;
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
}
