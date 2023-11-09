package com.carebridge.backend.entity;

public class Elderly {
    private int elderlyId;
    private int guardianId;
    private String hobbies;
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
}
