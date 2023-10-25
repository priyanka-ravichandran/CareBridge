package com.carebridge.backend.entity;

public class Reminders {
    private int elderlyID;
    private int volunteerID;
    private String time;
    private String content;

    public Reminders(int elderlyID, int volunteerID, String time, String content) {
        this.elderlyID = elderlyID;
        this.volunteerID = volunteerID;
        this.time = time;
        this.content = content;
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

    public String getContent() {
        return content;
    }
}
