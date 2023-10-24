package com.carebridge.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;

import java.io.Serializable;

@Entity
@Table(name = "Certification")
@IdClass(Certification.class)
public class Certification implements Serializable {
    @Id
    private int volunteerID;
    @Id
    private int certificateNumber;
    private String title;

    public Certification() {}
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
