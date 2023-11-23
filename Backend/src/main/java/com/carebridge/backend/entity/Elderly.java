package com.carebridge.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;

import java.io.Serializable;

@Entity
@Table(name="Elderly")
@IdClass(Elderly.class)
public class Elderly implements Serializable {
    @Id
    private int elderlyId;
    @Id
    private int guardianId;
    @Id
    private String hobbies;
    @Id
    private String emergencyContact;

    public Elderly(int elderlyId, int guardianId, String hobbies, String emergencyContact) {
        this.elderlyId = elderlyId;
        this.guardianId = guardianId;
        this.hobbies = hobbies;
        this.emergencyContact = emergencyContact;
    }

    public int getElderlyId() {
        return elderlyId;
    }

    public int getGuardianId() {
        return guardianId;
    }

    public String getHobbies() {
        return hobbies;
    }

    public String getEmergencyContact() {
        return emergencyContact;
    }

    public void setElderlyId(int elderlyId) {
        this.elderlyId = elderlyId;
    }

    public void setGuardianId(int guardianId) {
        this.guardianId = guardianId;
    }

    public void setHobbies(String hobbies) {
        this.hobbies = hobbies;
    }

    public void setEmergencyContact(String emergencyContact) {
        this.emergencyContact = emergencyContact;
    }
}
