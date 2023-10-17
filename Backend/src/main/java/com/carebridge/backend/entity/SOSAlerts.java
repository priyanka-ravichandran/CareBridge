package com.carebridge.backend.entity;

public class SOSAlerts {
    private int elderlyID;
    private int volunteerID;
    private String time;
    private String reason;

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
}
