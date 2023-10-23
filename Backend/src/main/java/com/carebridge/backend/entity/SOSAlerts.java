package com.carebridge.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;

import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name = "sosalerts")
@IdClass(SOSAlerts.class)
public class SOSAlerts implements Serializable {
    @Id
    private int elderlyID;
    @Id
    private int volunteerID;
    @Id
    private String time;
    @Id
    private String reason;

    public SOSAlerts() {}

    public SOSAlerts(int elderlyID, int volunteerID, String time, String reason) {
        this.elderlyID = elderlyID;
        this.volunteerID = volunteerID;
        this.time = time;
        this.reason = reason;
    }

    public int getElderlyID() {
        return elderlyID;
    }

    public int getVolunteerID() {
        return volunteerID;
    }

    public String getTime() {
        return time;
    }

    public String getReason() {
        return reason;
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.elderlyID, this.volunteerID, this.time);
    }

    @Override
    public String toString() {
        return "SOSAlert{" + "ElderlyId=" + this.elderlyID + ", volunteerId='" + this.volunteerID +
                ", time=" + this.time + ", reason=" + this.reason + "}";
    }
}
