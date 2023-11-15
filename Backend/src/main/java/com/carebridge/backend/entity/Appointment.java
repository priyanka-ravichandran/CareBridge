package com.carebridge.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;

import java.io.Serializable;
import java.time.LocalDateTime;
@Entity
@Table(name="Appointment")
@IdClass(Appointment.class)
public class Appointment implements Serializable {
    @Id
    private String address;
    @Id
    private LocalDateTime time;
    @Id
    private boolean isRecurring;
    @Id
    private int elderlyId;
    @Id
    private int familyMemberId;
    @Id
    private int bufferTime;
    public Appointment(String address, LocalDateTime time, boolean isRecurring, int elderlyId,int familyMemberId,int bufferTime) {
        this.address = address;
        this.time = time;
        this.isRecurring = isRecurring;
        this.elderlyId=elderlyId;
        this.bufferTime=bufferTime;
        this.familyMemberId=familyMemberId;
    }

    public Appointment() {

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

    public int getBufferTime() {
        return bufferTime;
    }

    public void setBufferTime(int bufferTime) {
        this.bufferTime = bufferTime;
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
