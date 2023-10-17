package com.carebridge.backend.entity;

public class Certification {
    private int volunteerID;
    private int certificateNumber;
    private String title;

    public Certification(int volunteerID, int certificateNumber, String title) {
        this.volunteerID = volunteerID;
        this.certificateNumber = certificateNumber;
        this.title = title;
    }

    public int getVolunteerID() {
        return volunteerID;
    }

    public int getCertificateNumber() {
        return certificateNumber;
    }

    public String getTitle() {
        return title;
    }
}
