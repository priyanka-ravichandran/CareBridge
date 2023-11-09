package com.carebridge.backend.entity;

import java.time.LocalDateTime;

public class Appointment {
    private String address;
    private LocalDateTime time;
    private boolean isRecurring;
    private String elderlyName;
    private int bufferTime;
    public Appointment(String address, LocalDateTime time, boolean isRecurring, String elderlyName,int bufferTime) {
        this.address = address;
        this.time = time;
        this.isRecurring = isRecurring;
        this.elderlyName=elderlyName;
        this.bufferTime=bufferTime;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
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

    public String getElderlyName() {
        return elderlyName;
    }

    public void setElderlyName(String elderlyName) {
        this.elderlyName = elderlyName;
    }

    public int getBufferTime() {
        return bufferTime;
    }

    public void setBufferTime(int bufferTime) {
        this.bufferTime = bufferTime;
    }
}
